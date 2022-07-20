<script setup lang="ts">
import { useSettingsStore, useToastStore } from '../../store'
import GroupContainer from '../GroupContainer.vue'

const toast = useToastStore()
const settings = useSettingsStore()

const onOkay = () => {
  settings.setCookiesAccepted(true)
  toast.close()
}
</script>

<template>
  <GroupContainer class="cookie-container">
    <h4>We value your privacy</h4>
    <div>
      <small>
        Scrap uses cookies to enhance your browsing experience and serve
        personalized ads.
      </small>
    </div>
    <button @click="onOkay">Accept</button>
    <router-link to="/privacy">Read More</router-link>
  </GroupContainer>
</template>

<style scoped lang="scss">
.cookie-container {
  margin: 1em;
  padding: 0.5em;

  h4,
  small {
    margin: 0.5em;
  }

  button {
    margin-top: 0.5em;
    margin-right: 0.5em;
  }
}
</style>
