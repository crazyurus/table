<template>
    <div v-if="course.length === 0" class="table-item table-item-null" @click="addCourse"></div>
    <div v-else class="table-item" :class="'table-item-' + color" @click="showCourseList">
        <div>{{course[0].name}}</div>
        <div v-if="course[0].classroom">{{course[0].classroom}}</div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import Detail from './table-course'
  import Course from '../course.js'

  export default {
    name: 'token-table-item',
    props: ['course', 'week', 'no'],
    computed: {
      color() {
        if (this.course[0].valid) return this.course[0].color % 6;
        else return 'invalid';
      }
    },
    methods: {
      addCourse() {
        let course = new Course();
        course.period.week = this.week + 1;
        course.period.section = this.no + 1;

        this.$store.commit('current', course);
        this.$f7.popup('.popup-course');
      },
      showCourseList() {
        const self = this;

        if (this.course.length === 1) this.showCourseDetail(this.course[0]);
        else {
          let buttons = [{
            text: '该节次对应多门课程',
            label: true
          }];
          let courses = this.course.map(item => {
            return {
              text: item.name,
              onClick() {
                self.showCourseDetail(item)
              }
            }
          });
          const cancel = [{
            text: '关闭',
            color: 'red'
          }];
          const groups = [buttons.concat(courses), cancel];
          this.$f7.actions(groups);
        }
      },
      showCourseDetail(course) {
        const CourseConstructor = Vue.extend(Detail);
        const instance = new CourseConstructor({
          parent: this,
          propsData: {
            course
          }
        });

        this.$store.commit('current', course.origin);
        this.$layer.open({
          title: course.name,
          anim: 'scale',  // vue-layer-mobile并没有实现这个默认是up，通过修改css fixed
          content: instance.$mount().$el.innerHTML
        });
      }
    }
  }
</script>
