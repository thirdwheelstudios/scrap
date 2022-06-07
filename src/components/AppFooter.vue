<script setup lang="ts">
import { computed, ref } from 'vue'
import { DateTime } from 'luxon'

const date = ref(DateTime.now())

const year = computed(() => date.value.year)

</script>

<template>
  <footer>
    <small><font-awesome-icon :icon="['fas','copyright']" /> {{ year }} thirdwheel studios</small>
  </footer>
</template>

<style scoped lang="scss">
footer {
  text-align: center;
}
</style>