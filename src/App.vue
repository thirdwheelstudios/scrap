<script setup lang="ts"></script>

<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/settings">Settings</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
html {
  body {
    margin: 0;
  }

  background-color: $bg-color;
  color: $primary-color;
  transition: background-color 0.2s ease-in, color 0.2s ease-in;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
}
</style>
