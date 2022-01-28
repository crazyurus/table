import Mock from 'mockjs'

Mock.mock('/table/student.json', 'get', require('./mock/student.json'))

Mock.mock('/table/course/add.json', 'get', require('./mock/course/add.json'))

Mock.mock('/table/course/edit.json', 'get', require('./mock/course/edit.json'))

Mock.mock('/table/course/delete.json', 'get', require('./mock/course/delete.json'))
