<template>
  <div class="table">
    <div class="table-time">
      <div class="table-time-blank">
        <select v-model="current" title="切换周数">
          <option v-for="i in 24" :value="i">第{{i}}周{{i === week ? '(本周)' : ''}}</option>
        </select>
      </div>
      <div class="table-time-morning">上<br>午</div>
      <div class="table-time-afternoon">下<br>午</div>
      <div class="table-time-evening">晚<br>上</div>
    </div>
    <table class="table-course">
      <thead class="table-border">
      <tr>
        <th v-for="item in renderDayList" :class="{ current: item.current }">
          <p>周{{item.week}}</p>
          <p v-if="item.day">{{item.month}}-{{item.day}}</p>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(line, index) in renderCourseList" :class="{ 'table-border': index == 1 || index == 3 }">
        <td v-for="(item, week) in line">
          <token-table-item :course="item" :week="week" :no="index"></token-table-item>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Item from './table-item'

  export default {
    name: 'token-table',
    components: {
      'token-table-item': Item
    },
    props: {
      course: Array,
      week: Number,
      start: String
    },
    data() {
      return {
        current: this.week
      }
    },
    watch: {
      current() {
        this.$emit('change-title', this.current);
      },
      week() {
        this.current = this.week;
      }
    },
    computed: {
      renderDayList() {
        const week_arr = ['一', '二', '三', '四', '五', '六', '日'];
        const start = new Date(this.start + 'T00:00:00').getTime();
        const length = 7 * (this.current - 1);
        const current = new Date();

        return week_arr.map((item, index) => {
          let day = new Date(start + (length + index) * 24 * 3600 * 1000);
          return {
            week: item,
            month: day.getMonth() + 1,
            day: day.getDate(),
            current: day.toDateString() === current.toDateString()
          }
        });
      },
      renderCourseList() {
        // 分析是否在当前周
        let courseList = this.course.map(item => {
          let valid = false;
          if (item.time.start <= this.current && this.current <= item.time.end) {
            valid = true;
            if (item.time.odd === '单' && this.current % 2 === 0) valid = false;
            else if (item.time.odd === '双' && this.current % 2 === 1) valid = false;
          }

          return {
            ...item,
            valid: valid,
            origin: item
          }
        });

        // 按照valid排序
        courseList.sort((a, b) => {
          if (a.valid === b.valid) return 0;
          return a.valid ? -1 : 1;
        });

        // 初始化课程表（5*7）
        let course = [];
        for (let i = 0; i < 5; ++i) {
          course.push([]);
          for (let j = 0; j < 7; ++j) {
            course[i].push([]);
          }
        }

        // 放入课程列表中
        courseList.map(item => {
          course[item.period.section - 1][item.period.week - 1].push(item);
        });
        return course;
      }
    }
  }
</script>

