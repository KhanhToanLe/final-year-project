
<template>
  <div class="wrapper">
    <q-carousel
      v-model="firstSlide"
      animated
      arrows
      navigation
      infinite
      height="80vh"
      :autoplay="2000"
      transition-next="jump-left"
      transition-prev="jump-right"
    >
      <q-carousel-slide
        v-for="(slide,index) in landingPageFirstSlideImages"
        :key="index"
        :name="index"
        :img-src="slide.src"
      />
    </q-carousel>
    <div class="new-product">
      <div class="text-center">
        New Products
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { landingPageFirstSlideImages } from 'utils/static-link';
const firstSlide = ref(1);

onMounted(() => {
  console.log('value');
});

</script>

<style scoped>
.wrapper {
  width: 100%;
}

.new-product {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  /* @apply  */
}
</style>src/utils/static-link.js