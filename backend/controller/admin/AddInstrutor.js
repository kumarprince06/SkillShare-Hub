const AdminPermission = require("../../helper/Permission");
const instructorModel = require("../../model/InstructorModel");

const AddInstructorController = async (req, res) => {
  try {
    const userId = req?.userId;
    const { email, name, designation, contact, facebookUrl, profileImage, instagramUrl, twitterUrl } = req?.body;

    // Check admin permissions
    if (!(await AdminPermission(userId))) {
      throw new Error("Permission denied..!");
    }

    // Validate required fields
    if (!name) {
      throw new Error("Name is required..!");
    }
    if (!email) {
      throw new Error("Email is required..!");
    }

    // Check if instructor already exists
    const instructor = await instructorModel.findOne({ email });
    if (instructor) {
      throw new Error("Instructor with this email exists..!!");
    }

    // Create new instructor
    const newInstructor = new instructorModel({
      name,
      email,
      designation,
      contact,
      facebookUrl,
      profileImage,
      instagramUrl,
      twitterUrl,
    });

    // Save the instructor to the database
    const data = await newInstructor.save();

    res.status(200).json({
      message: "Instructor added successfully",
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

module.exports = AddInstructorController;
