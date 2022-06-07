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
  faQuestion,
  faCopyright,
} from '@fortawesome/free-solid-svg-icons'
import DeleteRecordingModal from './components/modals/DeleteRecordingModal.vue'
import DeleteAllRecordingsModal from './components/modals/DeleteAllRecordingsModal.vue'
import RenameRecordingModal from './components/modals/RenameRecordingModal.vue'
import PlayRecordingModal from './components/modals/PlayRecordingModal.vue'
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
  faQuestion,
  faCopyright)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('delete-recording-modal', DeleteRecordingModal)
  .component('delete-all-recordings-modal', DeleteAllRecordingsModal)
  .component('rename-recording-modal', RenameRecordingModal)
  .component('play-recording-modal', PlayRecordingModal)
  .use(router)
  .use(pinia)
  .mount('#app')
