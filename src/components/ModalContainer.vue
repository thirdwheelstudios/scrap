<script lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import CaptureSettings from './CaptureSettings.vue'

export default {
  components: { CaptureSettings },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props: any, context: any) {
    const store = useStore()

    const currentModalComponent = computed<string | null>(
      () => store.getters['currentModalComponentName']
    )

    return {
      onCloseClick: () => {
        store.dispatch('setModalComponent', null)
      },
      currentModalComponent,
    }
  },
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="currentModalComponent"
      class="modal-container"
      @click.self="onCloseClick"
    >
      <button @click="onCloseClick">
        <font-awesome-icon icon="times"></font-awesome-icon>
      </button>
      <component class="modal-content" :is="currentModalComponent" />
    </div>
  </transition>
</template>

<style scoped lang="scss">
.modal-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(50, 50, 50, 0.4);

  button {
    position: absolute;
    right: 0;
    margin: 2.5rem;
    font-size: 2rem;
    border-radius: 0.5rem;
    border: 0;
    background-color: #7f7f7f;
    color: #f5f7fb;
    cursor: pointer;
  }

  .modal-content {
    margin: 2rem auto;
    background-color: #f5f7fb;
    padding: 1rem 2.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem #7f7f7f;
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
