<template>
  <div class="container">
    <MainMenu />
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { RouterView} from 'vue-router';
import MainMenu from './MainMenu.vue';

</script>
<style scope>
  .container{
    max-width:1280px;
    margin-left:auto;
    margin-right:auto;
  }
</style>