import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import App from './App.vue';

Vue.config.productionTip = false;

// TODO: Import only used components from VueMaterial
Vue.use(VueMaterial);

new Vue({
  render: h => h(App),
}).$mount('#app');
