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
  color: #323232;
  border-radius: 50%;
  border-width: 0;
  padding: 2rem;
  font-size: 4rem;
  cursor: pointer;
  transition: border-radius 0.5s;
}

button:hover {
  box-shadow: 5px 8px 12px #888888;
  background-image: linear-gradient(
    140deg,
    #d8514c 15%,
    #d5433e 30%,
    #ad2b26 55%
  );
  transform: translate(0.1rem, 0.1rem);
}

button.recording {
  border-radius: 15%;
}
</style>
