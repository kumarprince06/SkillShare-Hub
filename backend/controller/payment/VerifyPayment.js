const EnrollCourseModel = require('../../model/EnrollCourseModel');

const VerifyPaymentController = async(req, res)=>{
  try {

    const {razorpay_payment_id} = req?.body
    const userId = req?.userId

    const paymentVerify = await EnrollCourseModel.find({userId, paymentId : razorpay_payment_id})

    if(!paymentVerify){
      throw new Error("No payment has been done..!")
    }

    res.status(200).json({
      data: paymentVerify,
      message: "Course Enroll successfully..!",
      success: true,
      error: false
    })

    
  } catch (error) {
    res.status(400).json({
      message: error.message || message,
      success : false,
      error: true
    })
  }
}
module.exports = VerifyPaymentController