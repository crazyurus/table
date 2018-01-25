import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    course: [],
    week: 0,
    start: ''
  },
  mutations: {
    init(state, response) {
      state.course = response.course;
      state.week = response.week;
      state.start = response.start;
    },
    add(state, course) {
      state.course.push(course);
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})