<template>
  <div id="app">
    <f7-views>
      <f7-view main>
        <f7-pages>
          <f7-page name="table">
            <token-table :week="$store.state.week" :course="$store.state.course" :start="$store.state.start" @change-title="changeTitle"></token-table>
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
            <token-form :current="$store.state.current"></token-form>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-popup>
  </div>
</template>

<script>
  import Table from './components/table.vue'
  import Form from './components/form.vue'
  import Course from './course.js'

  export default {
    components: {
      'token-table': Table,
      'token-form': Form
    },
    mounted() {
      const storage = localStorage.getItem('course');
      if (storage && storage !== 'undefined') this.updateTable(JSON.parse(storage));
      this.$http.get('/table/student.json').then(response => {
        const data = response.data.data;
        localStorage.setItem('course', JSON.stringify(data));
        this.updateTable(data);
      });
    },
    methods: {
      updateTable(data) {
        this.changeTitle(data.week);
        this.$store.commit('init', data);
      },
      showPopup() {
        this.$store.commit('current', new Course());
        this.$f7.popup('.popup-course');
      },
      changeTitle(week) {
        if (week < 1) document.title = '放假中';
        else document.title = '第 ' + week + ' 周';
        if (window.token && token.changeTitle) token.changeTitle(document.title);
      }
    }
  }
</script>