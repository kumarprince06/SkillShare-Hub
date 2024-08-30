import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/layouts/Breadscrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import SummaryAPI from "../common/API";
import image1 from "../assets/images/course-1.jpg";
import displayINRCurrency from "../helper/DisplayINRCurrency";
import "../assets/style/CustomModal.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import useRazorpay from "react-razorpay";
import { useSelector } from "react-redux";
import logo from "../assets/Favicon/favicon-32x32.png";
import { toast } from "react-toastify";


const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [relatedCourse, setRealatedCourse] = useState([]);
  const [recentCourse, setRecentCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [Razorpay] = useRazorpay();
  const [showBackToTop, setShowBackToTop] = useState(false);

  const options = {
    autoplay: true,
    smartSpeed: 1500,
    items: 2,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  };

  const fetchCourse = async () => {
    const response = await fetch(`${SummaryAPI.getSingleCourse.url}/${id}`, {
      method: SummaryAPI.getSingleCourse.method,
    });

    const result = await response.json();
    console.log("result:", result);
    if (result.success) {
      setCourse(result.data);
      // console.log(result.data.category)
      await fetchRealatedCourse(result.data.category);
      await fetchRecentCourse();
    }
  };
  const fetchRealatedCourse = async (category) => {
    // console.log("Category",category)
    const response = await fetch(
      `${SummaryAPI.getRealatedCourse.url}/${category}`,
      {
        method: SummaryAPI.getRealatedCourse.method,
      }
    );

    const result = await response.json();
    // console.log("Related Course", result);
    if (result.success) {
      setRealatedCourse(result.data);
    }
  };

  const fetchRecentCourse = async () => {
    const response = await fetch(SummaryAPI.getCourse.url, {
      method: SummaryAPI.getCourse.method,
    });

    const result = await response.json();
    // console.log("Related Course", result);
    if (result.success) {
      const shuffledData = result.data.sort(() => 0.5 - Math.random());
      setRecentCourse(shuffledData.slice(0, 5));
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleCheckOutPayment = async () => {
    
    const data = {
      courseId: course._id, // Include course ID
      name: course.name, // Include course name
      price: course.price,
    };
    const fetchCreateOrder = await fetch(SummaryAPI.createOrder.url, {
      method: SummaryAPI.createOrder.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const orderDetails = await fetchCreateOrder.json();
    if(orderDetails.error){
      navigate("/login")
      toast.error(orderDetails.message)
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

        const responseVerify = await fetch(SummaryAPI.verifyPayment.url, {
          method: SummaryAPI.verifyPayment.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(paymentData),
        });

        const verifyPayment = await responseVerify.json();

        if (verifyPayment.success) {
          navigate("/my-account/course");
          toast.success(verifyPayment.message);
        } else {
          toast.error(verifyPayment.message);
        }
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.contact, // Optional: Prefill the user's contact details
      },
      notes: {
        courseId: data?.courseId,
        userId: user?._id,
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
      console.error(response.error);
      toast.error("Payment failed! Please try again.");
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Ensures smooth scrolling
    });
  };

  return (
    <div>
      <Breadcrumb heading={"Course Details"} />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8">
              <div className="mb-5">
                <div
                  className=" sction-title text-center wow fadeInUp mb-5"
                  data-wow-delay="0.1s"
                >
                  <h6 className="section-title bg-white text-left text-primary px-3">
                    Course Details
                  </h6>
                  <h1 className="mb-5 display-4">{course?.name}</h1>
                </div>
                <img
                  className="img-fluid rounded w-100 mb-4"
                  style={{ width: "1000%", height: "500px" }}
                  src={course?.image || image1}
                  alt={course?.title}
                />
                <p>{course?.description}</p>
              </div>
              {/* Related Courses Section */}
              <h2 className="mb-3">Related Courses</h2>
              <OwlCarousel
                {...options}
                className=" position-relative owl-carousel related-course wow fadeInLeft"
                style={{ width: "80%", height: "300px", padding: "0 30px" }}
              >
                {relatedCourse.length > 0 ? (
                  relatedCourse.map((related, index) => (
                    <Link
                      key={index}
                      className="courses-list-item  position-relative d-block overflow-hidden mb-2"
                      style={{ padding: "0 10px" }}
                      to={`/course-details/${related?._id}`}
                    >
                      <img
                        className="img-fluid"
                        src={related?.image || image1}
                        alt={related?.title}
                        style={{ width: "100%", height: "300px" }}
                      />
                      <div className="courses-text">
                        <h4 className="text-center text-white px-3">
                          {related?.name}
                        </h4>
                        <div className="border-top w-100 mt-3">
                          <div className="d-flex justify-content-between p-4">
                            <span className="text-white">
                              <i className="fa fa-user mr-2"></i>
                              {related?.instructorName}
                            </span>
                            <span className="text-white">
                              <i className="fa fa-star mr-2"></i>
                              4.5
                              <small>(199)</small>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>No related courses found.</p>
                )}
              </OwlCarousel>
            </div>
            <div className="col-lg-4 mt-5 mt-lg-0">
              <div
                className="btn-bg mb-5 py-3 wow fadeInRight"
                data-wow-delay="0.1s"
              >
                <h3 className="text-white py-3 px-4 m-0">Course Features</h3>
                <div className="d-flex justify-content-between border-bottom px-4">
                  <h6 className="text-white my-3">Instructor</h6>
                  <h6 className="text-white my-3">{course?.instructorName}</h6>
                </div>
                <div className="d-flex justify-content-between border-bottom px-4">
                  <h6 className="text-white my-3">Rating</h6>
                  <h6 className="text-white my-3">
                    4.5 <small>(250)</small>
                  </h6>
                </div>
                <div className="d-flex justify-content-between border-bottom px-4">
                  <h6 className="text-white my-3">Lectures</h6>
                  <h6 className="text-white my-3">{course?.lecture}</h6>
                </div>
                <div className="d-flex justify-content-between border-bottom px-4">
                  <h6 className="text-white my-3">Duration</h6>
                  <h6 className="text-white my-3">{course?.duration} Hrs</h6>
                </div>
                <div className="d-flex justify-content-between border-bottom px-4">
                  <h6 className="text-white my-3">Skill level</h6>
                  <h6 className="text-white my-3 text-capitalize">
                    {course?.level}
                  </h6>
                </div>
                <div className="d-flex justify-content-between px-4">
                  <h6 className="text-white my-3">Language</h6>
                  <h6 className="text-white my-3">{course?.language}</h6>
                </div>
                <h5 className="text-white py-3 px-4 m-0">
                  Course Price: {displayINRCurrency(course?.price)}
                </h5>
                <div className="py-3 px-4">
                  <button
                    className="btn btn-block btn-danger py-3 px-5 fw-bold fs-4"
                    style={{ width: "100%" }}
                    onClick={handleCheckOutPayment}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
              {/* <div className="mb-5">
                <h2 className="mb-3">Categories</h2>
                <ul className="list-group list-group-flush">
                  {course?.categories?.map((category) => (
                    <li
                      key={category.id}
                      className="list-group-item d-flex justify-content-between align-items-center px-0"
                    >
                      <a
                        href={`/category/${category.id}`}
                        className="text-decoration-none h6 m-0"
                      >
                        {category.name}
                      </a>
                      <span className="badge badge-primary badge-pill">
                        {category.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div> */}
              <div className="mb-5">
                <h2 className="mb-4">Recent Courses</h2>
                {recentCourse?.map((recentcourse, index) => (
                  <Link
                    key={index}
                    className="d-flex align-items-center text-decoration-none mb-4"
                    to={`/course-details/${recentcourse._id}`}
                  >
                    <img
                      className="img-fluid"
                      src={recentcourse?.image}
                      alt={recentcourse?.title}
                      style={{ width: "30%", margin: "5px" }}
                    />
                    <div className="pl-3 ml-2">
                      <h6>{recentcourse?.name}</h6>
                      <div className="d-flex">
                        <small className="text-body mr-3">
                          <i className="fa fa-user text-primary mr-2" /> {" "}
                          {recentcourse?.instructorName}
                        </small>
                        <small
                          className="text-body ml-4"
                          style={{ marginLeft: "15px", right: "0px" }}
                        >
                          <i className="fa fa-star text-primary mr-2" />{" "}
                          4.2 (299)
                        </small>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          className="btn btn-bg btn-lg-square back-to-top"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      )}
    </div>
  );
};

export default CourseDetails;
