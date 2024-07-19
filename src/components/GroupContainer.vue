<script setup lang="ts">
import { withDefaults } from 'vue'

interface Props {
  groupTitle?: string
}

withDefaults(defineProps<Props>(), {
  groupTitle: undefined,
})
</script>

<template>
  <div class="group">
    <h3 v-if="groupTitle">{{ groupTitle }}</h3>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.group {
  border-radius: 0.5rem;
  border: 1px solid $border-color;
  box-shadow: 3px 3px 5px $border-color;
  background: linear-gradient(
    140deg,
    $bg-primary-gradient-start,
    $bg-primary-gradient-end
  );
  padding: 1rem;
  margin: 0;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
  }
}
</style>
