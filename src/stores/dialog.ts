import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
  const dialog = ref([])

  const show = (dialogObject) => {
    dialog.value.push(dialogObject)
  }
  const hide = (value?) =>{
    dialog.value.pop();
    return value;
  }
  const hideLoading = () =>{
    const theDialog = dialog.value.find(x=>x.type=='loading');
    const index = dialog.value.indexOf(theDialog);
    dialog.value.splice(index, 1);
  }
  return { dialog, show, hide,hideLoading}
})
