<script setup lang="ts">
import { computed } from 'vue'
import ContentContainer from '../components/ContentContainer.vue'
import GroupContainer from '../components/GroupContainer.vue'

const aboutList = computed(() => {
  return [
    {
      title: 'No account neccessary',
      text: 'You don\'t need to create an account or sign in to use Scrap, you can get started right away.',
    },
    {
      title: 'No limitations',
      text: 'There\'s no time limit applied to your screen recordings in Scrap. Record for as long as you want.',
    },
    {
      title: 'Privacy as standard',
      text: 'All of your recordings are stored locally in your browser, nothing is shared outside of your browser.',
    },
  ]
})
</script>

<template>
  <ContentContainer>
    <template #title-content>
      <h1>
        <font-awesome-icon :icon="['fas', 'question-circle']" /> What is Scrap?
      </h1>
    </template>
    <GroupContainer>
      <p>
        Scrap is a free application for creating screen recordings. You can use
        it to record any screen or app on your computer, not just your browser
        tabs.
      </p>
      <p>
        Scrap doesn't require any additional software or browser plug-ins to
        work. Everything is done using features that are already in your
        browser.
      </p>
      <ul>
        <li v-for="about of aboutList" :key="about.title">
          <strong>{{ about.title }}</strong>
          <span>{{ about.text }}</span>
        </li>
      </ul>
    </GroupContainer>
  </ContentContainer>
</template>

<style scoped lang="scss">
h1 {
  margin: 0;
}
strong {
  display: block;
  margin: 0.5rem 0;
}
</style>
