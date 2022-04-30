<script setup lang="ts">
import GradientIcon from './GradientIcon.vue'
interface Props {
  icon: string[]
  size?: string
  text?: string
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'lg',
})

const emits = defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    class="gradient-button"
    :title="title"
    @click="$emit('click')"
  >
    <GradientIcon :icon="icon" :size="size" />{{ text }}
  </button>
</template>

<style scoped lang="scss">
button.gradient-button {
  background-color: initial;
  background-image: none;
  min-height: initial;
  padding: 0.25rem;
}
</style>
