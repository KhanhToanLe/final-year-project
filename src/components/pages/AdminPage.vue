<template>
  <div>
    <q-layout
      view="hHh Lpr lff"
      container
      style="height: 100vh"
      class="shadow-2 rounded-borders"
    >
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
      >
        <q-scroll-area class="fit">
          <q-list>
            <template
              v-for="(menuItem, index) in menuList"
              :key="index"
            >
              <q-item
                v-ripple
                clickable
                :active="menuItem.icon == selectedMenu.icon"
                :class="[{ '!text-[#8071b3]': menuItem.icon == selectedMenu.icon }]"
                @click="changeTabMenu(menuItem.icon)"
              >
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator
                v-if="menuItem.separator"
                :key="'sep' + index"
              />
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <component :is="selectedMenu.component" />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AdminProduct from "subpage/AdminProduct.vue"
import AdminType from 'subpage/AdminType.vue';
import { useRouter } from 'vue-router';
import AdminLandingPageSideShow from 'subpage/AdminLandingPageSideShow.vue';
import AdminCart from 'subpage/AdminCart.vue'
import AdminOrder from 'subpage/AdminOrder.vue';

const router = useRouter();

const drawer = ref(false);
const menuList = [
  {
    icon: 'inbox',
    label: 'Go To Page',
    separator: true

  },
  {
    icon: 'send',
    label: 'Product Type',
    separator: false,
    component: AdminType
  },
  {
    icon: "category",
    label: "Product",
    separator: false,
    component: AdminProduct
  },
  {
    icon: 'delete',
    label: 'Slide Show',
    separator: false,
    component: AdminLandingPageSideShow

  },
  {
    icon: 'error',
    label: 'Cart',
    separator: true,
    component: AdminCart
  },
  {
    icon: 'print',
    label: 'Order',
    component: AdminOrder
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false
  }
]

const selectedMenu = ref(menuList[0]);


const changeTabMenu = (icon) => {
  // if its is "go to page" menu item => back to page
  if (icon === "inbox") {
    router.push("/");
  }
  selectedMenu.value = menuList.find(x => x.icon == icon);
}

onMounted(() => {
  // go to menu product first
  changeTabMenu("category");
})
</script>

<style scoped scss></style>