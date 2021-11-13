<script setup lang="ts"></script>

<template>
  <button title="Start a recording">
    <font-awesome-icon icon="desktop" />
  </button>
</template>

<style scoped lang="scss">
button {
  box-shadow: 5px 10px 18px #888888;
  background-image: linear-gradient(140deg, #d5433e 40%, #ad2b26 60%);
  border-color: #292b2c;
  color: #292b2c;
  border-radius: 50%;
  border-width: 0.1rem;
  padding: 2rem;
  font-size: 4rem;
  cursor: pointer;
}

button:hover {
  box-shadow: 5px 8px 12px #888888;
  background-image: linear-gradient(
    140deg,
    #d8514c 15%,
    #d5433e 30%,
    #ad2b26 55%
  );
}
</style>
