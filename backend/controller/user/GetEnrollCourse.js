const EnrollCourse = require("../../model/EnrollCourseModel");


const GetEnrollCourseController = async (req, res) => {
  try {
    const userId = req?.userId;
    const data = await EnrollCourse.find({userId:userId}).populate("courseId");
    // console.log("Data: ", data)
    res.status(200).json({
      data: data,
      message: "Course enrolled details",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(200).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = GetEnrollCourseController;
