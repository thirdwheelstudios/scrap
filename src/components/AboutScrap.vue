<script setup lang="ts">
import { computed } from 'vue'


const aboutList = computed(() => {
  return [
    { 
      title: 'No fuss screen recording', 
      text: 'Scrap uses the latest web browser technology to create screen recordings. This means you don\'t need to install any software to create your screen recordings.'
    },
    { 
      title: 'No account necessary', 
      text: 'You don\'t need to create an account to use Scrap. You can get started straight away.'
    },
    { 
      title: 'Privacy by default', 
      text: 'All of your recordings are stored locally in your browser, with nothing uploaded to any servers.'
    },
  ]
})

</script>

<template>
<h1><font-awesome-icon :icon="['fas','question-circle']" /> About Scrap</h1>
<ul>
    <li v-for="about of aboutList" :key="about.title">
      <strong>{{ about.title }}</strong>
      <span>{{ about.text }}</span>
    </li>
</ul>
</template>

<style scoped lang="scss">
strong {
    display: block;
    margin: 0.5rem 0;
}
</style>