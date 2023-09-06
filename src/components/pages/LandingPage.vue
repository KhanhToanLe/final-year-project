
<template>
  <div class="wrapper">
    <img
      src="https://akkogear.com.vn/wp-content/uploads/2023/04/5075B-Plus-goku-naruto-01.jpg"
      alt=""
      class="w-full"
    >
    <div class="new-product">
      <div class="text-center">
        New Products
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log('value');
});

</script>

<style scoped>
.wrapper {
  width: 100%;
}

.new-product {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  /* @apply  */
}
</style>