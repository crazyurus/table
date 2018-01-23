<template>
    <div>
    <f7-block-title>添加自定义课程</f7-block-title>
    <f7-list form>
        <f7-list-item>
            <f7-label>课程名称</f7-label>
            <f7-input type="text" placeholder="如：Token大学" required v-model.trim="course.KCMC" />
        </f7-list-item>
        <f7-list-item>
            <f7-label>任课教师</f7-label>
            <f7-input type="text" placeholder="选填" v-model.trim="course.JSXM" />
        </f7-list-item>
        <f7-list-item>
            <f7-label>上课地点</f7-label>
            <f7-input type="text" placeholder="如：新1-101" v-model.trim="course.JSBH" />
        </f7-list-item>
        <f7-list-item>
            <f7-label>开始周</f7-label>
            <f7-input type="tel" maxlength="2" placeholder="请输入数字" required v-model="course_add.start" />
        </f7-list-item>
        <f7-list-item>
            <f7-label>结束周</f7-label>
            <f7-input type="tel" maxlength="2" placeholder="请输入数字" required v-model="course_add.end" />
        </f7-list-item>
        <f7-list-item>
            <f7-label>是否区分单双周</f7-label>
            <f7-input type="select" required v-model="course_add.odd">
                <option value="0">不区分</option>
                <option value="单">仅单周</option>
                <option value="双">仅双周</option>
            </f7-input>
        </f7-list-item>
        <f7-list-item>
            <f7-label>上课周次</f7-label>
            <f7-input type="select" required v-model="course_add.week">
                <option value="">请选择</option>
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
            <f7-input type="select" required v-model="course_add.jc">
                <option value="">请选择</option>
                <option value="1-2">第一大节（8:00-9:40）</option>
                <option value="3-4">第二大节（10:10-11:50）</option>
                <option value="5-6">第三大节（2:00-3:40）</option>
                <option value="7-8">第四大节（4:00-5:40）</option>
                <option value="9-11">第五大节（6:30以后）</option>
            </f7-input>
        </f7-list-item>
        <div class="button-area">
            <f7-button type="submit" class="btn-primary button-big button-fill" @click="addCourse">添加</f7-button>
            <f7-button class="btn-default button-big button-fill close-popup">关闭</f7-button>
        </div>
    </f7-list>
    </div>
</template>

<script>
  export default {
    name: 'token-form',
    props: ['course'],
    data() {
      return {
        course_add: {}
      }
    },
    watch: {
      course() {
        // const jc = this.course.ZC.split('-');
        // this.course_add.start = parseInt(jc[0]);
        // this.course_add.end = parseInt(jc[1]);
        // this.course_add.odd = jc[1].indexOf('单') > -1 ? '单' : jc[1].indexOf('双') > -1 ? '双' : '0';
        // this.course_add.week = this.course.JC.charAt(0);
        // this.course_add.jc = this.course.JC.substring(1);
      }
    },
    methods: {
      addCourse() {
        const course = {
          KCMC: this.course.KCMC,
          JSXM: this.course.KCMC,
          JSBH: this.course.KCMC,
          ZC: this.course_add.start + '-' + this.course_add.end + this.course_add.odd + '周',
          JC: this.course_add.week + this.course_add.jc
        };
        this.$emit('add-course', course);
        this.$f7.closeModal('.popup-course');
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
        margin-bottom: 0.5rem;
    }
    .btn-default {
        color: #000000 !important;
        background-color: #F8F8F8 !important;
        border: 1px solid rgba(0, 0, 0, 0.2) !important;
        line-height: 40px !important;
        height: 42px !important;
    }
</style>