<template>
  <div class="wrapper p-[12px]">
    <div />
    <div>
      <h5>Editor</h5>
      <div ref="editorElement" />
    </div>
  </div>
  <!-- <span>{{ props.modelValue }}</span> -->
  <!-- <q-button @click="saveValue"> -->
  <!-- Save -->
  <!-- </q-button> -->
</template>

<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';
import Quill  from 'quill';
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
import ResizeModule from "@botom/quill-resize-module";


const props = defineProps({
  modelValue:String
});
const editor = ref();

const emits = defineEmits(['update:modelValue']);

const saveValue = ()=>{
  emits('update:modelValue',editor.value.root.innerHTML);
}

const editorElement = ref();
onMounted(()=>{
  const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean'],                             // remove formatting button
['image'],
['video']

];
  Quill.register("modules/resize", ResizeModule);
  editor.value =new Quill(editorElement.value,{
    theme:'snow',
    //debug: 'info',
    modules: {
      toolbar: toolbarOptions,
       resize: {
        showSize: true,
        toolbar: {
        },
        locale: {
        },
    } },
    placeholder: 'Compose an epic...',
  });
  editor.value.root.innerHTML = props.modelValue;
  editor.value.on("text-change", function () {
    emits('update:modelValue',editor.value.root.innerHTML);
  });
})

// watch(
//   () => props.modelValue,
//   (newContent) => {
//     if (editor.value) editor.value.root.innerHTML = newContent;
//   },
//   { deep: true },
// );


</script>

<style scoped>
.preview-box{
  width:100%;
  min-height:120px;
  border-radius: 4px;
  border:1px solid var(--border-gray);
}

.editor-box{
  border-radius: 4px;
  border:1px solid var(--border-gray); 
}

.add-button{
  margin:8px;
}
</style>