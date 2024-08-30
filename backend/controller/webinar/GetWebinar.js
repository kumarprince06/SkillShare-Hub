const WebinarModel = require("../../model/webinarModel");

const GetWebinarController = async(req, res) =>{
  try {
    const getWebinar = await WebinarModel.find({date : {$gt : new Date}}).sort({ date: 1 })
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

module.exports = GetWebinarController