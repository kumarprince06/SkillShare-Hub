import React, { useEffect, useState } from "react";
import "../../assets/style/CustomModal.css";
import { useSelector } from "react-redux";
import ROLE from "../../common/Role";
import ContentHeading from "../layouts/ContentHeading";
import SummaryAPI from "../../common/API";
import { toast } from "react-toastify";
import UploadImage from "../../helper/ImageUpload";
import DeleteImage from "../../helper/ImageDelete";

const Webinar = () => {
  const [data, setData] = useState([]);

  const user = useSelector((state) => state?.user?.user);
  const [showModal, setShowModal] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [webinarData, setWebinarData] = useState({
    title: "",
    description: "",
    speaker: "",
    speakerBio: "",
    date: "",
    time: "",
    platform: "",
    link: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setWebinarData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // console.log(webinarData);

  //Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryAPI.addWebinar.url, {
      method: SummaryAPI.addWebinar.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(webinarData),
    });

    const result = await response.json();

    if (result.success) {
      toast.success(result.message);
      getWebinarData();
      setWebinarData({
        title: "",
        description: "",
        speaker: "",
        speakerBio: "",
        date: "",
        time: "",
        platform: "",
        link: "",
        image: "",
      });
      setFormSubmitted(true);
      handleCloseModal();
    } else {
      toast.error(result.message);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadImageToCloudinary = await UploadImage(file);
    if (uploadImageToCloudinary && uploadImageToCloudinary.url) {
      setWebinarData((prev) => ({
        ...prev,
        image: uploadImageToCloudinary.url,
      }));
      setTempImage(uploadImageToCloudinary);
    }
  };

  //GetWebinar Data
  const getWebinarData = async () => {
    const response = await fetch(SummaryAPI.getWebinar.url, {
      method: SummaryAPI.getWebinar.method,
    });

    const result = await response.json();
    // console.log("Data:", result.data);
    if (result.success) {
      setData(result.data);
    }
  };

  useEffect(() => {
    getWebinarData();
  }, []);

  const handleImageDeletion = async () => {
    if (tempImage && !formSubmitted) {
      // console.log("Delete Image API Called after submitting the form");
      await DeleteImage(tempImage.public_id);
    }
    handleCloseModal();
  };

  //ModAL hANDLE
  const handleShowModal = () => {
    setShowModal(true);
    setTempImage(null);
    setWebinarData({
      title: "",
      description: "",
      speaker: "",
      speakerBio: "",
      date: "",
      time: "",
      platform: "",
      link: "",
      image: "",
    });
    setFormSubmitted(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-0">
      {user?.role === ROLE.ADMIN && (
        <div className="text-end mb-2">
          <button
            onClick={handleShowModal}
            className="btn btn-primary wow fadeInRight"
            data-wow-delay="0.1s"
          >
            Add Webinar
          </button>
        </div>
      )}
      <ContentHeading title={"Webinar"} heading={"Coming Webinars"} />

      <div className="row">
        {data.length > 0 ? (
          data.map((webinar, index) => (
            <div className="col-md-6 mb-1 webinar-card" key={index}>
              <div className="card bg-success-subtle w-100 wow fadeInUp webinar-card p-2">
                <div id="webinar">
                  <div className="d-flex align-items-center webinar-header">
                    <img
                      src={webinar.image}
                      className="card-img-top webinar-image"
                      alt={webinar.title}
                    />
                    <div className="text-section webinar-text ms-3">
                      <h5 className="card-title fw-bold">{webinar.title}</h5>
                      <p className="card-text card-description">
                        {webinar.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div className="webinar-info">
                    <p className="card-text webinar-speaker">
                      <strong>Speaker:</strong> {webinar.speaker} (
                      {webinar.speakerBio})
                    </p>
                    <p className="card-text">
                      <strong>Platform:</strong> {webinar.platform}
                    </p>
                    <p className="card-text d-flex justify-content-between flex-wrap">
                      <span>
                        <strong>Date:</strong>{" "}
                        {new Date(webinar.date).toLocaleDateString()}
                      </span>
                      <span>
                        <strong>Time:</strong> {webinar.time}
                      </span>
                    </p>
                  </div>
                  <div className="webinar-link mt-auto">
                    <a
                      href={webinar.link}
                      className="btn btn-outline-secondary w-100"
                    >
                      Webinar Link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No upcoming webinars available.</p>
        )}
      </div>

      {showModal && (
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal-container">
            <div className="modal-dialog">
              <div className="modal-content  wow fadeInDown">
                <div className="modal-header">
                  <h4 className="modal-title btn-bg rounded p-2 fw-bolder">
                    Add Webinar
                  </h4>
                  <button
                    type="button"
                    className="close"
                    onClick={handleImageDeletion}
                  >
                    <span aria-hidden="true">X</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="fw-bolder">Webinar Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter webinar title"
                        onChange={handleOnChange}
                        value={webinarData.title}
                        name="title"
                      />
                      <label className="fw-bolder">Description</label>
                      <textarea
                        className="form-control"
                        placeholder="Enter description"
                        onChange={handleOnChange}
                        value={webinarData.description}
                        name="description"
                      ></textarea>
                      <label className="fw-bolder">Speaker Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter speaker name"
                        onChange={handleOnChange}
                        value={webinarData.speaker}
                        name="speaker"
                      />
                      <label className="fw-bolder">Speaker Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter speaker designation"
                        onChange={handleOnChange}
                        value={webinarData.speakerBio}
                        name="speakerBio"
                      />
                      <label className="fw-bolder">Platform</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter platform"
                        onChange={handleOnChange}
                        value={webinarData.platform}
                        name="platform"
                      />
                      <label className="fw-bolder">Platform Link</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter platform link"
                        onChange={handleOnChange}
                        value={webinarData.link}
                        name="link"
                      />
                      <label className="fw-bolder">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        onChange={handleOnChange}
                        value={webinarData.date}
                        name="date"
                      />
                      <label className="fw-bolder">Time</label>
                      <input
                        type="time"
                        className="form-control"
                        onChange={handleOnChange}
                        value={webinarData.time}
                        name="time"
                      />
                      <label className="fw-bolder">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleImage}
                        // value={webinarData.image}
                        name="image"
                      />
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-bg fw-bolder">
                        Add
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger fw-bolder"
                        onClick={handleImageDeletion}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Webinar;
