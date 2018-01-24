export default class Course {
  constructor() {
    this.name = '';
    this.classroom = '';
    this.teacher = {
      name: '',
      sno: null
    };
    this.period = {
      start: 0,
      end: 0,
      odd: ''
    };
    this.time = {
      week: 1,
      section: 1
    }
  }
}