import React, { useState } from "react";
import Instructor from "../../components/Instructor/Instructor";
import { useSelector } from "react-redux";
import ROLE from "../../common/Role";
import ProfileImage from "../../assets/images/images.png";
import UploadImage from "../../helper/ImageUpload";
import DeleteImage from "../../helper/ImageDelete";
import SummaryAPI from "../../common/API";
import { toast } from "react-toastify";
import "../../assets/style/style.css";

const AdminInstructor = () => {
  const user = useSelector((state) => state?.user?.user);
  const [showModal, setShowModal] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [instructorData, setInstructorData] = useState({
    name: "",
    designation: "",
    contact: "",
    email: "",
    facebookUrl: "",
    profileImage: "",
    instagramUrl: "",
    twitterUrl: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTempImage(null);
    setInstructorData({
      name: "",
      designation: "",
      contact: "",
      email: "",
      facebookUrl: "",
      profileImage: "",
      instagramUrl: "",
      twitterUrl: "",
    });
    setFormSubmitted(false);
  };

  const handleImageDeletion = async () => {
    if (tempImage && !formSubmitted) {
      // console.log("Delete Image API Called after submitting the form");
      await DeleteImage(tempImage.public_id);
    }
    handleCloseModal();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInstructorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUploadProductImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadImageToCloudinary = await UploadImage(file);
    if (uploadImageToCloudinary && uploadImageToCloudinary.url) {
      setInstructorData((prev) => ({
        ...prev,
        profileImage: uploadImageToCloudinary.url,
      }));
      setTempImage(uploadImageToCloudinary);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryAPI.addInstructor.url, {
        method: SummaryAPI.addInstructor.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(instructorData),
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
              Add Instructor
            </button>
          </div>
        )}
      </div>
      <Instructor />
      {showModal && (
        <div
          id="costumModal"
          className="modal fade show wow fadeInDown"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="costumModalLabel"
          // aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title btn-bg rounded p-1">
                  Add Instructor
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    backgroundColor: "red",
                  }}
                  onClick={handleCloseModal}
                >
                  <i className="fa fa-close"></i>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="bg-white shadow rounded p-2 w-100 max-w-md mx-auto">
                    <div className="w-100 text-center mb-2">
                      <div
                        className="rounded-circle overflow-hidden d-inline-block"
                        style={{ width: "80px", height: "80px" }}
                      >
                        <img
                          src={instructorData.profileImage || ProfileImage}
                          alt="Instructor profile"
                          className="img-fluid"
                        />
                      </div>
                      <form>
                        <label className="mt-0">
                          <span className="btn btn-secondary w-100 mb-0">
                            Upload Profile
                          </span>
                          <input
                            type="file"
                            className="d-none"
                            onChange={handleUploadProductImage}
                          />
                        </label>
                      </form>
                    </div>
                    <form className="space-y-1" onSubmit={handleSubmit}>
                      <div className="mb-1">
                        <label className="form-label fw-bolder">
                          Instructor Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter instructor name"
                          name="name"
                          value={instructorData.name}
                          onChange={handleOnChange}
                          className="form-control input-control"
                        />
                      </div>
                      <div className="mb-1">
                        <label className="form-label fw-bolder">
                          Instructor Designation
                        </label>
                        <input
                          type="text"
                          placeholder="Enter instructor designation"
                          name="designation"
                          value={instructorData.designation}
                          onChange={handleOnChange}
                          className="form-control input-control"
                        />
                      </div>
                      <div className="mb-1">
                        <label className="form-label fw-bolder">
                          Instructor Email
                        </label>
                        <input
                          type="email"
                          placeholder="Enter instructor email"
                          name="email"
                          value={instructorData.email}
                          onChange={handleOnChange}
                          className="form-control input-control"
                        />
                      </div>
                      <div className="modalflex">
                        <div className="m-1">
                          <label className="form-label fw-bolder">
                            Instructor Contact
                          </label>
                          <input
                            type="text"
                            placeholder="Enter instructor contact"
                            name="contact"
                            value={instructorData.contact}
                            onChange={handleOnChange}
                            className="form-control input-control"
                          />
                        </div>
                        <div className="m-1">
                          <label className="form-label fw-bolder">
                            Facebook Url
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Facebook URL"
                            name="facebookUrl"
                            value={instructorData.facebookUrl}
                            onChange={handleOnChange}
                            className="form-control input-control"
                          />
                        </div>
                      </div>
                      <div className="modalflex">
                        <div className="m-1">
                          <label className="form-label fw-bolder">
                            Twitter Url
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Twitter URL"
                            name="twitterUrl"
                            value={instructorData.twitterUrl}
                            onChange={handleOnChange}
                            className="form-control input-control"
                          />
                        </div>
                        <div className="m-1">
                          <label className="form-label fw-bolder">
                            Instagram Url
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Instagram URL"
                            name="instagramUrl"
                            value={instructorData.instagramUrl}
                            onChange={handleOnChange}
                            className="form-control input-control"
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          className="btn btn-default"
                          data-dismiss="modal"
                          onClick={handleImageDeletion}
                        >
                          Close
                        </button>
                        <button className="btn btn-bg" type="submit">
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal Ends */}
    </div>
  );
};

export default AdminInstructor;
