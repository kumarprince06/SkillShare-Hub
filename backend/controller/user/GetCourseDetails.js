const CourseModel = require('../../model/CourseModel')
const GetCourseDetailController = async(req, res)=>{

  try {

    const courseData = await CourseModel.find();
    // console.log(courseData)
    res.status(200).json({
      data: courseData,
      message: "CCourse Details",
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

}

module.exports = GetCourseDetailController