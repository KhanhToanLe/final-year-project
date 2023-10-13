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
    <div class="row-input">
      <q-btn
        class="mt-2 !bg-[#8071b3] text-white"
        :disable="typeImageList.length > 0"
        @click="inputFileClickHandler"
      >
        Add Image
      </q-btn>
      <input
        ref="typeImage"
        type="file"
        multiple
        class="invisible"
        @change="typeImageHandler"
      >
    </div>
    <div class="border w-full min-h-[200px] border-[#c2c2c2] my-2 rounded-md grid grid-cols-4 gap-4 p-2">
      <div
        v-for="(file, index) in typeImageList"
        :key="index"
        class="relative h-auto image-overlay"
      >
        <img
          :src="file"
          class="h-[auto] object-cover w-auto"
          :alt="index.toString()"
          accept="image/*"
        >
        <div class="absolute top-0 left-0 right-0 bottom-0 bg-slate-50 overlay-div flex items-center justify-center">
          <CIcon
            icon="Delete"
            class="text-white !text-[34px] p-4"
            @click="deleteImage(file, index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import typeRepository from 'repository/typeRepository';
import { toBase64 } from 'utils/common';


const type = ref({
  name: '',
});

const emits = defineEmits(["changeToList"]);


const backToList = () => {
  emits("changeToList");
}

const saveType = async () => {
  // call api to save
  const typeValue = type.value;
  typeValue.images = typeImageList.value;
  console.log(typeValue.images);
  await typeRepository.add(typeValue);
  clearTypeHandler();
  emits("changeToList");

}
const clearTypeHandler = () => {
  type.value = {
    name: '',
  };
}

const typeImage = ref(); 
const typeImageList = ref([]);

const inputFileClickHandler = () => {
  typeImage.value.click();
}

const typeImageHandler = async (event) => {
  const files = event.target.files;
  for (const file of files) {
    typeImageList.value.push(await toBase64(file));
  }
  event.target.value = null;
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

.overlay-div {}
</style>