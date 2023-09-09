<template>
  <div>
    <MainMenu />
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { RouterView} from 'vue-router';
import MainMenu from 'views/pages/MainMenu.vue';

</script>