<template>
  <div class="border-l ">
    <div class="flex flex-nowrap ">
      <div class="pr-4 flex-1">
        <q-carousel
          v-if="product.images"
          v-model="imageSlide"
          v-model:fullscreen="fullscreen"
          swipeable
          animated
          thumbnails
          infinite
        >
          <q-carousel-slide
            v-for="(item, index) in product.images.split(',')"
            :key="index.toString()"
            :name="index"
            :img-src="`https://localhost:7082/${item}`"
          />

          <template #control>
            <q-carousel-control
              position="bottom-right"
              :offset="[18, 18]"
            >
              <q-btn
                push
                round
                dense
                color="white"
                text-color="primary"
                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="fullscreen = !fullscreen"
              />
            </q-carousel-control>
          </template>
        </q-carousel>
      </div>
      <div class="flex-1">
        <div>HOME / PRODUCT</div>
        <div class="text-black text-2xl pb-2">
          {{ product.name }}
        </div>
        <div class="text-red-500 text-xl font-bold">
          {{ product.price }} USD
        </div>
        <div class="border-t-[1px] mt-4 text-black">
          <span class="text-gray-400">Code</span>: {{ product.code }}
        </div>
        <div class="border-t-[1px] mt-4 text-black">
          <span class="text-gray-400">Keyword</span>: {{ product.keyword }}
        </div>
        <div class="flex pt-10 justify-between">
          <QBtn class="!border-[#8071b3] !w-[212px] !py-4 !m-2">
            Add To Card
          </QBtn>
          <QBtn class=" text-white !bg-[#8071b3] !w-[212px] !py-4 !m-2">
            Buy
          </QBtn>
          <div />
        </div>
      </div>
    </div>
    <div class="border-t">
      <div class="w-[40%]">
        <q-tabs
          v-model="tab"
          narrow-indicator
          dense
          align="justify"
        >
          <q-tab
            class=""
            name="Description"
            label="Description"
          />
          <q-tab
            class=""
            name="Other"
            label="Others"
          />
        </q-tabs>
      </div>
      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel
          name="Description"
          class="text-black"
        >
          <div v-html="product.description" />
        </q-tab-panel>
        <q-tab-panel name="Other">
          <div class="text-black py-3 border-b flex justify-between">
            <div class="text-base flex-1">
              Gurantee
            </div>
            <div class="flex-1 text-left">
              {{ product.guarantee }} Month<span v-if="product.gurantee == 1">s</span>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div class="ml-3">
      <SlideShow
        v-if="relatedProductList.length != 0"
        v-model="relatedProductSlide"
        :items="relatedProductList"
        :mode="SLIDE_SHOW_MODE.CONTAIN_SLOT"
        height="400"
        :autoplay="4000"
        :arrows="true"
        :navigation="false"
        control-color="black"
        class="w-full"
      >
        <q-carousel-slide
          v-for="slideIndex in Math.ceilNumber(relatedProductList.length / 4)"
          :name="slideIndex"
          class="column no-wrap flex-center w-full h-full !p-0"
        >
          <div class="flex">
            <ProductItem
              v-for="productItem in 4"
              v-bind="relatedProductList[productItem + ((slideIndex - 1) * 4) - 1]"
              class="w-[25%]"
            />
          </div>
        </q-carousel-slide>
      </SlideShow>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import productRepository from 'api/productRepository';
import { SLIDE_SHOW_MODE } from 'src/common/enum';
import * as Math from 'common/math';
import SlideShow from 'components/base/SlideShow.vue';
import ProductItem from 'components/common/ProductItem.vue';

const router = useRouter()
const route = useRoute();
const tab = ref("Description");
const fullscreen = ref(false);
const imageSlide = ref(0);
const relatedProductSlide = ref(1);
const relatedProductList = ref([]);
const product = ref({
  images: ""
});

const getProduct = async (id) => {
  const result = await productRepository.getById(id);
  product.value = result.payload;
}

const getRelatedProduct = async (keyword) => {
  const result = await productRepository.getRelated(keyword);
  relatedProductList.value = result.payload;
}

onMounted(async () => {
  console.log('onmoun');
  const id = router.currentRoute.value.params.id;
  await getProduct(id);
  getRelatedProduct(product.value.keyword);

});

watch(() => route.params.id, async () => {
  console.log('watch');
  const id = router.currentRoute.value.params.id;
  getProduct(id);
  await getRelatedProduct(product.value.keyword)
})

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
}
</style>