<template>
  <div
    class="h-[394px] overflow-hidden product-item"
    v-bind="$attrs"
  >
    <div class="border m-1 h-auto">
      <div class="product-image h-[100%] w-[100%] flex items-center justify-center overflow-hidden">
        <img
          :src="props.src"
          :alt="props.alt"
          class="w-[100%] product-img"
        >
      </div>
      <div class="product-info h-[30%]">
        <div class="max-h-[64psx] text-center h-[64px]">
          {{ props.name }}
        </div>
        <div class="text-center text-red-500 font-bold pb-[4px]">
          {{ props.price }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';

const props = defineProps({
  src: {
    required: true,
    type: String,
    default: ""
  },
  alt: {
    required: true,
    type: String,
    default: ''
  },
  name: {
    required: true,
    type: String,
    default: 'error text'
  },
  price: {
    required: false,
    type: String,
    default: '00.00'
  },
});

const productImage = ref();

</script>
<style scoped lang='scss'>
.product-item {
  width: calc(100%/5);
}


.product-img {
  transition: transform .6s;
}

.product-img:hover {
  transform: scale(1.1);

}
</style>