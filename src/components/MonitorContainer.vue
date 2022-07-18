<script setup lang="ts">
interface Props {
  powerOn?: boolean
}

withDefaults(defineProps<Props>(), {
  powerOn: false,
})
</script>

<template>
  <div class="monitor">
    <div class="body">
      <div class="screen">
        <div class="content">
          <slot></slot>
          <div class="content-overlay"></div>
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
$content-background: #423c5d;
$content-gradient-start: #3f395950;
$content-gradient-end: #29234585;
$body-color: #ddd;
$stand-color: #aeaeae;

.monitor {
  width: 13.6rem;
  margin: 1rem auto;

  .body {
    height: 10rem;
    background: $body-color;
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
        position: relative;
        background-color: $content-background;

        .content-overlay {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(
            155deg,
            $content-gradient-start 55%,
            $content-gradient-end 45%
          );
          z-index: 2;
          pointer-events: none;
          filter: blur(10px);
        }
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
    width: 8rem;
    height: 2.5rem;
    background: $stand-color;
    clip-path: polygon(
      2% 95%,
      35% 85%,
      35% 0%,
      65% 0%,
      65% 85%,
      98% 95%,
      100% 100%,
      0% 100%
    );
    -webkit-clip-path: polygon(
      2% 95%,
      35% 85%,
      35% 0%,
      65% 0%,
      65% 85%,
      98% 95%,
      100% 100%,
      0% 100%
    );
    border-radius: 0.2rem;
    box-shadow: inset 0 -0.4rem 0 rgba(0, 0, 0, 0.1);
    margin: 0 auto;
  }
}
</style>
