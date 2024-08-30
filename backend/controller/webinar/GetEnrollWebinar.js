const WebinarEnrollModel = require("../../model/UserEnrollWebinar");

const GetEnrollWebinarController = async(req, res)=>{
  try {
    const userid = req?.userId

    const enrollWebinar = await WebinarEnrollModel.find({userId: userid}).populate("webinarId")
    res.status(200).json({
      data : enrollWebinar,
      message: "Enrolled Webinar Data",
      success: true,
      error: false,
    });
    
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

module.exports = GetEnrollWebinarController