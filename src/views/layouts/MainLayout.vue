<template>
  <MainMenu v-if="route.currentRoute.value.meta.showMainMenu" />
  <RouterView />
  <!-- <SignalRExpose /> -->
</template>
<script setup lang="ts">
import AdminPage from 'src/components/pages/AdminPage.vue';
import MainMenu from 'views/pages/MainMenu.vue';
import SideMenu from 'views/pages/SideMenu.vue';
import SignalRExpose from 'src/components/tools/SignalRExpose.vue';

import { RouterView } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRouter();

</script>
<style scoped></style>