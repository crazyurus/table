import Vue from 'vue'
import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'

import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
import AppStyles from './css/app.css'

import axios from 'axios'
import App from './app'

Vue.use(Framework7Vue)
Vue.prototype.$http = axios
require('../mock.js')

new Vue({
  el: '#app',
  template: '<app/>',
  framework7: {
    root: '#app'
  },
  components: {
    app: App
  }
});
