
<template>
  <div class="wrapper">
    <SlideShow
      v-model="firstSlide"
      :items="landingPageFirstSlideImages"
      :autoplay="1000"
      class="!h-[auto]"
    />
    <div class="block-product">
      <div class="text-center uppercase text-lg font-bold py-[24px]">
        New Products
      </div>
      <div class="flex mx-[-4px]">
        <ProductItem
          v-for="(product, index) in newProductList"
          :key="index"
          v-bind="product"
          class="w-[20%] h-[300px]"
        />
      </div>
    </div>
    <div class="block-product !p-0 mt-[24px]">
      <div class=" text-lg font-bold flex border border-dotted border my-3">
        <div class="mr-[auto] ">
          <span class=" text-white bg-[#8071b3] h-full block p-2 uppercase">
            Keyboard
          </span>
        </div>
        <a
          href="/"
          class="ml-[auto] h-full p-2 text-black italic text-[14px] underline cursor-pointer select-none"
        >
          more detail
        </a>
      </div>
      <div class="mx-[-4px]">
        <SlideShow
          v-if="keyboardsList.length != 0"
          v-model="keyboardSlide"
          :items="keyboardsList"
          :mode="SLIDE_SHOW_MODE.CONTAIN_SLOT"
          height="400"
          :autoplay="1000"
          :arrows="true"
          :navigation="false"
          control-color="black"
          class="w-full"
        >
          <q-carousel-slide
            v-for="slideIndex in Math.ceilNumber(keyboardsList.length / 5)"
            :name="slideIndex"
            class="column no-wrap flex-center w-full h-full !p-0"
          >
            <div class="flex">
              <ProductItem
                v-for="productItem in 5"
                v-bind="keyboardsList[productItem + ((slideIndex - 1) * 5) - 1]"
                class="w-[20%]"
              />
            </div>
          </q-carousel-slide>
        </SlideShow>
      </div>
    </div>
    <div class="block-product">
      <div class="text-center uppercase text-lg font-bold py-[24px]">
        Category
      </div>
      <div class="flex mx-[-8px]">
        <div
          v-for="(type, index) in typeList"
          class="flex-1 m-[8px] overflow-hidden"
        >
          <div class="product-img relative ">
            <img
              :src="imageToLink(type.images)"
              class="h-[240px] w-full object-cover "
              :alt="index.toString()"
            >
            <div
              class="hidden absolute top-0 left-0 right-0 bottom-0 bg-[#00000077] justify-center items-center text-white text-base"
            >
              {{ type.name }}
            </div>
          </div>
        </div>
      </div>

      <div class=" text-lg font-bold flex border border-dotted my-3">
        <div class="mr-[auto] ">
          <span class=" text-white bg-[#8071b3] h-full block p-2 uppercase">
            Mouse
          </span>
        </div>
        <a
          href="/"
          class="ml-[auto] h-full p-2 text-black italic text-[14px] underline cursor-pointer select-none"
        >
          more detail
        </a>
      </div>
      <div class="mx-[-4px]">
        <SlideShow
          v-model="keyboardSlide"
          :items="mouseList"
          :mode="SLIDE_SHOW_MODE.CONTAIN_SLOT"
          height="400"
          :autoplay="1000"
          :arrows="true"
          :navigation="false"
          control-color="black"
          class="w-full"
        >
          <q-carousel-slide
            v-for="slideIndex in Math.ceilNumber(mouseList.length / 5)"
            :name="slideIndex"
            class="column no-wrap flex-center w-full h-full !p-0"
          >
            <div class="flex">
              <ProductItem
                v-for="productItem in 5"
                v-bind="mouseList[productItem + ((slideIndex - 1) * 5) - 1]"
                class="w-[20%]"
              />
            </div>
          </q-carousel-slide>
        </SlideShow>
      </div>
    </div>
  </div>
  <FooterInfo />
</template>
<script setup lang="ts">

import { onMounted, provide, ref } from 'vue';
import { landingPageFirstSlideImages } from 'utils/static-link';
import SlideShow from 'components/base/SlideShow.vue';
import ProductItem from 'components/common/ProductItem.vue';
import { SLIDE_SHOW_MODE } from 'src/common/enum';
import * as Math from 'common/math';
import productRepository from 'api/productRepository';
import typeRepository from 'api/typeRepository';
import FooterInfo from 'subpage/FooterInfo.vue';
provide('test2','valuetest2');
const firstSlide = ref(0);
const keyboardSlide = ref(1);
const typeList = ref([]);
onMounted(async () => {
  // get new product
  const result = await productRepository.getNewProduct();
  newProductList.value = result.payload.slice(0,10);
  console.log(result.payload);
  console.log(newProductList.value);


  // get type list
  const typeListResult = await typeRepository.getByShowLandingPage();
  typeList.value = typeListResult.payload;

  // get keyboard list
  // FIX: not fixed type id
  const keyboardresult = await productRepository.getByType("9ece3d55-2635-48a0-a65b-4f1cd9af95a1");
  keyboardsList.value = keyboardresult.payload.slice(0,10);
  const mouseResult = await productRepository.getByType("190c853b-892d-4955-83f3-6c662fd56c9b")
  mouseList.value = mouseResult.payload.slice(0,10);


});

const imageToLink = (images) => {
  if (images) {
    return `https://localhost:7082/${images.split(",")[0].trim()}`;
  }
}

const newProductList = ref([]);
const keyboardsList = ref([]);
const mouseList = ref([]);
</script>

<style scoped>
.wrapper {
  width: 100%;
}

.block-product {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 24px;

  color: var(--main-color);
  /* @apply  */
}

.product-img {
  transition: transform .6s;
}

.product-img:hover {
  transform: scale(1.1);
}

.product-img:hover>div {
  display: flex !important;
}</style>src/utils/static-link.js