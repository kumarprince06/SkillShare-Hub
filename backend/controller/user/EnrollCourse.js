const EnrollCourseModel = require("../../model/EnrollCourseModel");

const AddEnrollCourseController = async (req, res) => {
  try {
    const userId = req?.userId;
    if (!userId) {
      return res.status(401).json({
        message: "Please login first..!",
        success: false,
        error: true,
      });
    }

    const { courseId } = req?.body;

    const isCourseAvailable = await EnrollCourseModel.findOne({
      courseId,
      userId: userId,
    });
    // console.log(isCourseAvailable)
    if (isCourseAvailable) {
      return res.status(409).json({
        message: "Course already enrolled..!",
        success: false,
        error: true,
      });
    }

    const payload = {
      courseId: courseId,
      userId: userId,
    };

    const data = await new EnrollCourseModel(payload).save();
    return res.status(200).json({
      data: data,
      message: "Course enrolled successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = AddEnrollCourseController;
