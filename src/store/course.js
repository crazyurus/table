import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    course: [],
    week: 0,
    current: {},
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
    },
    edit(state, course) {

    },
    current(state, current) {
      state.current = current;
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})