export default class Course {
  constructor() {
    this.id = 0;
    this.name = '';
    this.classroom = '';
    this.teacher = {
      name: '',
      sno: undefined
    };
    this.time = {
      start: undefined,
      end: undefined,
      odd: ''
    };
    this.period = {
      week: 0,
      section: 0
    }
  }
}