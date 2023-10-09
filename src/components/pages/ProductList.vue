<template>
  <div class="flex-auto">
    <div class="products grid grid-cols-4 gap-1">
      <ProductItem
        v-for="(product, index) in productList"
        :key="index"
        v-bind="product"
      />
    </div>
    <div class="flex justify-center">
      <div class="bg-[#8071b3] text-white round-page-button">
        1
      </div>
      <div class="white tex-white border round-page-button">
        2
      </div>
      <div class="white tex-white border round-page-button">
        3
      </div>
      <div class="white tex-white border round-page-button">
        4
      </div>
      <div class="white tex-white border round-page-button">
        5
      </div>
      <div class="white tex-white border round-page-button">
        6
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import SideMenu from 'views/pages/SideMenu.vue';
import ProductItem from 'components/common/ProductItem.vue';
import FooterInfo from 'subpage/FooterInfo.vue';
import { ref } from 'vue';

const props = defineProps({
  BreadCrumb: {
    require: true,
    type: String,
    default: "TRANG CHỦ / BÀN PHÍM"
  }
});

const optionOrder = [
  'newest to oldest', 'oldest to newest'
]

const orderBy = ref(optionOrder[0]);

const productList = ref([
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

</script>
<style scoped lang='scss'>
.wrapper {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 24px;

  color: var(--main-color);
  /* @apply  */
}

.products {
  @apply w-full mt-[-.25rem]
}

.flex-container {
  flex: 1 auto;
}

.round-page-button {
  @apply rounded-full w-8 h-8 flex items-center justify-center m-1
}
</style>