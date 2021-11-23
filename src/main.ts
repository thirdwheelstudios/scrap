import { createApp } from 'vue'
import App from './App.vue'
import Store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDesktop, faStopwatch, faCalendar, faFileDownload, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faDesktop, faStopwatch, faCalendar, faFileDownload, faTrashAlt)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(Store)
  .mount('#app')
