<script setup lang="ts">
import GradientIcon from './GradientIcon.vue'
interface Props {
  icon: string[]
  size?: string
  text?: string
  title?: string
}

withDefaults(defineProps<Props>(), {
  size: 'lg',
  text: undefined,
  title: undefined,
})

defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    class="gradient-button"
    :title="title"
    @click="$emit('click')"
  >
    <GradientIcon :icon="icon" :size="size" class="fill-gradient-linear" />{{ text }}
  </button>
</template>

<style scoped lang="scss">
button.gradient-button {
  background-color: initial;
  background-image: none;
  min-height: initial;
  padding: 0.25rem;
  border-radius: 0;
  opacity: 0.75;
  transition: opacity 0.2s ease-in;
}

button.gradient-button:hover {
  opacity: 1;
}

button.gradient-button:hover {
  box-shadow: none;
  background-color: initial;
  background-image: none;
}
</style>
