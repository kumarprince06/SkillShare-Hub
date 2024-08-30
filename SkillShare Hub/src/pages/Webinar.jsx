import React, { useEffect, useState } from "react";
import SummaryAPI from "../common/API";
import ContentHeading from "../components/layouts/ContentHeading";
import "../assets/style/CustomModal.css";
import Breadscrumb from "../components/layouts/Breadscrumb";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Webinar = () => {
  const [data, setData] = useState([]);
  const [webinarEnroll, setWebinarEnrol] = useState([]);
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);


  const user = useSelector((state) => state.user.user);

  // Fetch Webinar Data
  const getWebinarData = async () => {
    const response = await fetch(SummaryAPI.getWebinar.url, {
      method: SummaryAPI.getWebinar.method,
    });
    const result = await response.json();
    if (result.success) {
      setData(result.data);
    }
    console.log("Webinar Data",data)
  };

  // Fetch Enrolled Webinar Data
  const getEnrollWebinar = async () => {
    if (user?._id) {
      const response = await fetch(SummaryAPI.getEnrollWebinar.url, {
        method: SummaryAPI.getEnrollWebinar.method,
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setWebinarEnrol(result.data);
      } else {
        setWebinarEnrol([]);
      }
    }
  };

  useEffect(() => {
    getWebinarData();
    getEnrollWebinar();
  }, []);

  // Handle Webinar Enrollment
  const handleEnrolWebinar = async (id) => {
    const response = await fetch(SummaryAPI.enrollWebinar.url, {
      method: SummaryAPI.enrollWebinar.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ webinarId: id }),
    });

    const result = await response.json();

    if (result.success) {
      toast.success(result.message);
      getWebinarData();
      getEnrollWebinar();
    } else if (result.error) {
      toast.error(result.message);
      navigate("/login");
    }
  };

  // Check if the webinar is enrolled by the user
  const isWebinarEnrolled = (webinarId) => {
    return webinarEnroll.some((item) => item?.webinarId?._id === webinarId);
  };

  const formatTime12Hour = (time24) => {
    const [hours24, minutes] = time24.split(":").map(Number);
    const hours12 = hours24 % 12 || 12; // Convert to 12-hour format
    const ampm = hours24 >= 12 ? "PM" : "AM";

    const strMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours12}:${strMinutes} ${ampm}`;
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
      <Breadscrumb heading={"Webinar"} />
      <div className="container p-5">
        <ContentHeading heading={"Coming Webinar"} title={"Webinar"} />
        <div className="row">
          {data.length > 0 ? (
            data.map((webinar, index) => (
              <div className="col-md-6 mb-1 webinar-card" key={index}>
                <div className="card bg-success-subtle w-100 wow fadeInUp webinar-card p-2">
                  <div id="webinar">
                    <div className="d-flex align-items-center webinar-header">
                      <img
                        src={webinar?.image}
                        className="card-img-top webinar-image"
                        alt={webinar?.title}
                      />
                      <div className="text-section webinar-text ms-3">
                        <h5 className="card-title fw-bold">{webinar?.title}</h5>
                        <p className="card-text card-description">
                          {webinar?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="webinar-info">
                      <p className="card-text webinar-speaker">
                        <strong>Speaker:</strong> {webinar?.speaker} (
                        {webinar?.speakerBio})
                      </p>
                      <p className="card-text">
                        <strong>Platform:</strong> {webinar?.platform}
                      </p>
                      <p className="card-text d-flex justify-content-between flex-wrap">
                        <span>
                          <strong>Date:</strong>{" "}
                          {new Date(webinar?.date).toLocaleDateString()}
                        </span>
                        <span>
                          <strong>Time:</strong> {formatTime12Hour(webinar?.time)}
                        </span>
                      </p>
                    </div>
                    <div className="webinar-link mt-auto">
                      {isWebinarEnrolled(webinar?._id) ? (
                        <Link
                          to={webinar?.link}
                          className="btn btn-outline-secondary w-100"
                        >
                          Webinar Link
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleEnrolWebinar(webinar?._id)}
                          className="btn btn-outline-primary w-100"
                        >
                          Enroll
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No upcoming webinars available.</p>
          )}
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

export default Webinar;
