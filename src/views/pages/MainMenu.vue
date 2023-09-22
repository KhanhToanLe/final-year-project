<template>
  <div class="wrapper">
    <div class="main-container">
      <div class="main-logo">
        <img
          src="/images/logo.png"
          alt="logo image"
        >
      </div>
      <div class="pl-4">
        <RouterLink
          v-for="route in routes"
          :key="route.name"
          :to="route.path"
          class="button-link"
        >
          {{ route.name }}
        </RouterLink>
        <div />
      </div>
      <div class="ml-auto">
        <div class="menu-icon">
          <CIcon
            icon="Search"
            class="w-12 !text-lg text-center"
          />
        </div>
        <div class="menu-icon">
          <CIcon
            icon="Person"
            class="w-12 !text-lg text-center"
          />
        </div>
      </div>
      <div />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { routes } from 'src/router/routes';
  import { RouterLink } from 'vue-router';
</script>

<style scoped lang="scss">
.wrapper{
  @apply bg-white sticky top-0 left-0 right-0
}
.main-container{
  max-width:1280px;
  margin-left:auto;
  margin-right:auto;
  @apply flex ;
}
.main-container{
  div{
    @apply flex items-center h-16
  }
}
.button-link{
  @apply text-lg text-black h-full p-3 hover:bg-slate-300 transition-all flex items-center justify-center
}
.menu-icon{
  @apply flex justify-center items-center cursor-pointer
}
</style>