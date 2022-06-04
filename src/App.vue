<script setup lang="ts">
import { watch, computed, onBeforeMount } from 'vue'
import { useSettingsStore } from './store'
import { setTheme } from './utils/theme'
import ModalContainer from './components/modals/ModalContainer.vue'

const settings = useSettingsStore()

const appTheme = computed(() => settings.theme)

watch(
  () => appTheme.value,
  (theme) => {
    setTheme(theme)
  }
)

onBeforeMount(() => setTheme(appTheme.value))
</script>

<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="svg-settings">
    <defs>
      <linearGradient id="linear" gradientTransform="rotate(-30)">
        <stop class="linear-stop1" offset="0%"></stop>
        <stop class="linear-stop2" offset="20%"></stop>
        <stop class="linear-stop3" offset="40%"></stop>
        <stop class="linear-stop4" offset="100%"></stop>
      </linearGradient>
    </defs>
  </svg>
  <router-view />
  <ModalContainer />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 2rem;
}

.svg-settings {
  /* Hiding this content since it's just settings. See - https://snook.ca/archives/html_and_css/hiding-content-for-accessibility */
  position: absolute !important;
  height: 1px; width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);

  .linear-stop1 {
    stop-color: $button-gradient-1;
  }

  .linear-stop2 {
    stop-color: $button-gradient-2;
  }

  .linear-stop3 {
    stop-color: $button-gradient-3;
  }

  .linear-stop4 {
    stop-color: $button-gradient-4;
  }
}

.fill-gradient-linear path {
  fill: url(#linear);
}

.fill-gradient-linear:hover {
  filter: drop-shadow(3px 1px 5px $button-gradient-1);
}
</style>
