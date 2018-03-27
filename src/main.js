import Vue from 'vue'

import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'

import 'vue-layer-mobile/need/layer.css'
import './css/app.css'
import './css/layer.css'
import App from './app'

import axios from 'axios'
import layer from 'vue-layer-mobile'
import store from './store/course'

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

Vue.use(Framework7Vue)
Vue.use(layer)
Vue.prototype.$http = axios
if (process.env.NODE_ENV !== 'production') require('../mock.js')

new Vue({
  el: '#app',
  framework7: {
    root: '#app',
    pushState: true,
    modalTitle: '课程表',
    modalButtonOk: '确定',
    modalButtonCancel: '取消'
  },
  store,
  render: h => h(App)
});

window.editCourse = function () {
  f7.popup('.popup-course');
  document.querySelector('.layui-m-layer').remove();
  document.querySelector('.view-main').style.filter = '';
  if (location.hash === '#detail') history.back();
}