<script setup lang="ts">
import { watch, computed, onBeforeMount } from 'vue'
import { useSettingsStore } from './store'
import { setTheme } from './utils/theme'
import ModalContainer from './components/modals/ModalContainer.vue'
import AppFooter from './components/AppFooter.vue'
import UpdatePwa from './components/UpdatePwa.vue'
import NavBar from './components/NavBar.vue'
import BrowserNotSupported from './components/BrowserNotSupported.vue'
import { screenRecording } from './composables/screenRecording'

const { isSupported } = screenRecording()

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
        <stop class="linear-stop-2" offset="40%"></stop>
        <stop class="linear-stop-3" offset="100%"></stop>
      </linearGradient>
    </defs>
  </svg>
  <template v-if="isSupported">
    <NavBar />
    <div class="main-content">
      <router-view />
      <AppFooter class="footer" />
    </div>
    <ModalContainer />
    <UpdatePwa />
  </template>
  <BrowserNotSupported v-else />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.svg-settings {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);

  $gradient-colors: $button-gradient-1 $button-gradient-3 $button-gradient-3;

  @for $i from 1 through length($gradient-colors) {
    .linear-stop-#{$i} {
      stop-color: nth($gradient-colors, $i);
    }
  }
}

.fill-gradient-linear path {
  fill: url(#linear);
}

button .fill-gradient-linear:hover {
  filter: drop-shadow(3px 1px 5px $button-gradient-1);
}

a {
  color: $primary-color;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

nav {
  a {
    padding: 0.5rem;
    border-radius: 0.25rem;
  }
  a:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
  a.is-active {
    background-color: rgba(255, 255, 255, 0.3);
  }
}

.main-content {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: $max-width;
  padding: 1rem 2rem;
  padding-top: 0;
  height: calc(100vh - 85px);

  .footer {
    flex-grow: 1;
  }
}
</style>
