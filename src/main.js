import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './assets/main.css'
const app = createApp(App)
const vuetify = createVuetify({
	components,
	directives
})
app.use(vuetify)
app.use(router)
app.mount('#app')
