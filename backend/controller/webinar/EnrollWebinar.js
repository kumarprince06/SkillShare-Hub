const WebinarEnrollModel = require("../../model/UserEnrollWebinar");

const EnrollWebinarController = async (req, res) => {
  try {
    const userId = req?.userId;
    const { webinarId } = req?.body;
    // console.log(`User Id: ${userId} webinar Id: ${webinarId}`);
    // console.log(webinarId)

    if(!userId){
      throw new Error("Please login first..!");
    }

    const payload = {
      webinarId: webinarId,
      userId: userId
    }

    const enrollWebinar = await new WebinarEnrollModel(payload).save()

    res.status(200).json({
      data : enrollWebinar,
      message: "Enrolled Successfully..!",
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
};

module.exports = EnrollWebinarController;
