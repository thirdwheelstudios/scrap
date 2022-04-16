<script setup lang="ts">
import { ref, watch } from 'vue'
import SettingGroup from '../components/settings/SettingGroup.vue'
import { useSettingsStore } from '../store'

const settings = useSettingsStore()

const appTheme = ref(settings.theme)

watch(
  () => appTheme.value,
  (theme) => {
    settings.setTheme(theme)
  }
)
</script>

<template>
  <div class="settings-container">
    <h1>Settings</h1>
    <SettingGroup group-title="Theme">
      <form>
        <div>
          <input type="radio" id="autoTheme" v-model="appTheme" value="0" />
          <label for="autoTheme">Auto (System)</label>
        </div>
        <div>
          <input type="radio" id="darkTheme" v-model="appTheme" value="1" />
          <label for="darkTheme">Dark Theme</label>
        </div>
        <div>
          <input type="radio" id="lightTheme" v-model="appTheme" value="2" />
          <label for="lightTheme">Light Theme</label>
        </div>
      </form>
    </SettingGroup>
  </div>
</template>

<style scoped lang="scss">
.settings-container {
  margin: auto;
  max-width: 800px;

  form {
    display: grid;
    margin-top: 1rem;

    div {
      margin: 0.1rem;
    }
  }
}
</style>
