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
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
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
import { ref } from 'vue';
import AdminProduct from "subpage/AdminProduct.vue"

const drawer = ref(false);
const menuList = [
  {
    icon: 'inbox',
    label: 'Inbox',
    separator: true
  },
  {
    icon: 'send',
    label: 'Outbox',
    separator: false
  },
  {
    icon: "category",
    label: "Product",
    separator: false,
    component: AdminProduct
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true
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
  selectedMenu.value = menuList.find(x => x.icon == icon);
}
</script>

<style scoped scss></style>