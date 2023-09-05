<template>
  <div>
    <MainMenu />
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { RouterView} from 'vue-router';
import MainMenu from './MainMenu.vue';

</script>