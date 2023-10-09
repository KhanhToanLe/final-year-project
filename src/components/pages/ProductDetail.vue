<template>
  <div class="flex flex-nowrap ">
    <div class="pr-4 flex-1">
      <q-carousel
        v-model="imageSlide"
        v-model:fullscreen="fullscreen"
        swipeable
        animated
        thumbnails
        infinite
      >
        <q-carousel-slide
          :name="1"
          img-src="https://cdn.quasar.dev/img/mountains.jpg"
        />
        <q-carousel-slide
          :name="2"
          img-src="https://cdn.quasar.dev/img/parallax1.jpg"
        />
        <q-carousel-slide
          :name="3"
          img-src="https://cdn.quasar.dev/img/parallax2.jpg"
        />
        <q-carousel-slide
          :name="4"
          img-src="https://cdn.quasar.dev/img/quasar.jpg"
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
      <div>TRANG CHỦ / CẤU TRÚC BÀN PHÍM / GASKET MOUNT</div>
      <div class="text-black text-2xl pb-2">
        Bàn phím MonsGeek M1 QMK Silver (Full Nhôm – Mạch xuôi – QMK / VIA – RGB – Hotswap)
      </div>
      <div class="text-red-500 text-xl font-bold">
        2.00đ
      </div>
      <div class="border-t-[1px] mt-4 text-black">
        <span class="text-gray-400">Category</span>: keyboard
      </div>
      <div class="border-t-[1px] mt-4 text-black">
        <span class="text-gray-400">Keyword</span>: akko
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
import { ref } from 'vue';

const fullscreen = ref(false);
const imageSlide = ref(1);
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