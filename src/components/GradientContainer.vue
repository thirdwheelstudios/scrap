<script setup lang="ts"></script>

<template>
  <div>
    <slot></slot>
  </div>
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
