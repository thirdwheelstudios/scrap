<script setup lang="ts">
import { computed } from 'vue'

const aboutList = computed(() => {
  return [
    { 
      title: 'No account neccessary', 
      text: 'You don\'t need to create an account or sign in to use Scrap, you can get started right away.'
    },
    { 
      title: 'No limitations', 
      text: 'Videos you create in Scrap can be as long as you want, we won\'t cut you short.'
    },
    { 
      title: 'Privacy by default', 
      text: 'All of your recordings are stored locally in your browser, with nothing uploaded to any servers.'
    },
  ]
})

</script>

<template>
<h1><font-awesome-icon :icon="['fas','question-circle']" /> What is Scrap?</h1>
<p>Scrap is a completely free screen recording application. You can use it to record any screen on your computer, including specific windows or browser tabs.</p>
<p>Unlike some other screen recording applications, Scrap doesn't need you to install any additional software or browser plug-ins. Everything is done using technology that is already built in to your web browser.</p>
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