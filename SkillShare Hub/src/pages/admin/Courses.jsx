import React, { useState } from "react";
import ROLE from "../../common/Role";
import { useSelector } from "react-redux";
import ContentHeading from "../../components/layouts/ContentHeading";
import CourseCard from "../../components/courses/CourseCard";
import CourseModal from "../../components/layouts/CourseModal";
import DeleteImage from "../../helper/ImageDelete";
import UploadImage from "../../helper/ImageUpload";
import SummaryAPI from "../../common/API";
import { toast } from "react-toastify";

const AdminCourses = () => {
  const user = useSelector((state) => state.user.user);
  const [showModal, setShowModal] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [filteredCourses, setFilteredCourses] = useState([]);


  const [data, setData] = useState({
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

  // console.log(data)

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTempImage(null);
    setData({
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
    // alert("Hii")
    if (tempImage && !formSubmitted) {
      // console.log("Delete Image API Called after submitting the form");
      await DeleteImage(tempImage.public_id);
    }
    handleCloseModal();
  };

  const handleUploadProductImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadImageToCloudinary = await UploadImage(file);
    if (uploadImageToCloudinary && uploadImageToCloudinary.url) {
      setData((prev) => ({
        ...prev,
        image: uploadImageToCloudinary.url,
      }));
      setTempImage(uploadImageToCloudinary);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryAPI.addCourse.url, {
        method: SummaryAPI.addCourse.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
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



  return (
    <div>
      <div className="addInstructor">
        {user?.role === ROLE.ADMIN && (
          <div className="text-end mb-5">
            <button
              onClick={handleShowModal}
              className="btn btn-primary wow fadeInRight fw-bolder"
              data-wow-delay="0.1s"
            >
              Add Course
            </button>
          </div>
        )}
      </div>
      <CourseCard />
      {showModal && (
        <CourseModal
          button = {"Add"}
          title = {"Add Course"}
          handleCloseModal={handleCloseModal}
          handleOnChange={handleOnChange}
          data={data}
          hanldeUploadImage = {handleUploadProductImage}
          handleDeleteImage = {handleImageDeletion}
          handleSubmit = {handleSubmit}
        />
      )}
    </div>
  );
};

export default AdminCourses;
