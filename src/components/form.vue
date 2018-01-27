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
            <f7-label>开始周</f7-label>
            <f7-input type="tel" maxlength="2" placeholder="请输入数字" required v-model="course.time.start" />
        </f7-list-item>
        <f7-list-item>
            <f7-label>结束周</f7-label>
            <f7-input type="tel" maxlength="2" placeholder="请输入数字" required v-model="course.time.end" />
        </f7-list-item>
        <f7-list-item>
            <f7-label>是否区分单双周</f7-label>
            <f7-input type="select" required v-model="course.time.odd">
                <option value="">不区分</option>
                <option value="单">仅单周</option>
                <option value="双">仅双周</option>
            </f7-input>
        </f7-list-item>
        <f7-list-item>
            <f7-label>上课周次</f7-label>
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
            <f7-label>上课节次</f7-label>
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
            <f7-button type="submit" class="btn-primary button-big button-fill" @click="addCourse">{{course.id ? '保存' : '添加'}}</f7-button>
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
    methods: {
      addCourse() {
        if (this.course.time.odd === undefined) this.course.time.odd = '';
        if (this.course.id) this.$store.commit('edit', this.course);
        else {
          this.course.id = 1;
          this.$store.commit('add', this.course);
        }
        this.closePopup();
      },
      deleteCourse() {
        this.$f7.confirm('确定要删除课程 <b>' + this.course.name + '</b> 吗？', () => {
          this.$store.commit('delete');
          this.closePopup();
        });
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
</style>