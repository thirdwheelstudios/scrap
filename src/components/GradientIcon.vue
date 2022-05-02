<script setup lang="ts">
interface Props {
  icon: string[]
  size?: string
}

const props = defineProps<Props>()
</script>

<template>
  <font-awesome-icon :icon="props.icon" :size="size" />
</template>

<style scoped lang="scss">
div {
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.05) 50%,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.3)
  );
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
}
</style>
