<script setup lang="ts">
interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
})
</script>

<template>
  <div class="group-container">
    <div class="title">
      <h1>{{ title }}</h1>
      <slot name="title-content"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.group-container {
  margin: auto;
  max-width: 800px;

  .title {
    display: flex;
    margin: 1rem 0;

    h1 {
      flex-grow: 1;
      margin: 0;
    }
  }
}
</style>
