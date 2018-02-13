import Vue from 'vue'

import Framework7 from 'framework7/dist/framework7.esm.bundle.js'
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js'
import Framework7Styles from 'framework7/dist/css/framework7.css'

import 'vue-layer-mobile/need/layer.css'
import './css/app.css'
import './css/layer.css'
import App from './app'

import axios from 'axios'
import layer from 'vue-layer-mobile'
import store from './store/course'

Vue.use(Framework7Vue, Framework7)
Vue.use(layer)
Vue.prototype.$http = axios
if (process.env.NODE_ENV !== 'production') require('../mock.js')

new Vue({
  el: '#app',
  framework7: {
    root: '#app',
    pushState: true,
    name: '课程表',
    theme: 'ios',
    modalTitle: '课程表',
    modalButtonOk: '确定',
    modalButtonCancel: '取消'
  },
  store,
  render: h => h(App)
})
