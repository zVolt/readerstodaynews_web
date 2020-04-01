import '@babel/polyfill'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'

import store from './store'
import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';
import firebase from "firebase/app";
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import * as firebaseui from 'firebaseui'
import SocialSharing from 'vue-social-sharing';

import { firestorePlugin } from 'vuefire'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle, faHammer, faNewspaper, faComments, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitter, faInstagram, faGooglePlus, faLinkedinIn, faWhatsapp, faPinterestP } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import moment from 'vue-moment';

import './custom.scss'
import { config } from './helpers/firebaseConfig'



Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(moment)
Vue.use(VueAxios, axios)
Vue.use(firestorePlugin)
Vue.use(SocialSharing);

Vue.filter('numFormat', numFormat(numeral))
Vue.filter('truncate', function (text, stop, clamp) {
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

Vue.axios.defaults.baseURL = process.env.VUE_APP_API_BACKEND_BASE_URL
Vue.axios.defaults.params = {}
axios.defaults.params['format'] = 'json'

// font-awesome icons
library.add(faFacebookSquare, faTwitter, faInstagram, faGooglePlus, faLinkedinIn, faWhatsapp, faPinterestP,
  faCircle, faHammer, faNewspaper, faComments, faEnvelope)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)

firebase.initializeApp(config);

export const db = firebase.firestore()
export const auth_ui = new firebaseui.auth.AuthUI(firebase.auth())

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .set(store.getters.user, { merge: true });
  }
});

import router from './router'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')