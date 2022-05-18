import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFileDownload, faTrash } from '@fortawesome/free-solid-svg-icons'
import DeleteRecordingModal from './components/modals/DeleteRecordingModal.vue'
import App from './App.vue'
import router from './router'

const pinia = createPinia()

library.add(faFileDownload, faTrash)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('delete-recording-modal', DeleteRecordingModal)
  .use(router)
  .use(pinia)
  .mount('#app')
