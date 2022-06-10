<script setup lang="ts"></script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
div {
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.1)
  );
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
}
</style>
