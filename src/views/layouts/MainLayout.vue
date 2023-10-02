<template>
  <div>
    <!-- <MainMenu />
    <RouterView /> -->
    <LoginPage />
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import MainMenu from 'views/pages/MainMenu.vue';
import LoginPage from 'src/components/pages/LoginPage.vue';

</script>