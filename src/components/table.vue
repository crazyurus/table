<template>
    <div style="height: 100%;">
        <div class="table-time">
            <div class="table-time-blank"></div>
            <div class="table-time-morning">上<br>午</div>
            <div class="table-time-afternoon">下<br>午</div>
            <div class="table-time-evening">晚<br>上</div>
        </div>
        <table class="table-course">
            <thead class="table-border">
            <tr>
                <th>一</th>
                <th>二</th>
                <th>三</th>
                <th>四</th>
                <th>五</th>
                <th>六</th>
                <th>日</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(line, index) in renderCourseList" :class="{'table-border': index == 1 || index == 3}">
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
    props: ['course', 'week'],
    computed: {
      renderCourseList() {
        // 节次编号
        const jc_arr = {
          '1-2': 0,
          '3-4': 1,
          '5-6': 2,
          '7-8': 3,
          '9-10': 4,
          '9-11': 4
        };
        let courseList = [];

        // 分析是否在当前周
        this.course.map((item) => {
          // 对节次进行分析
          let jc = item.ZC.split('-');
          let jc_flag = false;
          jc[0] = parseInt(jc[0]);
          jc.push(jc[1]);
          if (jc[2].charAt(0) === '0') jc[2] = jc[2].substring(1);
          jc[1] = parseInt(jc[1]);
          if (jc[0] <= this.week && jc[1] >= this.week) {
            jc_flag = true;
            // 单双周判断
            if (item.ZC.indexOf('单') > -1 && this.week % 2 === 0) jc_flag = false;
            else if (item.ZC.indexOf('双') > -1 && this.week % 2 === 1) jc_flag = false;
          }

          // 生成周数字符串
          let jc_str = '';
          if (jc[0] === jc[1]) jc_str = '第' + jc[0] + '周';
          else jc_str = '第' + jc[0] + '-' + jc[2];

          courseList.push({
            name: item.KCMC,
            teacher: item.JSXM,
            time: jc_str,
            classroom: item.JSBH,
            valid: jc_flag,
            jc: item.JC
          });
        });

        // 按照valid排序
        courseList.sort((a, b) => {
          if (a.valid === b.valid) return 0;
          return a.valid ? -1 : 1;
        });

        // 初始化课程表
        let course = [];
        for (let i = 0; i < 5; ++i) {
          course.push([]);
          for (let j = 0; j < 7; ++j) {
            course[i].push([]);
          }
        }

        // 生成周结构数组
        courseList.map((item) => {
          // 获取周次和节次
          let week = item.jc.charAt(0);
          let section = item.jc.substring(1);

          // 放入课程列表中
          delete item.jc;
          if (!item.valid) item.time += '（非本周）';
          course[jc_arr[section]][week - 1].push(item);
        });
        return course;
      }
    }
  }
</script>

<style scoped>
    .table-course {
        height: 100%;
        width: calc(140% - 3rem);
        table-layout: fixed;
        overflow-x: scroll;
        border-collapse: collapse;
        margin-left: 2rem;
    }
    .table-course tbody {
        height: calc(100% - 37px);
    }
    .table-time {
        position: fixed;
        top: 0;
        left: 0;
        width: 2rem;
        height: 100%;
        background: #fff;
    }
    .table-time-morning, .table-time-afternoon {
        height: 40%;
    }
    .table-time-evening {
        height: 20%;
    }
    .table-time > div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .table-course th, .table-time {
        font-weight: 300;
        padding: 0;
    }
    .table-course th {
        line-height: 2.5;
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
        font-size: 0.8rem;
        padding: 0.3rem 0.3rem 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
    .table-item-invalid {
        color: #666;
    }
    .table-border {
        border-bottom: 2px solid rgb(230,230,230);
    }
</style>