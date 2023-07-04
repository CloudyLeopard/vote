import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import PrimeVue styling
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import ToastService from 'primevue/toastservice';


// import bootstrap styling
// import 'bootstrap/dist/css/bootstrap.css'

// Prime vue theme, core, icons, and others
import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';   
import '/node_modules/primeflex/primeflex.css'; // PrimeFlex

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUser, faFlag, faMap, faComment, faEdit, faBookmark } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faUser)
library.add(faFlag)
library.add(faMap)
library.add(faComment)
library.add(faEdit)
library.add(faBookmark)


// import font
import 'typeface-roboto';
import 'typeface-mali';

const app = createApp(App)
    .use(router)
    .use(PrimeVue)
    // .use(Toast)
    .use(ToastService)
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('Button', Button)
    .component('Card', Card)
    .component('InputText', InputText)

app.provide('$hostname', 'http://localhost:5001')


app.mount('#app')
