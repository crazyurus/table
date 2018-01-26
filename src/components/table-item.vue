<template>
    <div v-if="course.length === 0" class="table-item table-item-null"></div>
    <div v-else class="table-item" :class="'table-item-' + color" @click="showCourseList">
        <div>{{course[0].name}}</div>
        <div v-if="course[0].classroom">{{course[0].classroom}}</div>
    </div>
</template>

<script>
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
        this.$layer.open({
          title: course.name,
          anim: 'scale',  // vue-layer-mobile并没有实现这个默认是up，通过修改css fixed
          content: '<p class="course-title">授课教师</p><p class="course-content">' + course.teacher.name + '</p><p class="course-divide">&nbsp;</p><p class="course-title">授课时间</p><p class="course-content">' + course.time + '</p><p class="course-divide">&nbsp;</p><p class="course-title">建议反馈</p><p class="course-content">Token团队</p><p class="course-divide">&nbsp;</p><p><a href="javascript:;" onclick="addToTable(this, \' + day + \', \' + no + \');">编辑自定义课程</a></p><p class="course-footer">' + course.classroom + '</p>'
        });
      }
    }
  }
</script>
