const UserModel = require("../../model/UserModel");
const bcrypt = require("bcrypt");

const UserRegistrationController = async (req, res) => {
  try {
    const { email, password, name, contact } = req?.body;
    // console.log(req?.body);

    // Check if the user already exists
    const user = await UserModel.findOne({ email });
    // console.log("User: ", user);
    if (user) {
      throw new Error("Email already exists..!");
    }

    // Check required fields for regular signup
    if (!name) {
      throw new Error("Name required..!");
    }
    if (!email) {
      throw new Error("Email required..!");
    }

    // For Google signup, contact and password might not be provided
    let hashPassword = null;
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      hashPassword = await bcrypt.hashSync(password, salt);
      if (!hashPassword) {
        throw new Error("Something went wrong");
      }
    } else {
      // Generate a random password for Google signup
      const randomPassword = Math.random().toString(36).slice(-8);
      const salt = bcrypt.genSaltSync(10);
      hashPassword = await bcrypt.hashSync(randomPassword, salt);
    }

    const payload = {
      ...req.body,
      role: "USER",
      password: hashPassword,
      contact: contact || "", // Set contact to an empty string if not provided
    };

    const userData = new UserModel(payload);
    await userData.save();

    res.status(201).json({
      message: "Registration Successful",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = UserRegistrationController;
