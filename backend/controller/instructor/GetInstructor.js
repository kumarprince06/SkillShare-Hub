const instructorModel = require("../../model/InstructorModel");

const GetInstructorController = async (req, res) => {
  try {

    const data = await instructorModel.find()
    // console.log(data)
    res.status(200).json({
      message: "Instructor data",
      data: data,
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

module.exports = GetInstructorController;
