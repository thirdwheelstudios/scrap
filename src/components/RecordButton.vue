<script lang="ts">
import { ref, watchEffect } from 'vue'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import StopwatchTimer from './StopwatchTimer.vue'
import { screenRecording } from '../composables/screenRecording'

export default {
  setup() {
    const store = useStore()
    const { isSupported } = screenRecording()

    const isRecording = computed(() => store.getters['isRecording'])
    const mediaStream = computed(() => store.getters['mediaStream'])
    const recordingStartTime = computed(
      () => store.getters['recordingStartTime']
    )
    const tooltipText = computed(() => {
      if (!isSupported.value) return 'Unsupported browser'

      return isRecording.value ? 'Stop recording' : 'Start a recording'
    })

    const videoEle = ref(null)
    const canvasEle = ref(null)

    watchEffect(
      () => {
        if (!videoEle.value || !canvasEle.value) return

        const canvas: HTMLCanvasElement = canvasEle.value
        const video: HTMLVideoElement = videoEle.value

        setTimeout(() => {
          canvas.width = video.clientWidth
          canvas.height = video.clientHeight

          const context = canvas.getContext('2d')
          if (!context) return

          context.drawImage(video, 0, 0, canvas.width, canvas.height)

          canvas.toBlob((blob) => {
            store.dispatch('setThumbnail', blob)
          })
        }, 250)
      },
      { flush: 'post' }
    )

    return {
      onRecordClick: () => {
        const action = isRecording.value ? 'stopRecording' : 'startRecording'
        store.dispatch(action)
      },
      onSettingsClick: () => {
        store.dispatch('setModalComponent', 'CaptureSettings')
      },
      isRecording,
      mediaStream,
      recordingStartTime,
      tooltipText,
      videoEle,
      canvasEle,
      isSupported,
    }
  },
  components: { StopwatchTimer },
}
</script>

<template>
  <button :title="tooltipText" @click="onRecordClick" :disabled="!isSupported">
    <div class="monitor">
      <div class="body" :class="{ recording: isRecording }">
        <div class="screen">
          <div class="content">
            <video
              v-if="mediaStream"
              ref="videoEle"
              :src-object.prop.camel="mediaStream"
              autoplay="true"
            />
            <canvas v-if="mediaStream" ref="canvasEle" />
            <div v-if="isSupported" class="recording-status" />
            <div v-else class="not-supported">
              <font-awesome-icon icon="times-circle" />
            </div>
            <button
              v-if="!isRecording && isSupported"
              @click.stop="onSettingsClick"
            >
              <font-awesome-icon icon="cog" />
            </button>
          </div>
        </div>
        <StopwatchTimer
          v-if="recordingStartTime"
          class="timer"
          :date="recordingStartTime"
        />
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

button[disabled] {
  cursor: not-allowed;
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
        background-image: linear-gradient(155deg, #404040 60%, #333333 40%);

        video {
          width: 100%;
        }

        canvas {
          width: 100%;
          display: none;
        }

        .recording-status {
          position: absolute;
          left: 50%;
          top: 20%;
          transform: translate(-50%, 0);
          background-image: linear-gradient(155deg, #d5433e 40%, #ad2b26 60%);
          height: 4rem;
          width: 4rem;
          border-radius: 50%;
          transition: all ease-in 0.4s;
          box-shadow: 0 0 0.25rem #d5433e;
        }

        .not-supported {
          color: #a72925;
          font-size: 4rem;
          margin: auto;
          position: relative;

          * {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 1.25rem;
          }
        }

        button {
          position: absolute;
          right: 0;
          margin-right: 0.5rem;
          margin-top: 0.25rem;
          font-size: 1.5rem;
          color: #bcbcbc;

          :hover {
            color: #ddd;
          }
        }
      }
    }

    .timer {
      margin-left: 0.4rem;
      margin-top: 0.4rem;
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
    .content .recording-status {
      border-radius: 10%;
      box-shadow: 0 0 0.3rem #d5433e;
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
    border-left: 1.5rem solid #f5f7fb;
    border-right: 1.5rem solid #f5f7fb;
    border-bottom: 1.5rem solid #c5c5c5;
    border-radius: 0.3rem;
    box-shadow: inset 0 -0.1rem 0 #bebebe;
    margin: 0 auto;
  }
}
</style>
