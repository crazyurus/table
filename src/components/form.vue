<template>
    <div>
    <f7-block-title>{{course.id ? '编辑' : '添加'}}自定义课程</f7-block-title>
    <f7-list form>
        <f7-list-item>
            <f7-label>课程名称</f7-label>
            <f7-input type="text" placeholder="如：Token大学" required v-model.trim="course.name" />
        </f7-list-item>
        <f7-list-item>
            <f7-label>任课教师</f7-label>
            <f7-input type="text" placeholder="选填" v-model.trim="course.teacher.name" />
        </f7-list-item>
        <f7-list-item>
            <f7-label>上课地点</f7-label>
            <f7-input type="text" placeholder="如：新1-101" v-model.trim="course.classroom" />
        </f7-list-item>
        <f7-list-item>
            <f7-label>周数</f7-label>
          <f7-input type="select" required v-model="course.time.start">
            <option value="" disabled>起始周</option>
            <option v-for="i in 25" :value="i" :key="i">第{{i}}周</option>
          </f7-input>
          <f7-input type="select" required v-model="course.time.end">
            <option value="" disabled>结束周</option>
            <option v-for="i in calcWeek" :value="i" :key="i">第{{i}}周</option>
          </f7-input>
        </f7-list-item>
        <f7-list-item>
            <f7-label>单双周</f7-label>
            <f7-buttons>
                <f7-button :active="course.time.odd === ''" @click="changeOdd('')">不区分</f7-button>
                <f7-button :active="course.time.odd === '单'" @click="changeOdd('单')">单周</f7-button>
                <f7-button :active="course.time.odd === '双'" @click="changeOdd('双')">双周</f7-button>
            </f7-buttons>
        </f7-list-item>
        <f7-list-item>
            <f7-label>星期</f7-label>
            <f7-input type="select" required v-model="course.period.week">
                <option value="0">请选择</option>
                <option value="1">星期一</option>
                <option value="2">星期二</option>
                <option value="3">星期三</option>
                <option value="4">星期四</option>
                <option value="5">星期五</option>
                <option value="6">星期六</option>
                <option value="7">星期日</option>
            </f7-input>
        </f7-list-item>
        <f7-list-item>
            <f7-label>节次</f7-label>
            <f7-input type="select" required v-model="course.period.section">
                <option value="0">请选择</option>
                <option value="1">第一大节（8:00-9:40）</option>
                <option value="2">第二大节（10:10-11:50）</option>
                <option value="3">第三大节（2:00-3:40）</option>
                <option value="4">第四大节（4:00-5:40）</option>
                <option value="5">第五大节（6:30以后）</option>
            </f7-input>
        </f7-list-item>
        <div class="button-area">
            <f7-button type="submit" class="btn-primary button-big button-fill" @click="addCourse" :disabled="!course.name || !course.classroom || !course.time.start || !course.time.end || !course.period.week || !course.period.section">{{course.id ? '保存' : '添加'}}</f7-button>
            <f7-button v-if="course.id" class="btn-danger button-big button-fill" @click="deleteCourse">删除</f7-button>
            <f7-button class="btn-default button-big button-fill close-popup">关闭</f7-button>
        </div>
    </f7-list>
    </div>
</template>

<script>
  import Course from '../course.js'

  export default {
    name: 'token-form',
    props: ['current'],
    data() {
      return {
        course: new Course()
      }
    },
    watch: {
      current() {
        this.course = this.clone(this.current);
      }
    },
    computed: {
      calcWeek() {
        if (!this.course.time.start) return 25;
        let arr = [];
        for (let i = this.course.time.start; i <= 25; ++i) {
          arr.push(i);
        }
        return arr;
      }
    },
    methods: {
      addCourse() {
        if (this.course.time.start > this.course.time.end) return;
        if (this.course.id) {
          this.$http.get('/table/course/edit.json', {
            course: this.course
          }).catch(() => {
            this.$f7.alert('网络请求错误');
          });
          this.$store.commit('edit', this.course);
        }
        else {
          this.$http.get('/table/course/add.json', {
            course: this.course,
            term: this.$store.state.term
          }).then(result => {
            this.course.id = result.data.data.id;
            this.$store.commit('add', this.course);
          }).catch(() => {
            this.$f7.alert('网络请求错误');
          });
        }
        this.closePopup();
      },
      deleteCourse() {
        this.$f7.confirm('确定要删除课程 <b>' + this.course.name + '</b> 吗？', () => {
          this.$http.get('/table/course/delete.json', {
            id: this.course.id
          }).catch(() => {
            this.$f7.alert('网络请求错误');
          });
          this.$store.commit('delete');
          this.closePopup();
        });
      },
      changeOdd(odd) {
        this.course.time.odd = odd;
      },
      closePopup() {
        this.$f7.closeModal('.popup-course');
      },
      clone(obj) {
        return JSON.parse(JSON.stringify(obj));
      }
    }
  }
</script>

<style scoped>
  .button-area {
    margin-top: 2rem;
    padding: 0 1rem;
  }
  .btn-primary {
    color: #fff;
    background: #45c8dc !important;
    width: 100%;
  }
  .btn-danger {
    color: #fff;
    background: #ff3b30 !important;
    width: 100%;
  }
  .btn-danger, .btn-primary {
    margin-bottom: 0.5rem;
  }
  .btn-default {
    color: #000000 !important;
    background-color: #F8F8F8 !important;
    border: 1px solid rgba(0, 0, 0, 0.2) !important;
    line-height: 40px !important;
    height: 42px !important;
  }
  .ios .btn-default {
    border: 0.5px solid rgba(0, 0, 0, 0.2) !important;
  }
  .buttons-row {
    width: 200px;
  }
  .buttons-row > .button.active {
    background: #45c8dc;
    color: #fff;
  }

  .buttons-row > .button {
    border-color: #45c8dc;
    color: #45c8dc;
  }
</style>