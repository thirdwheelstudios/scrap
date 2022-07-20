<script setup lang="ts">
import { computed } from 'vue'
import { useToastStore } from '../../store'

const toastStore = useToastStore()

const toastComponent = computed(() => toastStore.current)
const toastProps = computed(() => toastStore.props)

const onClose = () => toastStore.close()
</script>

<template>
  <transition name="fade">
    <div v-if="toastComponent" class="toast-container" @click.self="onClose">
      <component :is="toastComponent" v-bind="toastProps" @cancel="onClose" />
    </div>
  </transition>
</template>

<style scoped lang="scss">
.toast-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 20;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
