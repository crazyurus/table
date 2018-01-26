<template>
    <div v-if="course.length === 0" class="table-item table-item-null"></div>
    <div v-else class="table-item" :class="'table-item-' + color" @click="showCourseList">
        <div>{{course[0].name}}</div>
        <div v-if="course[0].classroom">{{course[0].classroom}}</div>
    </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'token-table-item',
    props: ['course', 'week'],
    computed: {
      color() {
        if (this.course[0].valid) return this.week + 1;
        else return 'invalid';
      }
    },
    methods: {
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
        let Layer = Vue.extend({
          template: '#courseTemplate',
          props: ['course']
        });

        let instance = new Layer({
          parent: this,
          propsData: {
            course
          }
        });
        instance.vm = instance.$mount();

        this.$layer.open({
          title: course.name,
          anim: 'scale',  // vue-layer-mobile并没有实现这个默认是up，通过修改css fixed
          content: instance.vm.$el.innerHTML
        });
      }
    }
  }
</script>

<style scoped>
    .course-title {
        font-size: 0.85rem;
        color: #bbb;
        margin: 0.5rem 0;
    }

    .course-content, .course-footer {
        font-size: 1.1rem;
        color: #000;
        margin: 0.5rem 0;
    }

    .course-footer {
        text-align: center;
        margin: 2rem 0.5rem -0.3rem;
    }

    .course-divide {
        margin: 0;
        line-height: 0.3rem !important;
    }
</style>
