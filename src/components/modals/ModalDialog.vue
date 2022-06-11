<script setup lang="ts">
import GroupContainer from '../GroupContainer.vue'

interface Props {   
  titleText?: string
  messageText?: string
  okayText?: string
  cancelText?: string
}

withDefaults(defineProps<Props>(), {
  titleText: '',
  messageText: undefined,
  okayText: 'Okay',
  cancelText: 'Cancel'
})
defineEmits(['okay', 'cancel'])
</script>

<template>
  <GroupContainer class="group-container">
    <h2 v-show="titleText">{{ titleText }}</h2>
    <form @submit.prevent="$emit('okay')">
      <p v-if="messageText">{{ messageText }}</p>
      <slot v-else @cancel="$emit('cancel')" />
      <div>
        <button type="submit">{{ okayText }}</button>
        <button type="button" @click="$emit('cancel')">{{ cancelText }}</button>
      </div>
    </form>
  </GroupContainer>
</template>

<style scoped lang="scss">
.group-container {
  padding: 1rem 1.5rem;
}

div {
  button {
    margin: 0 0.5rem;
  }

  button:first-child {
    margin-left: 0;
  }
}
</style>
