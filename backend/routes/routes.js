
const express = require('express')
const authToken = require('../middleware/AuthToken')
const UserRegistrationController = require('../controller/user/UserRegistration')
const UserLoginController = require('../controller/user/UserLogin')
const GetUserDetailController = require('../controller/user/GetUserDetail')
const UserLogout = require('../controller/user/UserLogout')
const DeleteCloudinaryImage = require('../controller/CloudinaryImageDelete/DeleteCloudinaryImage')
const AddInstructorController = require('../controller/admin/AddInstrutor')
const GetInstructorController = require('../controller/instructor/GetInstructor')
const AddWebinarController = require('../controller/admin/AddWebinar')
const GetWebinarController = require('../controller/webinar/GetWebinar')
const AddCourseController = require('../controller/admin/AddCourse')
const GetCourseDetailController = require("../controller/user/GetCourseDetails")
const GetSingleCourseController = require('../controller/user/GetSingleCourse')
const GetRelatedCourseController = require('../controller/user/GetRealatedCourse')
const UpdateCourseController = require('../controller/admin/UpdateCourse')
const EnrollWebinarController = require('../controller/webinar/EnrollWebinar')
const GetEnrollWebinarController = require('../controller/webinar/GetEnrollWebinar')
const AddEnrollCourseController = require('../controller/user/EnrollCourse')
const GetEnrollCourseController = require('../controller/user/GetEnrollCourse')
const UpdateUserController = require('../controller/user/UpdateUser')
const GetUserOrganizedWebinarController = require('../controller/webinar/GetUserWebinar')
const CreateOrderControllr = require('../controller/payment/CreateOrder')
const PaymentController = require('../controller/payment/PaymentController')
const VerifyPaymentController = require('../controller/payment/VerifyPayment')

const router = express.Router()

router.post("/register", UserRegistrationController)
router.post("/login",UserLoginController)
router.get("/user-details", authToken, GetUserDetailController)
router.get("/logout",UserLogout)

//Cloudinary Image Delete
router.post("/delete-Cloud-image", DeleteCloudinaryImage)

//Admin 
router.post("/add-instructor",authToken, AddInstructorController)
router.post("/add-webinar", authToken, AddWebinarController)
router.post("/add-course", authToken, AddCourseController)
router.put("/update-course",authToken,UpdateCourseController)

//User
router.put("/update-profile",authToken,UpdateUserController)

//Instructcor
router.get("/get-instructor",GetInstructorController)

//Webinar
router.get("/get-webinar", GetWebinarController)
router.post("/enroll-webinar",authToken,EnrollWebinarController)
router.get("/get-enroll-webinar", authToken, GetEnrollWebinarController)
router.get("/get-organized-webinar/:userId",authToken, GetUserOrganizedWebinarController)

//Course
router.get("/get-course", GetCourseDetailController)
router.get("/get-single-course/:id", GetSingleCourseController)
router.get("/get-related-course/:category", GetRelatedCourseController)
router.post("/enroll-course", authToken,AddEnrollCourseController)
router.get("/get-enroll-course",authToken,GetEnrollCourseController)

//payment
router.post("/create-order", authToken,CreateOrderControllr)
router.post("/webhook",PaymentController)
router.post("/verify-payment", authToken, VerifyPaymentController)


module.exports = router

