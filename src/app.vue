<template>
    <div id="app">
        <f7-views>
            <f7-view main>
                <f7-pages>
                    <f7-page>
                        <token-table :course="course" :week="week" :start="start" @change-week="calcWeek"></token-table>
                        <f7-fab @click="showPopup">
                            <f7-icon icon="icon-plus"></f7-icon>
                        </f7-fab>
                    </f7-page>
                </f7-pages>
            </f7-view>
        </f7-views>

        <!-- 添加自定义课程 -->
        <f7-popup class="popup-course">
            <f7-view>
                <f7-pages>
                    <f7-page>
                        <token-form @add-course="addCourse" :course="current"></token-form>
                    </f7-page>
                </f7-pages>
            </f7-view>
        </f7-popup>
    </div>
</template>

<script>
  import Table from './components/table'
  import Form from './components/form'
  import Course from './course.js'

  export default {
    components: {
      'token-table': Table,
      'token-form': Form
    },
    mounted() {
      this.$http.get('/table/index/api').then((response) => {
        const data = response.data.data;
        this.week = data.week;
        this.course = data.course;
        this.start = data.start;
      });
    },
    data() {
      return {
        course: [],
        week: 0,
        start: '',
        current: new Course()
      }
    },
    watch: {
      week() {
        if (this.week < 1) document.title = '放假中';
        else document.title = '第' + this.week + '周';
      }
    },
    methods: {
      showPopup() {
        if (!this.current.id) this.current = new Course();
        this.$f7.popup('.popup-course');
      },
      addCourse(course) {
        this.course.push(course);
      },
      calcWeek(week) {
        this.week = week;
      }
    }
  }
</script>