<script lang="ts">
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const isRecording = computed(() => store.getters['isRecording'])
    const tooltipText = computed(() => isRecording.value ? 'Stop recording' : 'Start a recording')

    return {
      onRecordClick: () => {
        const action = isRecording.value ? 'stopRecording' : 'startRecording'
        store.dispatch(action)
      },
      isRecording,
      tooltipText
    }
  },
}
</script>

<template>
  <button :title="tooltipText" @click="onRecordClick">
    <div class="monitor">
      <div class="body" :class="{ recording: isRecording }">
        <div class="screen">
          <div class="content"></div>
          <div class="recording-status"></div>
        </div>
        <div class="power"></div>
      </div>
      <div class="stand" />
    </div>
  </button>
</template>

<style scoped lang="scss">
button {
  background: none;
  border: none;
  cursor: pointer;
}

.monitor {
  width: 16rem;
  margin: 2rem auto;

  .body {
    height: 10rem;
    background: #ddd;
    border-radius: 0.4rem;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 -0.1rem 0 #bebebe;

    .screen {
      height: 7rem;
      border: 10px solid #000;
      background: #101010;
      overflow: hidden;
      transition: background 0.5s;
      border-radius: 5px 5px 0 0;

      .content {
        width: 100%;
        height: 100%;
        background-image: linear-gradient(155deg, #ebebeb 60%, #e7e7e7 40%);
      }

      .recording-status {
        position: absolute;
        top: 0;
        margin: 2rem 5.5rem;
        background-image: linear-gradient(140deg, #d5433e 40%, #ad2b26 60%);
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
        transition: border-radius 0.2s;
      }
    }

    .power {
      background: #606060;
      width: 0.3rem;
      height: 0.15rem;
      float: right;
      margin-right: 0.5rem;
      margin-top: 1rem;
      transition: background 0.2s;
    }
  }

  .body.recording {
    .screen .recording-status {
      background-image: linear-gradient(140deg, #414141 40%, #313131 60%);
      border-radius: 10%;
    }
    .power {
      background: #67da63;
      box-shadow: 0 0 10px 1px #67da63;
    }
  }

  .stand {
    width: 3rem;
    height: 1.5rem;
    background: #aeaeae;
    border: 1.5rem solid #afacac;
    border-top: 0;
    border-left: 1.5rem solid #fff;
    border-right: 1.5rem solid #fff;
    border-bottom: 1.5rem solid #c5c5c5;
    border-radius: 0.3rem;
    box-shadow: inset 0 -0.1rem 0 #bebebe;
    margin: 0 auto;
  }
}
</style>
