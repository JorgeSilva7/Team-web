import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify, Loading } from 'quasar'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Notify,
    Loading
  },
  config: {
    notify: { position: 'top', timeout: 3000 }
  }
})
app.use(pinia)
app.use(router)

app.mount('#app')
