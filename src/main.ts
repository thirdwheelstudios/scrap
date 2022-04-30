import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'

const pinia = createPinia()

library.add(faFileDownload)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(pinia)
  .mount('#app')
