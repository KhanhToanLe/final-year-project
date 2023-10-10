<template>
  <div>
    <div v-if="isShowTable">
      <div class="pb-3">
        <q-btn @click="addProductClickHandler">
          Add Product
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
          <template #header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols">
                {{ col.name }}
              </q-th>
            </q-tr>
          </template>
          <template #body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols">
                <div class="text-center flex justify-center items-center">
                  <template v-if="col.name == 'Images'">
                    <img
                      :src="imageToLink(col.value)"
                      class="w-[50px] h-auto"
                    >
                  </template>
                  <template v-else-if="col.name == 'Function-button'">
                    <q-btn
                      class="!bg-sky-600 text-white mr-1"
                      @click="updateProduct(props.row)"
                    >
                      Update{{ col.value }}
                    </q-btn>
                    <q-btn
                      class="!bg-red-500 text-white"
                      @click="deleteProduct(props.row)"
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
    <AddProduct
      v-if="isAddProduct"
      @changeToList="backToListHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import _ from 'lodash';
const isShowTable = ref(true);
const isAddProduct = ref(false);
import AddProduct from 'subcomponent/AddProduct.vue';
import productRepository from 'api/productRepository';



const addProductClickHandler = () => {
  isAddProduct.value = true;
  isShowTable.value = false;
}

const backToListHandler = () => {
  isAddProduct.value = false;
  isShowTable.value = true;
  getAllProduct();
}

const imageToLink = (images) => {
  if (images) {
    return `https://localhost:7082/${images.split(",")[0].trim()}`;
  }

}

const data = ref([]);

const columns = [
  {
    name: 'Images',
    required: true,
    label: 'image',
    align: 'left',
    field: 'images',
    sortable: true
  },
  { name: 'Name', align: 'center', label: 'Name', field: 'name', sortable: true },
  { name: 'Code', label: 'Code', field: 'code', sortable: true },
  { name: 'Price', label: 'Price', field: 'price' },
  { name: 'Keyword', label: 'Keyword', field: 'keyword' },
  { name: 'Guarantee', label: 'Guarantee', field: 'guarantee' },
  { name: 'Color', label: 'Color', field: 'color', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'Mounts', label: 'Mounts', field: 'mounts', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'Function-button' }
] as any

const rows = computed(() => {
  const rowsValue = _.clone(data.value);
  rowsValue.push({
    name: 'function-button'
  })
  return rowsValue
})

const getAllProduct = async () => {
  const result = await productRepository.get();
  data.value = result.payload;
}

const updateProduct = (product) => {

  console.log(product);
}

const deleteProduct = (product) => {
  console.log(product);

}

onMounted(() => {
  getAllProduct();
})
</script>

<style scoped></style>