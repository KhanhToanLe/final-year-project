
<template>
  <div class="wrapper">
    <SlideShow
      v-model="firstSlide"
      :items="landingPageFirstSlideImages"
      :autoplay="false"
      class="!h-[auto]"
    />
    <div class="block-product">
      <div class="text-center uppercase text-lg font-bold py-[24px]">
        New Products
      </div>
      <div class="flex mx-[-4px]">
        <ProductItem
          v-for="(product, index) in newProductList"
          :test="index"
          v-bind="product"
        />
      </div>
    </div>
    <div class="block-product !p-0 mt-[4px]">
      <div class=" text-lg font-bold flex border border-dotted border">
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
          v-model="keyboardSlide"
          :items="newProductList"
          :mode="SLIDE_SHOW_MODE.CONTAIN_SLOT"
          height="400"
          :autoplay="4000"
          :arrows="true"
          :navigation="false"
          control-color="black"
          class="w-full"
        >
          <q-carousel-slide
            v-for="slideIndex in Math.roundNumber(newProductList.length / 5)"
            :name="slideIndex"
            class="column no-wrap flex-center w-full h-full !p-0"
          >
            <div class="flex">
              <ProductItem
                v-for="productItem in 5"
                v-bind="newProductList[productItem + ((slideIndex - 1) * 5) - 1]"
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
      <!-- <SlideShow
        v-model="keyboardSlide"
        :items="newProductList"
        :mode="SLIDE_SHOW_MODE.CONTAIN_SLOT"
        height="400"
        :autoplay="4000"
        :arrows="true"
        :navigation="false"
        control-color="black"
        class="w-full"
      >
      <q-carousel-slide v-for="" :name="">

      </q-carousel-slide>
    </SlideShow> -->
    </div>
  </div>
</template>
<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { landingPageFirstSlideImages } from 'utils/static-link';
import SlideShow from 'components/base/SlideShow.vue';
import ProductItem from 'components/common/ProductItem.vue';
import { SLIDE_SHOW_MODE } from 'src/common/enum';
import * as Math from 'common/math';

const firstSlide = ref(0);
const keyboardSlide = ref(1);
onMounted(() => {
});

const newProductList = ref([
  {
    src: 'https://akkogear.com.vn/wp-content/uploads/2023/08/kit-ban-phim-co-monsgeek-m6-qmk-10-247x296.jpg',
    name: 'Kit bàn phím cơ MonsGeek M6 QMK (Full Nhôm – Mạch xuôi – QMK / VIA – PCB Stab)',
    alt: 'iimage',
    price: '2.00đ'
  },
  {
    src: 'https://akkogear.com.vn/wp-content/uploads/2023/08/akko-keycap-set-black-on-white-mda-profile-01-247x296.jpg',
    name: 'AKKO Keycap set – Black on White (',
    alt: 'iimage',
    price: '2.00đ'
  },
  {
    src: 'https://akkogear.com.vn/wp-content/uploads/2023/07/ban-phim-co-akko-3108-rf-world-tour-tokyo-01-247x296.jpg',
    name: 'Kit bàn phím cơ MonsGeek M6 QMK (Full Nhôm – Mạch xuôi – QMK / VIA – PCB Stab)',
    alt: 'iimage',
    price: '2.00đ'
  },
  {
    src: 'https://akkogear.com.vn/wp-content/uploads/2023/07/ban-phim-monsgeek-m1-qmk-pre-built-silver-01-247x296.jpg',
    name: 'Bàn phím MonsGeek M1 QMK Silver (Full Nhôm – Mạch xuôi – QMK / VIA – RGB – Hotswap)',
    alt: 'iimage',
    price: '2.00đ'
  },
  {
    src: 'https://akkogear.com.vn/wp-content/uploads/2023/07/ban-phim-monsgeek-m1-qmk-pre-built-black-01-247x296.jpg',
    name: 'Bàn phím MonsGeek M1 QMK Black (Full Nhôm – Mạch xuôi – QMK / VIA – RGB – Hotswap)',
    alt: 'iimage',
    price: '2.00đ'
  },
  {
    src: 'https://akkogear.com.vn/wp-content/uploads/2023/07/phim-chuot-khong-day-monsgeek-mx108-01-247x296.jpg',
    name: 'Kit bàn phím cơ MonsGeek M6 QMK (Full Nhôm – Mạch xuôi – QMK / VIA – PCB Stab)',
    alt: 'iimage',
    price: '2.00đ'
  },
  {
    src: 'https://akkogear.com.vn/wp-content/uploads/2023/07/chuot-khong-day-monsgeek-d1-01-247x296.jpg',
    name: 'AKKO Keycap set – Black on White (',
    alt: 'iimage',
    price: '2.00đ'
  },
  {
    src: 'https://akkogear.com.vn/wp-content/uploads/2023/07/ban-phim-akko-5108s-naraka-blade-point-03-247x296.jpg',
    name: 'Kit bàn phím cơ MonsGeek M6 QMK (Full Nhôm – Mạch xuôi – QMK / VIA – PCB Stab)',
    alt: 'iimage',
    price: '2.00đ'
  },
  {
    src: 'https://akkogear.com.vn/wp-content/uploads/2021/12/ban-phim-co-akko-3098n-multi-modes-dracula-castle-01-247x296.jpg',
    name: 'Bàn phím MonsGeek M1 QMK Silver (Full Nhôm – Mạch xuôi – QMK / VIA – RGB – Hotswap)',
    alt: 'iimage',
    price: '2.00đ'
  },
  {
    src: 'https://akkogear.com.vn/wp-content/uploads/2023/07/ban-phim-monsgeek-m1-qmk-pre-built-silver-03-247x296.jpg',
    name: 'Bàn phím MonsGeek M1 QMK Black (Full Nhôm – Mạch xuôi – QMK / VIA – RGB – Hotswap)',
    alt: 'iimage',
    price: '2.00đ'
  },
  {
    src: 'https://akkogear.com.vn/wp-content/uploads/2023/07/ban-phim-monsgeek-m1-qmk-pre-built-black-01-247x296.jpg',
    name: 'Bàn phím MonsGeek M1 QMK Black (Full Nhôm – Mạch xuôi – QMK / VIA – RGB – Hotswap)',
    alt: 'iimage',
    price: '2.00đ'
  }
])

// const categoryList = ref([
//   {
//     c

//   }
// ])

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
</style>src/utils/static-link.js