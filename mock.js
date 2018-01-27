import Mock from 'mockjs'

Mock.mock('/table/index/api', 'get', require('./mock/teacher.json'));

Mock.mock('/table/course/add', 'post', {
  errCode: 0,
  errMsg: 'OK',
  data: '1'
});

Mock.mock('/table/course/edit', 'post', {
  errCode: 0,
  errMsg: 'OK'
});

Mock.mock('/table/course/delete', 'post', {
  errCode: 0,
  errMsg: 'OK'
});