<script setup lang="ts">
interface Props {
  powerOn?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  powerOn: false,
})
</script>

<template>
  <div class="monitor">
    <div class="body">
      <div class="screen">
        <div class="content">
          <slot></slot>
        </div>
      </div>
      <div class="power" :class="{ on: powerOn }"></div>
    </div>
    <div class="stand" />
  </div>
</template>

<style scoped lang="scss">
$power-button-off: #606060;
$power-button-on: #67da63;
$content-gradient-start: #404040;
$content-gradient-end: #333333;

.monitor {
  width: 16rem;
  margin: 1rem auto;

  .body {
    height: 10rem;
    background: #ddd;
    border-radius: 0.4rem;
    overflow: hidden;
    position: relative;
    box-shadow: inset -0.05rem -0.1rem 0 #bebebe;
    text-align: left;

    .screen {
      height: 7rem;
      border: 0.6rem solid #000;
      background: #101010;
      overflow: hidden;
      transition: background 0.5s;
      border-radius: 5px 5px 0 0;

      .content {
        width: 100%;
        height: 100%;
        background-image: linear-gradient(
          155deg,
          $content-gradient-start 60%,
          $content-gradient-end 40%
        );
      }
    }

    .power {
      background: $power-button-off;
      width: 0.3rem;
      height: 0.15rem;
      float: right;
      margin-right: 0.5rem;
      margin-top: 1rem;
      transition: background 0.2s;
    }

    .power.on {
      background: $power-button-on;
      box-shadow: 0 0 10px 1px $power-button-on;
    }
  }

  .stand {
    width: 3rem;
    height: 1.5rem;
    background: #aeaeae;
    border: 1.5rem solid #afacac;
    border-top: 0;
    border-left: 1.5rem solid $bg-color;
    border-right: 1.5rem solid $bg-color;
    border-bottom: 1.5rem solid #c5c5c5;
    border-radius: 0.3rem;
    box-shadow: inset 0 -0.1rem 0 #bebebe;
    margin: 0 auto;
  }
}
</style>
