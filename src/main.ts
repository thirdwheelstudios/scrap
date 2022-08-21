import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faFileDownload,
  faTrash,
  faPlay,
  faFilePen,
  faCalendarDay,
  faStopwatch,
  faCircle,
  faCircleNotch,
  faFilm,
  faQuestionCircle,
  faCopyright,
  faXmark,
  faMicrophone,
  faMicrophoneSlash,
} from '@fortawesome/free-solid-svg-icons'
import DeleteRecordingModal from './components/modals/DeleteRecordingModal.vue'
import DeleteAllRecordingsModal from './components/modals/DeleteAllRecordingsModal.vue'
import RenameRecordingModal from './components/modals/RenameRecordingModal.vue'
import PlayRecordingModal from './components/modals/PlayRecordingModal.vue'
import AcceptCookies from './components/toast/AcceptCookies.vue'
import App from './App.vue'
import router from './router'

const pinia = createPinia()

library.add(
  faFileDownload,
  faTrash,
  faPlay,
  faFilePen,
  faCalendarDay,
  faStopwatch,
  faCircle,
  faCircleNotch,
  faFilm,
  faQuestionCircle,
  faCopyright,
  faXmark,
  faMicrophone,
  faMicrophoneSlash
)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('delete-recording-modal', DeleteRecordingModal)
  .component('delete-all-recordings-modal', DeleteAllRecordingsModal)
  .component('rename-recording-modal', RenameRecordingModal)
  .component('play-recording-modal', PlayRecordingModal)
  .component('accept-cookies', AcceptCookies)
  .use(router)
  .use(pinia)
  .mount('#app')
