<script setup lang="ts">
import { computed } from 'vue'
import { useModalStore } from '../../store'

const modalStore = useModalStore()

const modalComponent = computed(() => modalStore.current)
const modalProps = computed(() => modalStore.props)

const onClose = () => modalStore.close()
</script>

<template>
  <transition name="fade">
    <div v-if="modalComponent" class="modal-container" @click.self="onClose">
      <component 
        :is="modalComponent" 
        class="modal-content" 
        v-bind="modalProps" 
        @cancel="onClose"
      />
    </div>
  </transition>
</template>

<style scoped lang="scss">
.modal-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(50, 50, 50, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  .modal-content {
    background-color: $bg-color;
    margin: 1rem;
    border-radius: 0.5rem;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  }
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
