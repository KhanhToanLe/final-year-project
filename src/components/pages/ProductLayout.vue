<template>
  <div class="wrapper">
    <div class="flex justify-between pt-2 pb-2">
      <div class="text-lg text-black">
        {{ props.breadCrumb }}
      </div>
      <div v-if="route.currentRoute.value.meta.showSortBy">
        <q-select
          v-model="orderBy"
          outlined
          :options="optionOrder"
          class="w-[240px]"
          dense
        />
      </div>
    </div>
    <div class="flex !flex-nowrap pb-8">
      <SideMenu class="flex-none" />
      <div class="flex-auto">
        <router-view />
      </div>
    </div>
  </div>
  <FooterInfo />
</template>
<script setup lang='ts'>
import SideMenu from 'views/pages/SideMenu.vue';
import FooterInfo from 'subpage/FooterInfo.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const route = useRouter();

const props = defineProps({
  breadCrumb: {
    require: true,
    type: String,
    default: "TRANG CHỦ / BÀN PHÍM"
  },
  showSortBy: {
    required: false,
    type: Boolean,
    default: false
  },
});



const optionOrder = [
  'newest to oldest', 'oldest to newest'
]

const orderBy = ref(optionOrder[0]);


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