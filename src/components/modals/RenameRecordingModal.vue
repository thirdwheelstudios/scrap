<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Recording } from '../../models'
import { useModalStore, useRecordingsListStore } from '../../store'
import ModalDialog from './ModalDialog.vue'

interface Props {
  recording: Recording
}

const props = defineProps<Props>()
const description = ref(props.recording.description)
const descriptionEle = ref<HTMLInputElement>()

const modal = useModalStore()
const recordingsList = useRecordingsListStore()

const onRenameResponse = async () => {
  if (!props.recording.id) return
    
  await recordingsList.updateById(props.recording.id, { description: description.value })
  modal.close()
}
const onCancelResponse = () => modal.close()

onMounted(() => {
  descriptionEle.value?.focus()
  descriptionEle.value?.setSelectionRange(0, description.value?.length)
})
</script>

<template>
  <ModalDialog 
    title-text="Rename Recording" 
    okay-text="Rename"
    @okay="onRenameResponse" 
    @cancel="onCancelResponse">
    <div>
      <input id="description" ref="descriptionEle" v-model="description" placeholder="Enter a new description" autofocus >
    </div>
  </ModalDialog>
</template>

<style scoped lang="scss">
div {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    min-width: 300px;

    input {
        margin: 0.5rem 0;
    }
}
</style>
