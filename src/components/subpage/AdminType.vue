<template>
  <div>
    <div v-if="showTable">
      <div class="pb-3">
        <q-btn @click="addTypeClickHandler">
          Add Type
        </q-btn>
        <q-btn
          v-if="isShowDeleteSelectedProduct"
          class="!bg-red-500 ml-4 text-white"
          @click="deleteSelected"
        >
          Delete Selection
        </q-btn>
      </div>
      <div>
        <q-table
          flat
          bordered
          :columns="columns"
          :rows="rows"
          row-key="name"
          class="!h-full"
        >
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
                  <template v-else>
                    {{ col.value }}
                  </template>
                </div>
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
import { computed, onMounted, ref } from 'vue';
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

const backToListHandler = () => {
  showAddType.value = false;
  showTable.value = true;
  getAllType();
}

const data = ref([]);

const columns = [

  {
    name: 'Id',
    required: true,
    label: 'Id',
    align: 'center',
    field: 'id',
    sortable: true
  },
  { name: 'Name', align: 'center', label: 'Name', field: 'name', sortable: true },
  { name: 'Function-button', align: 'center', label: 'Action'},
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

const selected = ref([]);

const isShowDeleteSelectedProduct = computed(()=>{
  return selected.value.length > 0;
});

const deleteSelected = () =>{
  const idList = selected.value.map((obj)=> obj.id)
  productRepository.deleteRange(idList);
  getAllType();
}

onMounted(() => {
  getAllType();
})
</script>

<style scoped></style>