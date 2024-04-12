// Style imports
import './assets/main.css'
import "primevue/resources/themes/aura-dark-purple/theme.css";
import "primevue/resources/primevue.min.css"; //core CSS
import "primeicons/primeicons.css"; //icons

// Vue 3
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import ripple from 'primevue/ripple';

// Components
import TabMenu from 'primevue/tabmenu';
import Dialog from "primevue/dialog";
import Button from 'primevue/button'
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Panel from 'primevue/panel';
import Textarea from 'primevue/textarea';




// Router
import router from './router'

// App creation
const app = createApp(App)

// Middlewares
app.use(router)
app.use(PrimeVue)

// Components registration
app.component('mainDialog', Dialog)
app.component('mainButton', Button)
app.component('mainTabMenu', TabMenu)
app.component('mainInputText', InputText)
app.component('mainMenu', Menu)
app.component('mainPanel', Panel)
app.component('mainTextarea', Textarea)

app.directive('ripple', ripple);




// mounting the app
app.mount('#app')
