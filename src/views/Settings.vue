<script setup lang="ts">
import { ref } from 'vue'
import SettingGroup from '../components/settings/SettingGroup.vue'
import { AppTheme } from '../enums'

const appTheme = ref(AppTheme.auto)
</script>

<template>
  <div class="settings-container">
    <h1>Settings</h1>
    <SettingGroup group-title="Theme">
      <form>
        <span>
          <input type="radio" id="autoTheme" v-model="appTheme" value="0" />
          <label for="autoTheme">Auto (System)</label>
        </span>
        <span>
          <input type="radio" id="darkTheme" v-model="appTheme" value="1" />
          <label for="darkTheme">Dark Theme</label>
        </span>
        <span>
          <input type="radio" id="lightTheme" v-model="appTheme" value="2" />
          <label for="lightTheme">Light Theme</label>
        </span>
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

    span {
      margin: 0.1rem;
    }
  }
}
</style>
