<script setup lang="ts">
import { defineEmits } from 'vue'
import GroupContainer from '../GroupContainer.vue'

interface Props {   
  titleText?: string
  messageText: string
  okayText?: string
  cancelText?: string
}

defineProps<Props>()
defineEmits(['okay', 'cancel'])
</script>

<template>
  <GroupContainer>
    <h2 v-show="titleText">{{ titleText }}</h2>
    <p>{{ messageText }}</p>
    <div>
      <button type="button" @click="$emit('okay')">{{ okayText }}</button>
      <button type="button" @click="$emit('cancel')">{{ cancelText }}</button>
    </div>
  </GroupContainer>
</template>

<style scoped lang="scss">
div {
  button {
    margin: 0 0.5rem;
  }

  button:first-child {
    margin-left: 0;
  }
}
</style>
