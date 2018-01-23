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
    props: ['course', 'week', 'no'],
    computed: {
      color() {
        if (this.course[0].valid) return this.week + 1;
        else return 'invalid';
      }
    },
    methods: {
      showCourseList() {
        const self = this;

        if (this.course.length == 1) this.showCourseDetail(this.course[0]);
        else {
          const buttons = [{
            text: '该节次对应多门课程',
            label: true
          }];
          this.course.map((item) => {
            buttons.push({
              text: item.name,
              onClick() {
                self.showCourseDetail(item)
              }
            })
          });
          const groups = [ buttons, [{
            text: '关闭',
            color: 'red'
          }
          ]];
          this.$f7.actions(groups);
        }
      },
      showCourseDetail(course) {
        layer.open({
          title: course.name,
          content: '<p class="course-title">授课教师</p><p class="course-content">' + course.teacher + '</p><p class="course-divide">&nbsp;</p><p class="course-title">授课时间</p><p class="course-content">' + course.time + '</p><p class="course-divide">&nbsp;</p><p class="course-title">建议反馈</p><p class="course-content">Token团队</p><p class="course-divide">&nbsp;</p><p class="course-footer">' + course.classroom + '</p>'
        });
      }
    }
  }
</script>
