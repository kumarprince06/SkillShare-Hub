const BACKEND_DOMAIN = import.meta.env.VITE_APP_BACKEND_DOMAIN
// console.log(DOMAIN)
const SummaryAPI= {
  register : {
    url : `${BACKEND_DOMAIN}/api/register`,
    method: "post"
  },
  login : {
    url: `${BACKEND_DOMAIN}/api/login`,
    method : "post"
  },
  userDetail : {
    url: `${BACKEND_DOMAIN}/api/user-details`,
    method : "get"
  },
  logout:{
    url:`${BACKEND_DOMAIN}/api/logout`,
    method: "get"
  },
  deleteCloudImage : {
    url: `${BACKEND_DOMAIN}/api/delete-Cloud-image`,
    method : "post"
  },
  addInstructor : {
    url : `${BACKEND_DOMAIN}/api/add-instructor`,
    method : "post"
  },
  getInstructor:{
    url:`${BACKEND_DOMAIN}/api/get-instructor`,
    method: "get"
  },
  addWebinar:{
    url: `${BACKEND_DOMAIN}/api/add-webinar`,
    method: "post"
  },
  getWebinar:{
    url: `${BACKEND_DOMAIN}/api/get-webinar`,
    method: "get"
  },
  addCourse : {
    url: `${BACKEND_DOMAIN}/api/add-course`,
    method: "post"
  },
  getCourse : {
    url: `${BACKEND_DOMAIN}/api/get-course`,
    method: "get"
  },
  getSingleCourse : {
    url: `${BACKEND_DOMAIN}/api/get-single-course`,
    method: "get"
  },
  getRealatedCourse:{
    url:`${BACKEND_DOMAIN}/api/get-related-course`,
    method: "get"
  },
  updateCourse:{
    url: `${BACKEND_DOMAIN}/api/update-course`,
    method: "put"
  },
  enrollWebinar:{
    url: `${BACKEND_DOMAIN}/api/enroll-webinar`,
    method: "post"
  },
  getEnrollWebinar:{
    url: `${BACKEND_DOMAIN}/api/get-enroll-webinar`,
    method: "get"
  },
  addEnrollCourse:{
    url: `${BACKEND_DOMAIN}/api/enroll-course`,
    method: "post"
  },
  getEnrollCourse:{
    url: `${BACKEND_DOMAIN}/api/get-enroll-course`,
    method: "get"
  },
  updateUser:{
    url: `${BACKEND_DOMAIN}/api/update-profile`,
    method: "put"
  },
  geOrganizedWebinar:{
    url: `${BACKEND_DOMAIN}/api/get-organized-webinar`,
    method: "get"
  },
  createOrder:{
    url: `${BACKEND_DOMAIN}/api/create-order`,
    method: "post"
  },
  verifyPayment:{
    url: `${BACKEND_DOMAIN}/api/verify-payment`,
    method: "post"
  }

}

export default SummaryAPI