<template>
  <span :class="[`material-icons ${props.class}`] ">{{ iconWithSnakeCase }}</span>
</template>
<script setup lang='ts'>
import { onMounted, ref} from 'vue';
const props = defineProps({
  icon:{
    require:true,
    type:String,
    default:''
  },
  class:{
    require:false,
    type:String,
    default:''
  },
  
});
const iconWithSnakeCase = ref("");
onMounted(()=>{
  iconWithSnakeCase.value = props.icon.toLowerCase().replace(/\s+/g, '_');
})
</script>