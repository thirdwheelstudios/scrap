<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ContentContainer from '../components/ContentContainer.vue'
import Group from '../components/Group.vue'
import { useSettingsStore } from '../store'

const router = useRouter()
const settings = useSettingsStore()

const appTheme = ref(settings.theme)

const onBackToScrap = () => {
  router.push({ name: 'home' })
}

watch(
  () => appTheme.value,
  (theme) => {
    settings.setTheme(theme)
  }
)
</script>

<template>
  <ContentContainer title="Settings">
    <template v-slot:title-content
      ><button type="button" @click="onBackToScrap">
        ⬅ Back to Scrap
      </button></template
    >
    <Group group-title="Theme">
      <form>
        <div class="radio-button">
          <input type="radio" id="autoTheme" v-model="appTheme" :value="0" />
          <label for="autoTheme">Auto (System)</label>
        </div>
        <div class="radio-button">
          <input type="radio" id="darkTheme" v-model="appTheme" :value="1" />
          <label for="darkTheme">Dark Theme</label>
        </div>
        <div class="radio-button">
          <input type="radio" id="lightTheme" v-model="appTheme" :value="2" />
          <label for="lightTheme">Light Theme</label>
        </div>
      </form>
    </Group>
  </ContentContainer>
</template>

<style scoped lang="scss">
form {
  display: grid;
  margin-top: 0.5rem;

  .radio-button {
    input,
    label {
      cursor: pointer;
    }
  }

  div {
    margin: 0.1rem;
  }
}
</style>
