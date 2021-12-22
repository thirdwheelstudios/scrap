<script lang="ts">
export default {
  props: {
    numberOfOrbs: {
      type: Number,
      default: 5,
    },
  },
}
</script>

<template>
  <ul class="orb-container">
    <li
      v-for="orb of numberOfOrbs"
      :key="orb"
      class="orb"
      :class="`orb-${orb}`"
    />
  </ul>
</template>

<style scoped lang="scss">
.orb-container {
  display: flex;
  flex-direction: row;
  margin: auto;
  width: fit-content;

  .orb {
    border-radius: 50%;
    min-width: 1em;
    min-height: 1em;
    background-color: $primary-color;
    margin: 0.25rem;
  }
}

@for $index from 1 through 10 {
  .orb.orb-#{$index} {
    animation: pulse-#{$index} 3s linear infinite;
  }

  @keyframes pulse-#{$index} {
    0% {
      box-shadow: 0 0 0 0 $primary-color;
    }
    #{(4% * $index)} {
      box-shadow: 0 0 0 (0.0225rem * $index) $primary-color;
    }
    #{(6% * $index)} {
      box-shadow: 0 0 0 (0.018rem * $index) $primary-color;
    }
    70% {
      box-shadow: 0 0 0 0.1rem $primary-color;
    }
    100% {
      box-shadow: 0 0 0 0$primary-color;
    }
  }
}
</style>
