<template>
  <div>
    <!-- <MainMenu />
    <RouterView /> -->
    <EditorPages v-model="value" />
  </div>
</template>
<script setup lang="ts">
import { RouterView} from 'vue-router';
import EditorPages from 'src/components/tools/EditorPages.vue';
import MainMenu from 'views/pages/MainMenu.vue';
import { ref } from 'vue';
const value = ref("<p>dddddasdfasdf</p>");
</script>