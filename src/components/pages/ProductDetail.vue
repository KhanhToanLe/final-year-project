<template>
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
          v-for="(item,index) in product.images.split(',')"
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import productRepository from 'api/productRepository';

const router = useRouter();

const fullscreen = ref(false);
const imageSlide = ref(0);

const product = ref({
  images:""
});

const getProduct = async(id) =>{
  const result  = await productRepository.getById(id);
  product.value = result.payload;
}

onMounted(()=>{
  const id = router.currentRoute.value.params.id;
  getProduct(id);

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