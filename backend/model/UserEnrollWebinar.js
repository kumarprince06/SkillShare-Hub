const mongoose = require('mongoose')

const webinarEnrollSchema = new mongoose.Schema(
  {
    webinarId: {
      ref: "Webinar",
      required: true,
      type: String,
    },
    userId:{
      required: true,
      type: String
    }
  },
  {
    timestamps: true 
  }
)

const WebinarEnrollModel = mongoose.model("webinarEnrol", webinarEnrollSchema)

module.exports = WebinarEnrollModel