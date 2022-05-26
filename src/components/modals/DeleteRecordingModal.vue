<script setup lang="ts">
import { computed } from 'vue'
import { Recording } from '../../models'
import { useModalStore, useRecordingsListStore } from '../../store'
import ModalDialog from './ModalDialog.vue'

interface Props {
  recording: Recording
}

const props = defineProps<Props>()

const modal = useModalStore()
const recordingsList = useRecordingsListStore()

const message = computed(() => {
  const description = props.recording?.description ?? `Recording ${props.recording.id}`

  return `Are you sure you want to delete '${description}'?`
})

const onYesResponse = async () => {
  await recordingsList.deleteById(props.recording.id!)
  modal.close()
}
const onNoResponse = () => modal.close()
</script>

<template>
  <ModalDialog 
    title-text="Delete Recording?" 
    :message-text="message" 
    okay-text="Yes"
    cancel-text="No"
    @okay="onYesResponse" 
    @cancel="onNoResponse" />
</template>
