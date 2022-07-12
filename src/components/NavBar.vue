<script setup lang="ts"></script>

<template>
  <nav>
    <ul>
      <li><router-link to="/">Record</router-link></li>
      <li><router-link to="/scrap-book">My Scrapbook</router-link></li>
      <li><router-link to="/settings">Settings</router-link></li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  background-color: #0101011a;
  padding: 1rem;
  box-shadow: 0 2px 5px $border-color;
  text-transform: uppercase;
  font-weight: 700;
  text-underline-offset: 5px;

  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      display: inline;
      margin: 0.5rem;
    }
  }
}
</style>
