const razorpay = require('../../config/RazorPayConfig')
const EnrollCourseModel = require('../../model/EnrollCourseModel')
const CreateOrderControllr = async(req, res)=>{
  try {
    const userId = req?.userId
    const data = req?.body
    console.log("Data: ", data)
    const verifyCourse = await EnrollCourseModel.findOne({userId, courseId : data?.courseId})
    if(verifyCourse){
      throw new Error("Course Already Enrolled..!")
    }
    const options = {
      amount: Number(data?.price * 100),
      currency : "INR",
      payment_capture: 1,
      receipt : "ORD_NO"+(Date.now())
    }

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      data:order,
      success: true,
      error:false
    });

  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true
    })
  }
}

module.exports = CreateOrderControllr