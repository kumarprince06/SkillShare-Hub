import React, { useEffect, useState } from "react";
import Heading from "../../components/layouts/Heading";
import SummaryAPI from "../../common/API";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import UploadImage from "../../helper/ImageUpload";
import DeleteImage from "../../helper/ImageDelete";

const Webinar = () => {
  const [data, setData] = useState([]);
  const [webinarEnroll, setWebinarEnroll] = useState([]);
  const user = useSelector((state) => state.user.user);
  const [showModal, setShowModal] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [webinarData, setWebinarData] = useState({
    userId: user?._id,
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

  // Fetch Enrolled Webinar Data
  const getEnrollWebinar = async () => {
    if (user?._id) {
      setLoading(true);
      try {
        const response = await fetch(SummaryAPI.getEnrollWebinar.url, {
          method: SummaryAPI.getEnrollWebinar.method,
          credentials: "include",
        });
        const result = await response.json();
        if (result.success) {
          setWebinarEnroll(result.data);
        } else {
          setWebinarEnroll([]);
        }
      } catch (error) {
        toast.error("An error occurred while fetching enrolled webinars.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getEnrollWebinar();
  }, []);

  const formatTime12Hour = (time24) => {
    const [hours24, minutes] = time24.split(":").map(Number);
    const hours12 = hours24 % 12 || 12; // Convert to 12-hour format
    const ampm = hours24 >= 12 ? "PM" : "AM";
    const strMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours12}:${strMinutes} ${ampm}`;
  };

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

  const handleImageDeletion = async () => {
    if (tempImage && !formSubmitted) {
      await DeleteImage(tempImage.public_id);
    }
    handleCloseModal();
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const uploadImageToCloudinary = await UploadImage(file);
      if (uploadImageToCloudinary && uploadImageToCloudinary.url) {
        setWebinarData((prev) => ({
          ...prev,
          image: uploadImageToCloudinary.url,
        }));
        setTempImage(uploadImageToCloudinary);
      }
    } catch (error) {
      toast.error("Failed to upload image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    }
  };

  const getWebinarData = async () => {
    try {
      const response = await fetch(
        `${SummaryAPI.geOrganizedWebinar.url}/${user?._id}`,
        {
          method: SummaryAPI.geOrganizedWebinar.method,
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      toast.error("An error occurred while fetching organized webinars.");
    }
  };

  useEffect(() => {
    getWebinarData();
  }, []);

  const dateCOmpare = (date)=>{
    console.log("Date", date);

    const parseDBDate = new Date(date)
    console.log("DB Date", parseDBDate)
    const today = new Date()
    console.log("Today's Date", today)
    if(parseDBDate < today){
      return "bg-dark"
    }
    return "bg-info"
  }

  return (
    <div className="w-100">
      <div className="text-center m-1">
        <Heading title={"Webinar Details"} />
      </div>
      <div className="d-flex flex-column flex-xl-row justify-content- m-1">
        <div className="w-100">
          <div className="m-1 py-2">
            <Heading title={"Enroll Webinar"} />
          </div>
          <div className="w-100">
            {loading ? (
              <div className="d-flex justify-content-center my-5">
                <div className="spinner-border text-info" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : webinarEnroll.length > 0 ? (
              webinarEnroll.map((webinar, index) => (
                <div
                  className={`${dateCOmpare(webinar?.webinarId?.date)} bg-info rounded bg-opacity-25 py-2 m-1 w-100 wow fadeINLeft`}
                  data-wow-delay="0.1s"
                  key={index}
                >
                  <div className="d-flex m-0">
                    <div className="w-25">
                      <img
                        src={webinar?.webinarId?.image}
                        className="img-fluid rounded"
                        style={{ width: "100px", height: "100px" }}
                        alt=""
                      />
                    </div>
                    <div className="w-75">
                      <h6
                        style={{
                          width: "90%",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {webinar?.webinarId?.title}
                      </h6>
                      <p>
                        <strong>Time & Date:</strong>{" "}
                        {formatTime12Hour(webinar?.webinarId?.time)} &{" "}
                        {new Date(
                          webinar?.webinarId?.date
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Speaker:</strong>
                        {webinar?.webinarId?.speaker}
                      </p>
                      <p>
                        <strong>Platform:</strong>
                        {webinar?.webinarId?.platform}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-danger bg-opacity-25 text-center rounded py-2 fw-bolder">No webinars enrolled yet..!</div>
            )}
          </div>
        </div>
        <div
          className="vertical-line btn-bg d-none d-lg-block"
          style={{
            width: "3px",
            height: "auto",
            margin: "0 20px",
            marginTop: "40px",
          }}
        ></div>
        <div className="w-100">
          <div className="m-2">
            <button className="btn btn-bg" onClick={handleShowModal}>
              Organize Webinar
            </button>
          </div>
          <div className="m-2 text-center">
            <Heading title={"Organized Webinar"} />
          </div>
          {loading ? (
            <div className="d-flex justify-content-center my-5">
              <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : data.length > 0 ? (
            data.map((webinar, index) => (
              <div
                className={`${dateCOmpare(webinar?.date)} rounded bg-opacity-25 p-2 m-1 w-100 w-auto wow fadeINLeft`}
                data-wow-delay="0.1s"
                key={index}
              >
                <div className="d-flex m-0">
                  <div className="w-25">
                    <img
                      src={webinar?.image}
                      className="img-fluid rounded"
                      style={{ width: "100px", height: "100px" }}
                      alt=""
                    />
                  </div>
                  <div className="w-75">
                    <h6
                      style={{
                        width: "90%",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {webinar?.title}
                    </h6>
                    <p>
                      <strong>Time & Date:</strong>{" "}
                      {formatTime12Hour(webinar?.time)} &{" "}
                      {new Date(webinar?.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Speaker:</strong>
                      {webinar?.speaker}
                    </p>
                    <p>
                      <strong>Platform:</strong>
                      {webinar?.platform}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-danger bg-opacity-25 text-center rounded py-2 fw-bolder">No webinars organized yet..!</div>
          )}
        </div>
      </div>
      {/* Modal Code */}
      {showModal && (
        <div
          className="modal"
          style={{ display: showModal ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Webinar</h4>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={webinarData.title}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      value={webinarData.description}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Speaker</label>
                    <input
                      type="text"
                      name="speaker"
                      className="form-control"
                      value={webinarData.speaker}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Speaker Bio</label>
                    <textarea
                      name="speakerBio"
                      className="form-control"
                      value={webinarData.speakerBio}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      value={webinarData.date}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Time</label>
                    <input
                      type="time"
                      name="time"
                      className="form-control"
                      value={webinarData.time}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Platform</label>
                    <input
                      type="text"
                      name="platform"
                      className="form-control"
                      value={webinarData.platform}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Link</label>
                    <input
                      type="url"
                      name="link"
                      className="form-control"
                      value={webinarData.link}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Image</label>
                    <input
                      type="file"
                      onChange={handleImage}
                      className="form-control"
                    />
                    {tempImage && (
                      <div>
                        <img
                          src={tempImage.url}
                          alt="Preview"
                          className="img-fluid"
                        />
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={handleImageDeletion}
                        >
                          Delete Image
                        </button>
                      </div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Webinar;
