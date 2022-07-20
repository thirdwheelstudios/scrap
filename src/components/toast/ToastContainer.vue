<script setup lang="ts">
import { computed } from 'vue'
import { useToastStore } from '../../store'

const toastStore = useToastStore()

const toastComponent = computed(() => toastStore.current)
const toastProps = computed(() => toastStore.props)

const onClose = () => toastStore.close()
</script>

<template>
  <transition name="slide-fade">
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

.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(200px);
  opacity: 0;
}
</style>
