<script setup lang="ts">
defineProps<{ groupTitle: string }>()
</script>

<template>
  <div>
    <h3>{{ groupTitle }}</h3>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
div {
  h3 {
    margin: 0;
  }

  border-radius: 0.5rem;
  background: linear-gradient(
    140deg,
    $bg-primary-gradient-start,
    $bg-primary-gradient-end
  );
  padding: 1rem;
  margin: 0;
}
</style>
