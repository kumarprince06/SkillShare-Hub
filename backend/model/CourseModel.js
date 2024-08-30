const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  },
  description: {
    type:String,
    required: true
  },
  lecture: {
    type:String,
    required: true
  },
  level: {
    type:String,
    required: true
  },
  duration: {
    type:String,
    required: true
  },
  language: {
    type:String,
    required: true
  },
  image: {
    type:String,
    required: true
  },
  price: {
    type:String,
    required: true
  },
  instructorName: {
    type:String,
    required: true
  },
  category: {
    type:String,
    required: true
  }
},{
  timestamps : true
})

const CourseModel = mongoose.model('course', CourseSchema)

module.exports = CourseModel