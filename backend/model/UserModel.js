const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  passingYear: {
    type: Number,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    contact: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    profilepic:{
      type:String
    },
    designation: {
      type: String,
    },
    experience: {
      type: String,
    },
    webiste: {
      type: String,
    },
    facebookurl: {
      type: String,
    },
    instagramurl: {
      type: String,
    },
    linkedinurl: {
      type: String,
    },
    twitterurl: {
      type: String,
    },
    bio: {
      type: String,
    },
    skills: {
      type: [String],
    },
    degree: {
      type: String,
    },
    branch:{
      type: String,
    },
    college: {
      type: String,
    },
    passingYear: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
