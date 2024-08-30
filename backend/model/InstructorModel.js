const mongoose = require('mongoose')

const instructorSchema = new mongoose.Schema({
  name : {
    type:String,
    required : true
  },
  email : {
    type : String,
    unique : true,
    required : true
  },
  contact : {
    type: String,
    required : true
  },
  designation : {
    type: String,
  },
  facebookUrl: {
    type : String,
  },
  profileImage : {
    type: String
  },
  instagramUrl :{
    type : String
  },
  twitterUrl :{
    type : String
  }
}, {
  timestamps : true
})

const instructorModel = mongoose.model('instructor', instructorSchema)

module.exports = instructorModel

