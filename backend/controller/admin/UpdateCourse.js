const AdminPermission = require("../../helper/Permission");
const CourseModel = require("../../model/CourseModel");

const UpdateCourseController = async (req, res) => {
  try {
    const userId = req?.userId;

    const { _id, ...resBody } = req.body;
    // console.log("Updated Course Data",resBody)
    // Check admin permissions
    if (!(await AdminPermission(userId))) {
      throw new Error("Permission denied..!");
    }
    // const { _id, ...resBody } = req.body;
    console.log("product id", _id)
    const updateProduct = await CourseModel.findByIdAndUpdate(_id, resBody, {
      new: true,
    });

    res.status(200).json({
      data: updateProduct,
      message: "Course Updated Succesfully..!",
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

module.exports = UpdateCourseController;
