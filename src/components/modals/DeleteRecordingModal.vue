<script setup lang="ts">
import { useModalStore, useRecordingsListStore } from '../../store'
import Group from '../Group.vue'

interface Props {
  id: number
}

const props = defineProps<Props>()

const modal = useModalStore()
const recordingsList = useRecordingsListStore()

const onYesResponse = async () => {
  await recordingsList.deleteById(props.id)
  modal.close()
}
const onNoResponse = () => modal.close()
</script>

<template>
  <Group>
    <h2>Delete Recording?</h2>
    <p>Are you sure you want to delete this recording?</p>
    <div>
      <button type="button" @click="onYesResponse">Yes</button>
      <button type="button" @click="onNoResponse">No</button>
    </div>
  </Group>
</template>

<style scoped lang="scss">
div button {
  margin: 0 0.5rem;
}
</style>
