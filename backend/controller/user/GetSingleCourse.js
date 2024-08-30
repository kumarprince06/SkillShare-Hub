const CourseModel = require("../../model/CourseModel");

const GetSingleCourseController = async (req, res) => {
  try {

    const {id} = req.params
    // console.log(id)

    const courseData = await CourseModel.findById({_id : id})
    // console.log("Course Data",courseData)
    res.status(200).json({
      data : courseData,
      message: "Single Course Details",
      success : true,
      error : false
    })
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success : false,
      error : true
    })
  }
};

module.exports = GetSingleCourseController;
