const WebinarModel = require("../../model/webinarModel");

const GetUserOrganizedWebinarController = async(req, res)=>{
  try {
    const userId = req?.userId
    console.log("UserId: ",userId)
    const getWebinar = await WebinarModel.find({userId: userId}).sort({date:1})
    // console.log(getWebinar)
    res.status(200).json({
      message: "Webinar Details",
      data: getWebinar,
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

module.exports = GetUserOrganizedWebinarController