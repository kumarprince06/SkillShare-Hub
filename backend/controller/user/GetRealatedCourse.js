const CourseModel = require("../../model/CourseModel");

const GetRelatedCourseController = async (req, res) => {
  try {

    const {category} = req.params
    // console.log(category)

    const relatedCourseData = await CourseModel.find({category : category})
    // console.log("Course Related Data",relatedCourseData)
    res.status(200).json({
      data : relatedCourseData,
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

module.exports = GetRelatedCourseController;
