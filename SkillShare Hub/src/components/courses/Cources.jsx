import React, { useEffect, useState } from "react";
import caurseImg1 from "../../assets/images/course-1.jpg";
import caurseImg2 from "../../assets/images/course-2.jpg";
import caurseImg3 from "../../assets/images/course-3.jpg";
import displayINRCurrency from "../../helper/DisplayINRCurrency";
import ContentHeading from "../layouts/ContentHeading";
import { Link, useNavigate } from "react-router-dom";
import SummaryAPI from "../../common/API";
import { toast } from "react-toastify";
import useRazorpay from "react-razorpay";
import logo from "../../assets/Favicon/favicon-32x32.png";
import { useSelector } from "react-redux";
const Cources = () => {
  const [data, setData] = useState([]);
  const [Razorpay] = useRazorpay();
  const navigate = useNavigate();

  const handleCheckOutPayment = async (course) => {

    const user = useSelector((state) => state.user.user)
    
    const data = {
      courseId: course._id, // Include course ID
      name: course.name, // Include course name
      price: course.price,
    };
    // alert("Hiitng")
    const fetchCreateOrder = await fetch(SummaryAPI.createOrder.url, {
      method: SummaryAPI.createOrder.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const orderDetails = await fetchCreateOrder.json();
    // console.log("Order Create:", orderDetails)
    if (orderDetails.error) {
      if (orderDetails.status === 401) {
        // If the user is not logged in
        navigate("/login");
        toast.error("You need to log in to proceed with enrollment.");
      } else if (orderDetails.status === 409) {
        // Course already enrolled
        toast.error(orderDetails.message || "Course Already Enrolled!");
      } else {
        // Handle other potential errors
        // navigate("/login");
        toast.error(orderDetails.message || "An error occurred.");
      }
      return;
    }

    

    const options = {
      key: import.meta.env.VITE_APP_RAZORPAY_API_KEY,
      amount: orderDetails.data.amount,
      currency: orderDetails.data.currency,
      name: "SkillShare Hub",
      description: "Enroll in course",
      image: logo,
      order_id: orderDetails.data.id,
      handler: async function (response) {
        const paymentData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        const responseVerify = await fetch(SummaryAPI.verifyPayment.url,{
          method: SummaryAPI.verifyPayment.method,
          credentials: "include",
          headers:{
            "content-type" : "application/json",
          },
          body: JSON.stringify(paymentData)
        })

        const verifyPayment = await responseVerify.json()

        if (verifyPayment.success) {
          navigate("/my-account/course")
          toast.success(verifyPayment.message)
        }else{
          toast.error(verifyPayment.message)
        }
        
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.contact, // Optional: Prefill the user's contact details
      },
      notes: {
        courseId : data?.courseId,
        userId: user?._id
      },
      theme: {
        color: "#06bbcc", // Customize the color of the Razorpay checkout
      },
    };
    // Open the Razorpay payment window
    const razorpay = new Razorpay(options);
    razorpay.open();

    // Handle any errors during the checkout
    razorpay.on("payment.failed", function (response) {
      // console.error(response.error);
      toast.error("Payment failed! Please try again.");
    });
  };

  const fetchCourse = async () => {
    const response = await fetch(SummaryAPI.getCourse.url, {
      method: SummaryAPI.getCourse.method,
    });

    const result = await response.json();
    if (result.success) {
      // Shuffle the data and select the first three items
      const shuffledData = result.data.sort(() => 0.5 - Math.random());
      setData(shuffledData.slice(0, 3));
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    // <!-- Courses Start -->
    <div className="container-xxl py-5">
      <div className="container">
        <ContentHeading title={"Courses"} heading={"Popular Courses"} />

        <div className="row g-4 justify-content-center">
          {data.slice(0, 3).map((course, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay={`${0.1 + index * 0.2}s`}
            >
              <div className="course-item bg-light">
                <div className="position-relative overflow-hidden">
                  <img
                    className="img-fluid"
                    src={course?.image}
                    alt="Course"
                    style={{ width: "100%", height: "250px" }}
                  />
                  <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                    <Link
                      to={`/course-details/${course?._id}`}
                      className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                      style={{ borderRadius: "30px 0 0 30px" }}
                    >
                      Read More
                    </Link>
                    <button
                      onClick={() => handleCheckOutPayment(course)}
                      className="flex-shrink-0 btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "0 30px 30px 0" }}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
                <div className="text-center p-4 pb-0">
                  <h3 className="mb-0">{displayINRCurrency(course?.price)}</h3>
                  <div className="mb-3">
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small>(4.5)</small>
                  </div>
                  <h5 className="mb-4 text-truncate" >{course?.name}</h5>
                </div>
                <div className="d-flex border-top">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-user-tie text-primary me-2" />
                    {course?.instructorName}
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-clock text-primary me-2" />
                    {course?.duration}
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2" />
                    299 Students
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    ///* <!-- Courses End --> */
  );
};

export default Cources;
