import React, { useEffect, useState } from "react";
import ContentHeading from "../layouts/ContentHeading";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryAPI from "../../common/API";

const WebinarCard = () => {
  const [data, setData] = useState([]);
  const [webinarEnroll, setWebinarEnrol] = useState([]);
  const navigate = useNavigate();

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
    const [hours24, minutes] = time24.split(':').map(Number);
    const hours12 = hours24 % 12 || 12; // Convert to 12-hour format
    const ampm = hours24 >= 12 ? 'PM' : 'AM';

    const strMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours12}:${strMinutes} ${ampm}`;
};

  return (
    <div>
      <ContentHeading title={"Webinar"} heading={"Coming Webinars"} />
      <div className="container">
        <div className="row">
          {data.length > 0 ? (
            data.map((webinar, index) => (
              <div className="col-md-6 mb-1 wow fadeInRight">
                <div className={"card bg-dark-subtle"}>
                  <img
                    src={webinar?.image}
                    className="card-img-top webinar-image"
                    alt={webinar?.title}
                  />
                  <div className="card-body">
                    <div className="text-section">
                      <h5 className="card-title fw-bold">{webinar?.title}</h5>{" "}
                      {/* Replace with actual title */}
                      <p className="card-text card-description">
                        {webinar?.description}
                        {/* Replace with actual description */}
                      </p>
                      <p className="card-text">
                        <strong>Date:</strong>{" "}{new Date(webinar?.date).toLocaleDateString()}
                      </p>
                      <p className="card-text">
                        <strong>Time:</strong>{" "}
                        {formatTime12Hour(webinar?.time)}
                      </p>
                    </div>
                    <div className="cta-section">
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
            <div className="m-2 p-2">No upcoming webinars available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebinarCard;
