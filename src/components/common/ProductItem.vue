<template>
  <div
    class="h-[390px] overflow-hidden"
    v-bind="$attrs"
    :class="props.class"
  >
    <div class="border m-1 h-auto">
      <div class="product-image w-[100%] flex items-center justify-center overflow-hidden">
        <img
          :src="props.src"
          :alt="props.alt"
          class="w-[100%] product-img"
        >
      </div>
      <div class="product-info">
        <div class="max-h-[64psx] text-center h-[64px]">
          {{ props.name }}
        </div>
        <div class="text-center text-red-500 font-bold pb-[1px]">
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
  class: {
    require: false,
    type: String
  }
});

const productImage = ref();

</script>
<style scoped lang='scss'>
.product-img {
  transition: transform .6s;
}

.product-img:hover {
  transform: scale(1.1);

}
</style>