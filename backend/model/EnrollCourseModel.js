const mongoose = require("mongoose");

const EnrollCourseSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      ref: "course", // Reference to the Course model
      required: true,
    },
    userId: {
      ref: "user", //Reference to the User Model
      type: String,
      required: true,
    },
    paymentId: {
      type: String, // Razorpay payment ID
      required: true,
    },
    amount: {
      type: Number, // Payment amount
      required: true,
    },
    currency: {
      type: String, // Currency of the payment
      required: true,
    },
    status: {
      type: String, // Status of the payment (e.g., 'completed', 'pending')
      default: "completed",
    },
  },
  {
    timestamps: true,
  }
);

const EnrollCourseModel = mongoose.model("courseEnrol", EnrollCourseSchema);

module.exports = EnrollCourseModel;
