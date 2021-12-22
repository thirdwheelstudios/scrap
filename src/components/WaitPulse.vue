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
    background-color: #d5433e;
    margin: 0.25rem;
  }
}

@for $index from 1 through 10 {
  .orb.orb-#{$index} {
    animation: pulse-#{$index} 3s linear infinite;
  }

  @keyframes pulse-#{$index} {
    0% {
      box-shadow: 0 0 0 0 #d5433e;
    }
    #{(4% * $index)} {
      box-shadow: 0 0 0 (0.0225rem * $index) #d5433e;
    }
    #{(6% * $index)} {
      box-shadow: 0 0 0 (0.018rem * $index) #d5433e;
    }
    70% {
      box-shadow: 0 0 0 0.1rem #d5433e;
    }
    100% {
      box-shadow: 0 0 0 0 #d5433e;
    }
  }
}
</style>
