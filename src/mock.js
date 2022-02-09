import Mock from 'mockjs'
import dataStudent from '../mock/student.json'
import dataCourseAdd from '../mock/course/add.json'
import dataCourseEdit from '../mock/course/edit.json'
import dataCourseDelete from '../mock/course/delete.json'

Mock.mock('/table/student.json', 'get', dataStudent)
Mock.mock('/table/course/add.json', 'post', dataCourseAdd)
Mock.mock('/table/course/edit.json', 'put', dataCourseEdit)
Mock.mock('/table/course/delete.json', 'delete', dataCourseDelete)
