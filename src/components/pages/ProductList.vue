<template>
  <div class="flex-auto">
    <div class="products grid grid-cols-4 gap-1">
      <ProductItem
        v-for="(product, index) in productList"
        :key="index"
        v-bind="product"
      />
    </div>
    <div
      v-if="false"
      class="flex justify-center"
    >
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
import { onMounted, ref, watch } from 'vue';

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

const productList = ref([])
import {useRouter } from 'vue-router';
import productRepository from 'src/api/repository/productRepository';
const router = useRouter()

const getProduct = async() =>{
  const currentRouterName =  router.currentRoute.value.name;
  console.log(currentRouterName);
  switch (currentRouterName) {
    case "keyboard":
      // eslint-disable-next-line no-case-declarations
      const keyboardresult =  await productRepository.getByType("9ece3d55-2635-48a0-a65b-4f1cd9af95a1");
      console.log('go hreer')
      productList.value = keyboardresult.payload;
      break;
    case "mouse":
      // eslint-disable-next-line no-case-declarations
      const mouseResult =  await productRepository.getByType("190c853b-892d-4955-83f3-6c662fd56c9b");
      console.log(productList.value[0]);
      productList.value = mouseResult.payload;
      break;
    case "kit":
      // eslint-disable-next-line no-case-declarations
      const kitResult =  await productRepository.getByType("396b2216-9b12-4a17-8310-608ebcbb1faa");
      productList.value = kitResult.payload;
      break;
    case "gear":
    // eslint-disable-next-line no-case-declarations
      const gearResult =  await productRepository.getByType("3c6f04c8-e3ab-4e1a-8233-ee37302a4437");
      productList.value = gearResult.payload;
      break;
    case "switch":
    // eslint-disable-next-line no-case-declarations
      const switchResult =  await productRepository.getByType("7aa5445d-dbea-4f57-b9e2-19977e7b0b01");
      productList.value = switchResult.payload;
      break;
    case "keycap":
      // eslint-disable-next-line no-case-declarations
      const keycapResult =  await productRepository.getByType("92280de8-864d-4ad1-9ab4-8c847b47800e");
      productList.value = keycapResult.payload;
      break;
  
    default:
      break;
  }
}

watch(() => router.currentRoute.value.name, () => {
  getProduct();
});

onMounted(async ()=>{
  getProduct();
})
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