<template>
  <div class="w-[240px] mr-5">
    <template
      v-for="(cate, index) in category"
      :key="cate"
    >
      <div
        class="p-2 bg-[#8071b3] text-white w-full text-lg "
        :class="{ 'mt-4': index != 0 }"
      >
        {{ cate.name }}
      </div>
      <div
        v-for="subItem in cate.item"
        :key="subItem"
        class="border border-t-0 p-2 text-black"
      >
        {{ subItem.name }}
      </div>
    </template>
    <div>
      <div class="p-2 bg-[#8071b3] text-white w-full text-lg mt-4">
        News
      </div>
      <template
        v-for="newpaper in news"
        :key="news"
      >
        <div class="flex !flex-nowrap border border-t-0 min-h-[80px] pt-2">
          <img
            :src="newpaper.image"
            class="w-[60px] h-[60px]"
          >
          <div class="pl-1">
            <div class=" text-black">
              {{ newpaper.name }}
            </div>
          </div>
        </div>
      </template>
    </div>

    <div>
      <div class="p-2 bg-[#8071b3] text-white w-full text-lg mt-4 ">
        Selling Products
      </div>
      <template
        v-for="(product) in sellingProducts"
        :key="product"
      >
        <div class="flex !flex-nowrap border border-t-0 ">
          <img
            :src="product.image"
            class="w-[60px] h-[60px]"
          >
          <div class="pl-1">
            <div class=" text-black">
              {{ product.name }}
            </div>
            <div class="text-red-500 font-bold">
              {{ product.price }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const category = ref([
  {
    name: 'Category',
    item: ([
      {
        name: 'Gear',
        path: '/gear',
      },
      {
        name: 'keyboard',
        path: '/keyboard',
      },
      {
        name: 'Type',
        path: '/type',
      },
      {
        name: 'Keycap',
        path: '/keycap',
      },
      {
        name: 'Kit keyboard',
        path: '/kit-keyboard',
      },
      {
        name: 'accessory',
        path: '/accessory',
      },
      {
        name: 'Switch',
        path: '/switch',
      },
    ]) as any[]
  },
  {
    name: 'Other',
    item: ([
      {
        name: 'News',
        path: '/news',
      },
      {
        name: 'Shop',
        path: '/shope',
      },
      {
        name: 'Support',
        path: '/support',
      },
      {
        name: 'About',
        path: '/about',
      }
    ]) as any[]
  },
]);

const sellingProducts = ref(
  [
    {
      name: 'Kit bàn phím cơ MonsGeek M6 QMK (Full Nhôm – Mạch xuôi – QMK / VIA – PCB Stab)',
      price: '2,00',
      image: 'https://akkogear.com.vn/wp-content/uploads/2023/08/kit-ban-phim-co-monsgeek-m6-qmk-10-100x100.jpg',
    },
    {
      name: 'Kit bàn phím cơ MonsGeek M6 QMK (Full Nhôm – Mạch xuôi – QMK / VIA – PCB Stab)',
      price: '2,00',
      image: 'https://akkogear.com.vn/wp-content/uploads/2023/08/kit-ban-phim-co-monsgeek-m6-qmk-10-100x100.jpg',
    },
    {
      name: 'Kit bàn phím cơ MonsGeek M6 QMK (Full Nhôm – Mạch xuôi – QMK / VIA – PCB Stab)',
      price: '2,00',
      image: 'https://akkogear.com.vn/wp-content/uploads/2023/08/kit-ban-phim-co-monsgeek-m6-qmk-10-100x100.jpg',
    },
    {
      name: 'Kit bàn phím cơ MonsGeek M6 QMK (Full Nhôm – Mạch xuôi – QMK / VIA – PCB Stab)',
      price: '2,00',
      image: 'https://akkogear.com.vn/wp-content/uploads/2023/08/kit-ban-phim-co-monsgeek-m6-qmk-10-100x100.jpg',
    }
  ]);

const news = ref([
  {
    name: "AKKO mạch xuôi (South Facing) chính thức ra mắt",
    image: "https://akkogear.com.vn/wp-content/uploads/2021/08/tim-hieu-ve-cac-loai-plate-tren-ban-phim-co-05-280x280.jpg"
  },
  {
    name: "AKKO mạch xuôi (South Facing) chính thức ra mắt",
    image: "https://akkogear.com.vn/wp-content/uploads/2021/08/tim-hieu-ve-cac-loai-plate-tren-ban-phim-co-05-280x280.jpg"
  },
  {
    name: "AKKO mạch xuôi (South Facing) chính thức ra mắt",
    image: "https://akkogear.com.vn/wp-content/uploads/2021/08/tim-hieu-ve-cac-loai-plate-tren-ban-phim-co-05-280x280.jpg"
  },
])


</script>
