import { createApp } from 'vue'
import App from './App.vue'
import Store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faStopwatch,
  faCalendar,
  faFileDownload,
  faTrashAlt,
  faPencilAlt,
  faTimes,
  faCheck,
  faCog,
  faSave,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faStopwatch,
  faCalendar,
  faFileDownload,
  faTrashAlt,
  faPencilAlt,
  faTimes,
  faCheck,
  faCog,
  faSave,
  faTimesCircle
)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(Store)
  .mount('#app')
