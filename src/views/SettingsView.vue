<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import ContentContainer from '../components/ContentContainer.vue'
import GroupContainer from '../components/GroupContainer.vue'
import { useModalStore, useRecordingsListStore, useSettingsStore } from '../store'

const router = useRouter()
const modal = useModalStore()
const settings = useSettingsStore()
const recordingsList = useRecordingsListStore()

const appTheme = ref(settings.theme)
const videoBitsPerSecond = ref(settings.videoBitsPerSecond)
const audioBitsPerSecond = ref(settings.audioBitsPerSecond)
const recordingsCount = computed(() => recordingsList.totalCount)

const videoSettings = ref([{value: 1250000, name: 'Medium'}])

const onBackToScrap = () => {
  router.push({ name: 'home' })
}

const onDeleteRecordings = async () => {
  modal.open('delete-all-recordings-modal')
}

watch(
  () => appTheme.value,
  (theme) => {
    settings.setTheme(theme)
  }
)

onMounted(async () => {
  await recordingsList.load()
})
</script>

<template>
  <ContentContainer title="Settings">
    <template #title-content
      ><button type="button" @click="onBackToScrap">
        ⬅ Back to Scrap
      </button></template
    >
    <GroupContainer group-title="Theme">
      <form>
        <div class="radio-button">
          <input id="autoTheme" v-model="appTheme" type="radio" :value="0" />
          <label for="autoTheme">Auto (System)</label>
        </div>
        <div class="radio-button">
          <input id="darkTheme" v-model="appTheme" type="radio" :value="1" />
          <label for="darkTheme">Dark Theme</label>
        </div>
        <div class="radio-button">
          <input id="lightTheme" v-model="appTheme" type="radio" :value="2" />
          <label for="lightTheme">Light Theme</label>
        </div>
      </form>
    </GroupContainer>
    <GroupContainer group-title="Recordings">
      <form>
        <p>
          {{ recordingsCount }} screen recording{{
            recordingsCount === 1 ? '' : 's'
          }}
        </p>
        <button
          type="button"
          :disabled="recordingsCount === 0"
          @click="onDeleteRecordings"
        >
          Delete all recordings
        </button>
      </form>
    </GroupContainer>
    <GroupContainer group-title="Recording Quality">
      <form>
        <label for="videoBitsPerSecond">Video </label>
        <select id="videoBitsPerSecond" v-model="videoBitsPerSecond" name="videoBitsPerSecond">
          <option v-for="setting of videoSettings" :key="setting.value" :value="setting.value">{{ setting.name }}</option>
        </select>
      </form>
    </GroupContainer>
  </ContentContainer>
</template>

<style scoped lang="scss">
form {
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
