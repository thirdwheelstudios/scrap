<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { AppTheme } from '../enums'
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

const videoSettings = ref([
  {value: 1000000, name: '360p'},
  {value: 2500000, name: '480p'},
  {value: 5000000, name: '720p'},
  {value: 8000000, name: '1080p'},
  {value: 16000000, name: '2k'},
  {value: 40000000, name: '4k'},
])

const audioSettings = ref([ 
  {value: 96000, name: 'Low - 96kbps'},
  {value: 128000, name: 'Medium - 128kbps'},
  {value: 160000, name: 'High - 160kbps'}
])

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

watch(
  () => videoBitsPerSecond.value, 
  (bitsPerSecond) => {
    settings.setVideoBitsPerSecond(bitsPerSecond)
  })

watch(
  () => audioBitsPerSecond.value, 
  (bitsPerSecond) => {
    settings.setAudioBitsPerSecond(bitsPerSecond)
  })

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
          <input id="autoTheme" v-model="appTheme" type="radio" :value="AppTheme.auto" />
          <label for="autoTheme">Auto (System)</label>
        </div>
        <div class="radio-button">
          <input id="darkTheme" v-model="appTheme" type="radio" :value="AppTheme.dark" />
          <label for="darkTheme">Dark Theme</label>
        </div>
        <div class="radio-button">
          <input id="lightTheme" v-model="appTheme" type="radio" :value="AppTheme.light" />
          <label for="lightTheme">Light Theme</label>
        </div>
      </form>
    </GroupContainer>
    <GroupContainer group-title="Recording Quality">
      <form>
        <div>
          <label for="videoBitsPerSecond">Video </label>
          <select id="videoBitsPerSecond" v-model="videoBitsPerSecond" name="videoBitsPerSecond">
            <option v-for="setting of videoSettings" :key="setting.value" :value="setting.value">{{ setting.name }}</option>
          </select>
        </div>
        <div>
          <label for="audioBitsPerSecond">Audio </label>
          <select id="audioBitsPerSecond" v-model="audioBitsPerSecond" name="audioBitsPerSecond">
            <option v-for="setting of audioSettings" :key="setting.value" :value="setting.value">{{ setting.name }}</option>
          </select>
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
    margin: 0.25rem;
  }
}
</style>
