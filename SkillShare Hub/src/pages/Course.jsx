import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContentHeading from "../components/layouts/ContentHeading";
import SummaryAPI from "../common/API";
import { FaSearch } from "react-icons/fa";
import caurseImg1 from "../assets/images/course-1.jpg";
import displayINRCurrency from "../helper/DisplayINRCurrency";
import Spinners from "../components/layouts/Spinners";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useRazorpay from "react-razorpay";
import logo from "../assets/Favicon/favicon-32x32.png";

const Course = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [noCoursesFound, setNoCoursesFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [enrollCOurse, setEnrollCOurse] = useState([]);
  const [Razorpay] = useRazorpay();
  // console.log(user)
  const fetchCourseData = async () => {
    setLoading(true);
    const response = await fetch(SummaryAPI.getCourse.url, {
      method: SummaryAPI.getCourse.method,
    });

    setLoading(false);

    const result = await response.json();

    if (result.success) {
      // Shuffle the data and select the first three items
      const shuffledData = result.data.sort(() => 0.5 - Math.random());
      setData(shuffledData);
      setFilteredCourses(result.data);
      setNoCoursesFound(false); // Reset no courses found message
    }
  };

  useEffect(() => {
    fetchCourseData();
    // fetchEnrollCourse();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = data.filter(
        (course) =>
          course.name.toLowerCase().includes(lowercasedQuery) ||
          course.category.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredCourses(filtered);
      setNoCoursesFound(filtered.length === 0);
      setCurrentPage(1); // Reset to the first page on search
    } else {
      setFilteredCourses(data);
      setNoCoursesFound(false);
    }
  }, [searchQuery, data]);

  // Calculate the indices for slicing the filtered data array
  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Bottom To Top
  const [showBackToTop, setShowBackToTop] = useState(false);
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

  const handleEnrolCourse = async (courseId) => {
    try {
      const response = await fetch(SummaryAPI.addEnrollCourse.url, {
        method: SummaryAPI.addEnrollCourse.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      const result = await response.json();
      // console.log(result);
      if (response.status === 401) {
        toast.error(result.message);
        navigate("/login");
      } else if (response.status === 409) {
        toast.info(result.message);
      } else if (response.status === 200) {
        toast.success(result.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  //HandlePayment
  const handleCheckOutPayment = async (course) => {
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

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Courses
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link className="text-white" to={"/"}>
                      Home
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Courses
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-lg-10 text-center">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Courses"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ color: "black", height: "calc(2.5rem + 2px)" }}
                />
                <button
                  className="btn btn-bg btn-outline-light me-5"
                  type="button"
                  style={{
                    height: "calc(2.5rem + 2px)",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0",
                  }}
                >
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb ends */}
      <ContentHeading
        title={"Our Courses"}
        heading={"Checkout New Releases Of Our Courses"}
      />
      <div className="container m-5">
        <div className="row g-4 justify-content-center mb-2">
          {loading ? (
            <div className="d-flex justify-content-center my-5">
              <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : noCoursesFound ? (
            <div className="col-12 text-center">
              <h4>No Courses Found</h4>
            </div>
          ) : (
            currentCourses.map((course, index) => (
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
                key={index}
              >
                <div className="course-item bg-light">
                  <div className="position-relative overflow-hidden">
                    <img
                      className="img-fluid"
                      src={course.image || caurseImg1}
                      alt={course.name}
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                      <Link
                        to={`/course-details/${course._id}`} // Assuming course.id is available
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
                  <div className="text-center p-4">
                    <h3 className="mb-0">{displayINRCurrency(course.price)}</h3>
                    <div className="mb-3">
                      <small className="fa fa-star text-primary" />
                      <small className="fa fa-star text-primary" />
                      <small className="fa fa-star text-primary" />
                      <small className="fa fa-star text-primary" />
                      <small className="fa fa-star text-primary" />
                      <small>(123)</small>
                    </div>
                    <h5 className="mb-4">{course.name}</h5>
                  </div>
                  <div className="d-flex border-top">
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-user-tie text-primary me-2" />
                      {course.instructorName}
                    </small>
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-clock text-primary me-2" />
                      {course.duration} Hrs
                    </small>
                    <small className="flex-fill text-center py-2">
                      <i className="fa fa-user text-primary me-2" />
                      30 Students
                    </small>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {!noCoursesFound && (
          <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Back To Top */}
      {showBackToTop && (
        <button
          className="btn tn-bg btn-lg-square back-to-top "
          onClick={scrollToTop}
        >
          <i className="fa fa-chevron-up" />
        </button>
      )}
    </div>
  );
};

export default Course;
