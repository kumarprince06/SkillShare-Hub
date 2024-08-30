const uploadProductPermission = require("../../helper/Permission");
const CourseModel = require("../../model/CourseModel");

const AddCourseController = async(req, res) =>{
  try {
    const userId = req?.userId;
    // console.log("User", userId)
    // Check admin permissions
    if (!(await uploadProductPermission(userId))) {
      throw new Error("Permission denied..!");
    }

    const {name, description, lecture, duration, instructorName, category, level, price, language} = req?.body
    if(!name){
      throw new Error("Course name is required..!!")
    }else if(!description){
      throw new Error("Course description is required..!!")
    }else if(!lecture){
      throw new Error("Course no of lecture is required..!!")
    }else if(!duration){
      throw new Error("Course duration is required..!!")
    }else if(!instructorName){
      throw new Error("Course instructor name is required..!!")
    }else if(!category){
      throw new Error("Course category is required..!!")
    }else if(!level){
      throw new Error("Course level is required..!!")
    }else if(!price){
      throw new Error("Course price is required..!!")
    }else if(!language){
      throw new Error("Course language is required..!!")
    }

    const courseData = new CourseModel(req.body)

    // Save the instructor to the database
    const data = await courseData.save();

    res.status(400).json({
      data: data,
      message: "Course added successfully.",
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

module.exports = AddCourseController