<style scoped>
  .table {
    height: 100%;
  }
  .table-course {
    position: absolute;
    top: 0;
    left: 2rem;
    height: 100%;
    width: calc(140% - 3rem);
    table-layout: fixed;
    overflow-x: scroll;
    border-collapse: collapse;
    -webkit-overflow-scrolling: touch;
  }
  .table-course tbody {
    height: calc(100% - 37px);
  }
  .table-time-blank {
    height: 47px;
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M106.666667%20810.666667V298.666667h810.666666v512c0%2046.933333-38.4%2085.333333-85.333333%2085.333333H192c-46.933333%200-85.333333-38.4-85.333333-85.333333z%22%20fill%3D%22%23CFD8DC%22%20p-id%3D%228162%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M917.333333%20213.333333v128H106.666667v-128c0-46.933333%2038.4-85.333333%2085.333333-85.333333h640c46.933333%200%2085.333333%2038.4%2085.333333%2085.333333z%22%20fill%3D%22%23F44336%22%20p-id%3D%228163%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M704%20213.333333m-64%200a64%2064%200%201%200%20128%200%2064%2064%200%201%200-128%200Z%22%20fill%3D%22%23B71C1C%22%20p-id%3D%228164%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M320%20213.333333m-64%200a64%2064%200%201%200%20128%200%2064%2064%200%201%200-128%200Z%22%20fill%3D%22%23B71C1C%22%20p-id%3D%228165%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M704%2064c-23.466667%200-42.666667%2019.2-42.666667%2042.666667v106.666666c0%2023.466667%2019.2%2042.666667%2042.666667%2042.666667s42.666667-19.2%2042.666667-42.666667V106.666667c0-23.466667-19.2-42.666667-42.666667-42.666667zM320%2064c-23.466667%200-42.666667%2019.2-42.666667%2042.666667v106.666666c0%2023.466667%2019.2%2042.666667%2042.666667%2042.666667s42.666667-19.2%2042.666667-42.666667V106.666667c0-23.466667-19.2-42.666667-42.666667-42.666667z%22%20fill%3D%22%23B0BEC5%22%20p-id%3D%228166%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M277.333333%20426.666667h85.333334v85.333333h-85.333334zM405.333333%20426.666667h85.333334v85.333333h-85.333334zM533.333333%20426.666667h85.333334v85.333333h-85.333334zM661.333333%20426.666667h85.333334v85.333333h-85.333334zM277.333333%20554.666667h85.333334v85.333333h-85.333334zM405.333333%20554.666667h85.333334v85.333333h-85.333334zM533.333333%20554.666667h85.333334v85.333333h-85.333334zM661.333333%20554.666667h85.333334v85.333333h-85.333334zM277.333333%20682.666667h85.333334v85.333333h-85.333334zM405.333333%20682.666667h85.333334v85.333333h-85.333334zM533.333333%20682.666667h85.333334v85.333333h-85.333334zM661.333333%20682.666667h85.333334v85.333333h-85.333334z%22%20fill%3D%22%2390A4AE%22%20p-id%3D%228167%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E") no-repeat center;
    background-size: 20px 20px;
    position: relative;
  }

  .table-time-blank select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  .table-time {
    position: fixed;
    top: 0;
    left: 0;
    width: 2rem;
    height: 100%;
    background: #fff;
    z-index: 99;
  }
  .ios .table-time {
    position: absolute;
  }
  .table-time-morning, .table-time-afternoon {
    height: calc(40% - 18.8px);
  }
  .table-time-evening {
    height: calc(20% - 9.4px);
  }
  .table-time > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .table-course th, .table-time {
    font-weight: 300;
    padding: 0;
    font-size: 10px;
  }
  .table-course th {
    padding: 0.2rem 0;
    height: calc(46px - 0.4rem);
  }
  .table-course th.current {
    background: #45c8dc;
    color: #fff;
    font-weight: normal;
  }
  .table-course th > p {
    margin: 0;
    line-height: 1.6;
  }
  .table-course tbody tr {
    height: 20%;
  }
  .table-course td {
    padding: 0;
    width: 10%;
  }
  .table-item {
    margin: 0.12rem 0.08rem;
    height: calc(100% - 0.24rem);
    color: #fff;
    border-radius: 0.25rem;
    font-size: 10px;
    padding: 0.3rem 0.3rem 0.1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
  }
  @media screen and (max-width: 320px) {
    .table-item, .table-course th, .table-time {
      font-size: 10px;
    }
  }
  @media screen and (min-width: 321px) and (max-width: 375px) {
    .table-item, .table-course th, .table-time {
      font-size: 11px;
    }
  }
  @media screen and (min-width: 376px) and (max-width: 413px) {
    .table-item, .table-course th, .table-time {
      font-size: 12px;
    }
  }
  @media screen and (min-width: 414px) {
    .table-item, .table-course th, .table-time {
      font-size: 13px;
    }
  }
  .table-item-1 {
    background-color: rgb(69,200,220);
  }
  .table-item-2 {
    background-color: rgb(167,213,154);
  }
  .table-item-3 {
    background-color: rgb(252,171,83);
  }
  .table-item-4 {
    background-color: rgb(140,136,255);
  }
  .table-item-5 {
    background-color: rgb(80,210,194);
  }
  .table-item-6 {
    background-color: rgb(255,51,102);
  }
  .table-item-7 {
    background-color: rgb(0,185,255);
  }
  .table-item-null, .table-item-invalid {
    background-color: rgb(242,244,244);
  }
  .table-item-add {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D'%23CCCCCC'%20height%3D'24'%20viewBox%3D'0%200%2024%2024'%20width%3D'24'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cpath%20d%3D'M19%2013h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'%2F%3E%3Cpath%20d%3D'M0%200h24v24H0z'%20fill%3D'none'%2F%3E%3C%2Fsvg%3E");
    background-size: 36px 36px;
    background-repeat: no-repeat;
    background-position: center;
  }
  .table-item-multi::before {
    position: absolute;
    content: '';
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border: 0.3rem solid transparent;
    border-right-color: rgb(242, 244, 244);
    border-bottom-color: rgb(242, 244, 244);
    background-color: rgba(242,244,244,0.6);
    border-bottom-right-radius: 0.25rem;
    border-top-left-radius: 0.15rem;
  }
  .table-item-invalid {
    color: #666;
  }
  .table-border {
    border-bottom: 1px solid rgb(230,230,230);
  }
</style>