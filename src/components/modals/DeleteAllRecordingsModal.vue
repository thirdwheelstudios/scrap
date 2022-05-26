<script setup lang="ts">
import { useModalStore, useRecordingsListStore } from '../../store'
import ModalDialog from './ModalDialog.vue'

const modal = useModalStore()
const recordingsList = useRecordingsListStore()

const onYesResponse = async () => {
  await recordingsList.deleteAll()
  modal.close()
}
const onNoResponse = () => modal.close()
</script>

<template>
  <ModalDialog 
    title-text="Delete All Recordings?" 
    message-text="Are you sure you want to delete all recordings?" 
    okay-text="Yes"
    cancel-text="No"
    @okay="onYesResponse" 
    @cancel="onNoResponse" />
</template>
