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
        <stop class="linear-stop-1" offset="0%"></stop>
        <stop class="linear-stop-2" offset="20%"></stop>
        <stop class="linear-stop-3" offset="40%"></stop>
        <stop class="linear-stop-4" offset="100%"></stop>
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
  position: absolute !important;
  height: 1px; width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);

  $gradient-colors: $button-gradient-1 $button-gradient-2 $button-gradient-3 $button-gradient-4;

  @for $i from 1 through length($gradient-colors) {
    .linear-stop-#{$i} {
      stop-color: nth($gradient-colors, $i)
    }
  }
}

.fill-gradient-linear path {
  fill: url(#linear);
}

button .fill-gradient-linear:hover {
  filter: drop-shadow(3px 1px 5px $button-gradient-1);
}
</style>
