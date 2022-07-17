<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { DateTime } from 'luxon'

const date = ref(DateTime.now())
const isMounted = ref(false)

const year = computed(() => date.value.year)

onMounted(() => (isMounted.value = true))
</script>

<template>
  <footer>
    <transition name="fade">
      <small v-if="isMounted"
        ><font-awesome-icon :icon="['fas', 'copyright']" />
        {{ year }} thirdwheel studios -
        <router-link to="/privacy">Privacy Policy</router-link></small
      >
    </transition>
  </footer>
</template>

<style scoped lang="scss">
footer {
  display: flex;
  flex-direction: column;
  justify-content: end;
  text-align: center;
}

.fade-enter-active {
  transition: opacity 2s ease;
}

.fade-enter-from {
  opacity: 0;
}
</style>
