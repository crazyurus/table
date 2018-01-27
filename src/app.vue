<template>
  <div id="app">
    <f7-views>
      <f7-view main>
        <f7-pages>
          <f7-page>
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
  import Table from './components/table'
  import Form from './components/form'
  import Course from './course.js'

  export default {
    components: {
      'token-table': Table,
      'token-form': Form
    },
    mounted() {
      this.$http.get('/table/index/api').then(response => {
        const data = response.data.data;

        this.changeTitle(data.week);
        this.$store.commit('init', data);
      });
    },
    methods: {
      showPopup() {
        this.$store.commit('current', new Course());
        this.$f7.popup('.popup-course');
      },
      changeTitle(week) {
        if (week < 1) document.title = '放假中';
        else document.title = '第' + week + '周';
      }
    }
  }
</script>