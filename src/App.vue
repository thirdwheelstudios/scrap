<script setup lang="ts"></script>

<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/settings">Settings</router-link>
  </div>
  <router-view />
</template>

<style type="scss">
@import './assets/styles/_variables.scss';

html body {
  margin: 0;
}

html {
  background-color: var(--bg-canvas);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
</style>
