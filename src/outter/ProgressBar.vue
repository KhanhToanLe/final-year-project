<template>
  <div
    ref="barRef"
    class="progress-bar"
    @click="onClick"
  >
    <div class="bar-inner">
      <div
        ref="progressRef"
        class="progress"
        :style="progressStyle"
      />
      <div
        class="progress-btn-wrapper"
        :style="btnStyle"
        :onMousedown="withModifiers(onTouchStart, ['prevent'])"
        :onMousemove="withModifiers(onTouchMove, ['prevent'])"
        :onMouseup="withModifiers(onTouchEnd, ['prevent'])"
        :onTouchstart="withModifiers(onTouchStart, ['prevent'])"
        :onTouchmove="withModifiers(onTouchMove, ['prevent'])"
        :onTouchend="withModifiers(onTouchEnd, ['prevent'])"
        :click="withModifiers(() => { }, ['stop'])"
      >
        <div
          class="progress-btn"
          :style="{ backgroundColor: props.barColor }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, withModifiers } from 'vue';
import { useEventListener } from '@vueuse/core'
const props = defineProps({
  progress: Number,
  hasBtn: {
    type: Boolean,
    default: true
  },
  barColor: String
});

const progressBarWidth = 16

const emit = defineEmits(['progressChanging', 'progressChanged']);

// reactive
const offset = ref(0)
const barRef = ref(null)
const progressRef = ref(null)

// computed
const progressStyle = computed(() => {
  return {
    width: `${offset.value}px`,
    backgroundColor: props.barColor
  }
})
const btnStyle = computed(() => {
  return {
    transform: `translate3d(${offset.value}px,0,0)`
  }
})

// methods：drag & drop
const touch = {
      x1: 0,
      beginWidth: 0
    }
let touching = false
const onTouchStart = (e) => {
  if (!progressRef.value) return

  touching = true
  touch.x1 = e instanceof TouchEvent ? e.touches[0].pageX : e.pageX // 鼠标开始位置
  touch.beginWidth = progressRef.value.clientWidth // 进度条当前进度
}
const onTouchMove = (e) => {
  if (!touching || !barRef.value) return null

  const delta = (e instanceof TouchEvent ? e.touches[0].pageX : e.pageX) - touch.x1 // 鼠标移动距离
  const endWidth = touch.beginWidth + delta // 进度条最终进度
  const barWidth = barRef.value.clientWidth - (props.hasBtn ? progressBarWidth : 0)
  const progress = Math.min(1, Math.max(endWidth / barWidth, 0))
  offset.value = barWidth * progress

  emit('progressChanging', progress)
}
const onTouchEnd = () => {
  if (!touching || !barRef.value || !progressRef.value) return
  touching = false

  const barWidth = barRef.value.clientWidth - (props.hasBtn ? progressBarWidth : 0)
  const progress = progressRef.value.clientWidth / barWidth

  emit('progressChanged', progress)
}

const onClick = (e) => {
  if (!barRef.value) return

  const rect = barRef.value.getBoundingClientRect()
  const offsetWidth = e.pageX - rect.left
  const barWidth = barRef.value.clientWidth - (props.hasBtn ? progressBarWidth : 0)
  const progress = Math.min(1, Math.max(offsetWidth / barWidth, 0))

  emit('progressChanged', progress)
}

watch(
  () => props.progress,
  (newProgress) => {
    if (!barRef.value) return

    const barWidth = barRef.value.clientWidth - (props.hasBtn ? progressBarWidth : 0)
    offset.value = barWidth * newProgress
  }
)

// lifecycle
onMounted(() => {
  if (!barRef.value) return

  const barWidth = barRef.value.clientWidth - (props.hasBtn ? progressBarWidth : 0)
  offset.value = barWidth * props.progress
})


useEventListener(document, 'mouseup', onTouchEnd)
useEventListener(document, 'touchend', onTouchEnd)

</script>

<style scoped lang="scss">
.progress-bar {
  @apply h-[30px] cursor-pointer;

  .bar-inner {
    @apply relative top-[13px] h-1 bg-[#ddd];
  }

  .progress {
    @apply absolute h-full;

    background-color: #2f9842;
  }
}

.progress-btn-wrapper {
  @apply absolute -top-[13px] -left-[7px] w-[30px] h-[30px] cursor-pointer;

  .progress-btn {
    @apply relative top-[7px] left-[7px] w-4 h-4 border-[3px] border-[#ddd] rounded-full;

    background-color: #2f9842;
  }
}
</style>