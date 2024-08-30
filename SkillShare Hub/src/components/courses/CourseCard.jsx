import React, { useEffect, useState } from "react";
import displayINRCurrency from "../../helper/DisplayINRCurrency";
import ContentHeading from "../layouts/ContentHeading";
import SummaryAPI from "../../common/API";
import { Link } from "react-router-dom";
import CourseModal from "../layouts/CourseModal";
import DeleteImage from "../../helper/ImageDelete";
import UploadImage from "../../helper/ImageUpload";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CourseCard = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [noCoursesFound, setNoCoursesFound] = useState(false);
  const user = useSelector((state)=>state.user.user)

  const fetchCourseData = async () => {
    const response = await fetch(SummaryAPI.getCourse.url, {
      method: SummaryAPI.getCourse.method,
    });
    const result = await response.json();
    if (result.success) {
      setData(result.data);
      setFilteredCourses(result.data);
      setNoCoursesFound(false)
      // console.log(result.data)
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [courseData, setCourseData] = useState({
    _id: "",
    name: "",
    description: "",
    duration: "",
    lecture: "",
    level: "",
    language: "",
    instructorName: "",
    image: "",
    price: "",
    category: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShowModal = async (id) => {
    // console.log("Id: ", id)
    const response = await fetch(`${SummaryAPI.getSingleCourse.url}/${id}`, {
      method: SummaryAPI.getSingleCourse.method,
    });
    const result = await response.json();
    if (result.success) {
      // console.log(result.data);
      setCourseData(result.data);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTempImage(null);
    setCourseData({
      _id:"",
      name: "",
      description: "",
      duration: "",
      lecture: "",
      level: "",
      language: "",
      instructorName: "",
      image: "",
      price: "",
      category: "",
    });
    setFormSubmitted(false);
  };

  const handleImageDeletion = async () => {
    if (tempImage && !formSubmitted) {
      alert("Delete Image API Called after submitting the form");
      await DeleteImage(tempImage.public_id);
    }
    handleCloseModal();
  };

  const handleUploadProductImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadImageToCloudinary = await UploadImage(file);
    if (uploadImageToCloudinary && uploadImageToCloudinary.url) {
      setCourseData((prev) => ({
        ...prev,
        image: uploadImageToCloudinary.url,
      }));
      setTempImage(uploadImageToCloudinary);
    }
  };
  // console.log(courseData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SummaryAPI.updateCourse.url}`, {
        method: SummaryAPI.updateCourse.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        fetchCourseData();
        setFormSubmitted(true);
        handleCloseModal();
      } else if (result.error) {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      if (tempImage) {
        await DeleteImage(tempImage.public_id);
        setTempImage(null);
      }
    }
  };

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

  return (
    <div className="container-xxl py-5 mt-5">
      <div className="container">
        <ContentHeading title={"Courses"} heading={"Popular Courses"} />
        <div className="row g-4 justify-content-center">
          {currentCourses.map((course, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              {/* {course?._id} */}
              <div className="course-item bg-light position-relative">
                <button
                  className="btn btn-sm btn-warning position-absolute"
                  style={{ top: "10px", right: "10px", zIndex: 1 }}
                  onClick={() => handleShowModal(course?._id)}
                >
                  <i class="fas fa-edit"></i>
                </button>
                <div className="position-relative overflow-hidden">
                  <img
                    className="img-fluid"
                    src={course?.image}
                    alt
                    style={{ width: "100%", height: "200px" }}
                  />
                  <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                    <Link
                      to={`/course-details/${course?._id}`}
                      className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                      style={{ borderRadius: "30px 0 0 30px" }}
                    >
                      Read More
                    </Link>
                    <a
                      href="#"
                      className="flex-shrink-0 btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "0 30px 30px 0" }}
                    >
                      Join Now
                    </a>
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
                    <small>(123)</small>
                  </div>
                  <h5 className="mb-4">{course?.name}</h5>
                </div>
                <div className="d-flex border-top">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-user-tie text-primary me-2" />
                    {course?.instructorName}
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-clock text-primary me-2" />
                    {course?.duration} Hrs
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2" />
                    30 Students
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
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
      {showModal && (
        <CourseModal
          button={"Update"}
          title={"Update Course"}
          handleOnChange={handleOnChange}
          data={courseData}
          hanldeUploadImage={handleUploadProductImage}
          handleDeleteImage={handleImageDeletion}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CourseCard;
