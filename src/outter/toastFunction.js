import { createApp } from 'vue'
import ToastComponent from './ToastComponent.vue'

let timer
let toastInstance
let mountNode

export default function createToast ({
  text,
  duration = 2000,
  appendTo = document.body
}) {
  const clear = () => {
    toastInstance.unmount()
    appendTo.removeChild(mountNode)
  }

  if (timer) {
    clearTimeout(timer)
    clear()
  }

  toastInstance = createApp(ToastComponent, {
    text,
    show: true
  })

  mountNode = document.createElement('div')
  appendTo.appendChild(mountNode)
  toastInstance.mount(mountNode)

  timer = setTimeout(() => {
    clear()
    timer = undefined
  }, duration)
}
