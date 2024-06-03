<template>
  <div class="p-2">
    <MainComponent />
    <SongListComponent />
    <AudioComponent />
  </div>
</template>

<script setup lang=ts>
  import MainComponent from './outter/MainComponent.vue';
  import SongListComponent from './outter/SongListComponent.vue';
  import AudioComponent from './outter/AudioComponent.vue';
</script>
