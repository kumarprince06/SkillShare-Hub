import React, { useEffect, useState } from "react";
import "../../assets/style/style.css";
import { Link } from "react-router-dom";
import "../../assets/style/CustomModal.css";
import { useSelector } from "react-redux";
import ROLE from "../../common/Role";
import ContentHeading from "../layouts/ContentHeading";
import SummaryAPI from "../../common/API";

const Instructor = () => {
  const user = useSelector((state) => state?.user?.user);
  // console.log(user)
  const [data, setData] = useState([]);

  const fetchInstructor = async () => {
    const response = await fetch(SummaryAPI.getInstructor.url, {
      method: SummaryAPI.getInstructor.method,
      headers: {
        "content-type": "application/json",
      },
    });

    const result = await response.json();
    if (result.success) {
      setData(result.data);
      // console.log("data",data)
    }
    
  };

  useEffect(() => {
    fetchInstructor();
  },[]);

  // Determine if the user is an admin
  const isAdmin = user?.role === ROLE.ADMIN;

  // Limit data for regular users
  const displayedInstructors = isAdmin ? data : data.slice(0, 4);
  // console.log(displayedInstructors)

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <ContentHeading title={"Instructors"} heading={"Meet Our Instructors"} />
        <div className="row g-4">
          {displayedInstructors.map((instructor, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-6 wow fadeInUp"
              // data-wow-delay="0.1s"
              data-wow-delay={`${index * 0.2 + 0.1}s`}
            >
              <div className="team-item bg-light">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={instructor.profileImage} alt="Instructor" />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-23px" }}
                >
                  <div className="bg-light d-flex justify-content-center pt-2 px-1">
                    <Link className="btn btn-sm-square btn-bg mx-1" to={instructor.facebookUrl} target="_blank">
                      <i className="fab fa-facebook-f" />
                    </Link>
                    <Link className="btn btn-sm-square btn-bg mx-1" to={instructor.twitterUrl} target="__blank">
                      <i className="fab fa-linkedin-in" />
                    </Link>
                    <Link className="btn btn-sm-square btn-bg mx-1" to={instructor.instagramUrl} target="__blank">
                      <i className="fab fa-instagram" />
                    </Link>
                  </div>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">{instructor?.name}</h5>
                  <small>{instructor.designation}</small>
                </div>
              </div>
            </div>
          ))}

          {/* <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="team-item bg-light">
              <div className="overflow-hidden">
                <img className="img-fluid" src={TeamImg2} alt="Instructor" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-23px" }}
              >
                <div className="bg-light d-flex justify-content-center pt-2 px-1">
                  <a className="btn btn-sm-square btn-bg mx-1" href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-sm-square btn-bg mx-1" href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-sm-square btn-bg mx-1" href="#">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Instructor Name</h5>
                <small>Designation</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="team-item bg-light">
              <div className="overflow-hidden">
                <img className="img-fluid" src={TeamImg3} alt="Instructor" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-23px" }}
              >
                <div className="bg-light d-flex justify-content-center pt-2 px-1">
                  <a className="btn btn-sm-square btn-bg mx-1" href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-sm-square btn-bg mx-1" href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-sm-square btn-bg mx-1" href="#">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Instructor Name</h5>
                <small>Designation</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
            <div className="team-item bg-light">
              <div className="overflow-hidden">
                <img className="img-fluid" src={TeamImg4} alt="Instructor" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-23px" }}
              >
                <div className="bg-light d-flex justify-content-center pt-2 px-1">
                  <a className="btn btn-sm-square btn-bg mx-1" href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-sm-square btn-bg mx-1" href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-sm-square btn-bg mx-1" href="#">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Instructor Name</h5>
                <small>Designation</small>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* Modal Starts*/}
    </div>
  );
};

export default Instructor;
