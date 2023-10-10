<template>
  <div>
    <div class="font-extrabold text-xl pb-4 flex">
      <div>
        <div class="mb-3">
          <span>Add Type</span>
        </div>
        <div class="">
          <q-btn
            class="!border-none"
            @click="backToList"
          >
            <CIcon icon="Arrow Back" />
            Go back
          </q-btn>
        </div>
      </div>

      <div class="ml-[auto]">
        <q-btn
          class="!bg-green-600 text-white mr-4"
          @click="saveType()"
        >
          &nbsp;Save&nbsp;
        </q-btn>
        <q-btn
          class="!bg-slate-20"
          @click="clearTypeHandler"
        >
          Clear
        </q-btn>
      </div>
    </div>
    <div class="row-input">
      <q-input
        v-model="type.name"
        outlined
        label="Name"
        class="w-full"
        dense
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import typeRepository from 'repository/typeRepository';

const type = ref({
  name: '',
});

const emits = defineEmits(["changeToList"]);


const backToList = () => {
  emits("changeToList");
}

const saveType = () => {
  // call api to save
  const typeValue = type.value;
  typeRepository.add(typeValue);
  clearTypeHandler();
}
const clearTypeHandler = () => {
  type.value = {
    name: '',
  };
}



</script>

<style scoped>
.row-input {
  @apply py-1 flex
}

.overlay-div {
  @apply transition-all;
  opacity: 0;
}

.image-overlay:hover .overlay-div {
  /* @apply !visible; */
  opacity: 1;
  background-color: rgba(22, 14, 14, 0.548);

}

.overlay-div {}
</style>