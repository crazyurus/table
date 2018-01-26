<template>
    <div>
        <p class="course-title">授课教师</p>
        <p class="course-content">{{course.teacher.name}}</p>
        <p class="course-divide">&nbsp;</p>
        <p class="course-title">授课时间</p>
        <p class="course-content">{{timeStr}}</p>
        <p class="course-divide">&nbsp;</p>
        <p class="course-title">建议反馈</p>
        <p class="course-content">Token团队</p>
        <p class="course-divide">&nbsp;</p>
        <p v-if="course.id > 0"><a href="javascript: f7.popup('.popup-course'); document.querySelector('.layui-m-layer').remove();">编辑自定义课程</a></p>
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
</style>