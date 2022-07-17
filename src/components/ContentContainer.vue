<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <div class="container">
    <div class="title">
      <h1 v-if="title">{{ title }}</h1>
      <slot name="title-content"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.container {
  .title {
    display: flex;
    margin: 1rem 0.5rem;

    h1 {
      flex-grow: 1;
      margin: 0;
    }
  }
}
</style>
