import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// eslint-disable-next-line import/extensions
import store from './store/index.js';
import App from './App.vue';

library.add(faPause, faPlay);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
