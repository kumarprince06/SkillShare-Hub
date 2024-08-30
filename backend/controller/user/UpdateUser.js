const UserModel = require("../../model/UserModel");

const UdpateUserController = async (req, res) => {
  try {
    const userId = req?.userId
    // console.log("userId:",userId)
    const {_id, ...updateData} = req?.body
    // console.log("id:", _id)
    console.log("Body Data: ", req?.body)
    const updateUser = await UserModel.findByIdAndUpdate(_id, updateData, {new: true})
    console.log("Update User Data: ". updateUser)
    res.status(201).json({
      data: updateUser,
      message: "Profile Updated..!",
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

module.exports = UdpateUserController;
