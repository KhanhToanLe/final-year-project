<template>
  <div>
    <div v-if="showTable">
      <div class="pb-3">
        <q-btn @click="addTypeClickHandler">
          Add Type
        </q-btn>
      </div>
      <div>
        <q-table
          v-model:selected="selected"
          flat
          bordered
          :columns="columns"
          :rows="rows"
          row-key="name"
          class="!h-full"
          selection="multiple"
        >
          <template #header-selection="scope">
            Images 
          </template>
          <template #body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols">
                <div class="text-center flex justify-center items-center">
                  <template v-if="col.name == 'Function-button'">
                    <q-btn
                      class="!bg-red-500 text-white"
                      @click="deleteType(props.row)"
                    >
                      Delete
                    </q-btn>
                  </template>
                  <template v-else-if="col.name == 'Images'">
                    <img
                      :src="imageToLink(col.value)"
                      class="w-[50px] h-auto"
                    >
                  </template>
                  <template v-else>
                    {{ col.value }}
                  </template>
                </div>
              </q-td>
              <q-td class="w-[24x] text-center">
                <q-checkbox
                  v-model="props.row.isShowInLandingPage"
                  @click="changeEvent(props.row.id,props.row.isShowInLandingPage)"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
    <AddType
      v-if="showAddType"
      @changeToList="backToListHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, watchEffect } from 'vue';
import _ from 'lodash';
import AddType from 'subcomponent/AddType.vue';
import productRepository from 'api/productRepository';
import typeRepository from 'api/typeRepository';

const showTable = ref(true);
const showAddType = ref(false);


const addTypeClickHandler = () => {
  showAddType.value = true;
  showTable.value = false;
}
const selected = ref();

const backToListHandler = async() => {
  console.log('got here');
  await getAllType();
  showAddType.value = false;
  showTable.value = true;
}

const data = ref([]);

const columns = [
  {
    name: 'Images',
    required: true,
    label: 'Name',
    align: 'center',
    field: 'images',
  },
  { name: 'Name', align: 'center', label: 'Action', field: 'name' },
  { name: 'Function-button', align: 'center', label: 'Show Lading Page'},
  
] as any

const rows = computed(() => {
  const rowsValue = _.clone(data.value);
  // rowsValue.push({
  //   name: 'function-button'
  // })
  return rowsValue
})

const getAllType = async () => {
  const result = await typeRepository.get();
  data.value = result.payload;
}

const deleteType = async (type) => {
  // console.log(product.id);
  const result = await  typeRepository.delete(type.id);
  // console.log(result);
  getAllType();

}


const deleteSelected = () =>{
  const idList = selected.value.map((obj)=> obj.id)
  productRepository.deleteRange(idList);
  getAllType();
}

const imageToLink = (images) => {
  if (images) {
    return `https://localhost:7082/${images.split(",")[0].trim()}`;
  }

}

const changeEvent = async(id,isShow) =>{
  await typeRepository.updateFlagShow(id,isShow)
  getAllType();
}

onMounted(() => {
  getAllType();
})

</script>

<style scoped></style>