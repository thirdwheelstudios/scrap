<script setup lang="ts"></script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
div {
  background-image: radial-gradient(
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.3)
  );
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
  border-radius: 0.25rem;
}
</style>
