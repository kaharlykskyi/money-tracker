import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import tooltipDirective from "@/directives/tooltip.directive";
import messagePlugin from "@/utils/message.plugin";
import Loading from "@/components/app/Loading";
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.directive('tooltip', tooltipDirective)
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.component('Loading', Loading)
Vue.component('Paginate', Paginate)


firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
  authDomain: "vue-money-crm-b3387.firebaseapp.com",
  projectId: "vue-money-crm-b3387",
  storageBucket: "vue-money-crm-b3387.appspot.com",
  databaseURL: "vue-money-crm-b3387-default-rtdb.europe-west1.firebasedatabase.app"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})