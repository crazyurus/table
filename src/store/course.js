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
      const current = state.current;
      for (let key in course) {
        if (typeof course[key] === 'object') Object.assign(current[key], course[key]);
        else current[key] = course[key];
      }
    },
    delete(state) {
      const index = state.course.findIndex(item => {
        return item === state.current;
      });
      state.course.splice(index, 1);
    },
    current(state, current) {
      state.current = current;
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})