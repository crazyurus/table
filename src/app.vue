<template>
  <div id="app">
    <f7-views>
      <f7-view main>
        <f7-pages>
          <f7-page>
            <token-table :course="course" :week="4"></token-table>
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

  export default {
    components: {
      'token-table': Table,
      'token-form': Form
    },
    data() {
      return {
        course: require('../mock/student.json').data.course,
        current: {}
      }
    },
    methods: {
      showPopup() {
        this.$f7.popup('.popup-course')
      },
      addCourse(course) {
        this.course.push(course);
      }
    }
  }
</script>