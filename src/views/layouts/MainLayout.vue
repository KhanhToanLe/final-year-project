<template>
  <!-- <div>
    <MainMenu v-if="route.currentRoute.value.meta.showMainMenu" />
    <div class="flex">
      <SideMenu />
      <RouterView />
    </div>
  </div> -->
  <SSVSport />
  <!-- <TestTransition /> -->
</template>
<script setup lang="ts">
import MainMenu from 'views/pages/MainMenu.vue';
import LoginPage from 'src/components/pages/LoginPage.vue';
import SideMenu from 'views/pages/SideMenu.vue';
import SSVSport from 'views/SSVSport.vue';
import TestTransition from 'views/pages/TestTransition.vue';


import { RouterView } from 'vue-router';
import {useRouter} from 'vue-router';

const route =useRouter();

</script>