<template>
  <div class="main-logo">
    <img
      src="public/images/logo.png"
      alt="logo image"
    >
  </div>
  <nav>
    <RouterLink
      v-for="route in routes"
      :key="route.name"
      :to="route.path"
    >
      {{ route.name }}
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
  import { routes } from 'src/router/routes';
  import { RouterLink } from 'vue-router';
</script>

<style scoped lang="scss">
  div{
    img{
      padding:120px;
    }
  }
</style>