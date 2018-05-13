<template>
    <div>
        <p class="course-title">授课教师</p>
        <p class="course-content" v-if="course.id > 0 || $store.state.sno.length < 7">{{course.teacher.name ? course.teacher.name : '暂无'}}</p>
        <p class="course-content course-link" v-else onclick="token.loadUrl('https://web.wutnews.net/table/index/teacher?sno=' + this.getAttribute('sno').replace(/^0+/g, ''))" :sno="course.teacher.sno">{{course.teacher.name}}</p>
        <p class="course-divide">&nbsp;</p>
        <p class="course-title">授课时间</p>
        <p class="course-content">{{timeStr}}</p>
        <p class="course-divide">&nbsp;</p>
        <p class="course-title">建议反馈</p>
        <p class="course-content">Token团队</p>
        <p class="course-divide">&nbsp;</p>
        <p v-if="course.id > 0"><a href="javascript: window.editCourse()">编辑自定义课程</a></p>
        <p class="course-footer">{{course.classroom}}</p>
    </div>
</template>

<script>
  export default {
    name: 'token-table-course',
    props: ['course'],
    computed: {
      timeStr() {
        const valid = this.course.valid ? '' : '（非本周）';
        if (this.course.time.start === this.course.time.end) return '第' + this.course.time.start + '周' + valid;
        else return '第' + this.course.time.start + '-' + this.course.time.end + this.course.time.odd + '周' + valid;
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

  .course-link {
    cursor: pointer;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%2060%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cpath%20d%3D'm60%2061.5-38.25%2038.25-9.75-9.75%2029.25-28.5-29.25-28.5%209.75-9.75z'%20fill%3D'%23c7c7cc'%2F%3E%3C%2Fsvg%3E");
    background-size: 10px 20px;
    background-repeat: no-repeat;
    background-position: 100% center;
  }
</style>