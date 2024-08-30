import React, { useEffect, useState } from "react";
import caurseImg1 from "../../assets/images/course-1.jpg";
import caurseImg2 from "../../assets/images/course-2.jpg";
import caurseImg3 from "../../assets/images/course-3.jpg";
import displayINRCurrency from "../../helper/DisplayINRCurrency";
import ContentHeading from "../layouts/ContentHeading";
import SummaryAPI from "../../common/API";
import { Link } from "react-router-dom";

const Cources = () => {
  const [data, setData] = useState([]);

  const fetchCourse = async () => {
    const response = await fetch(SummaryAPI.getCourse.url, {
      method: SummaryAPI.getCourse.method,
    });

    const result = await response.json();
    if (result.success) {
      // Shuffle the data and select the first three items
      const shuffledData = result.data.sort(() => 0.5 - Math.random());
      setData(shuffledData.slice(0, 3));
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    // <!-- Courses Start -->
    <div className="container-xxl py-5">
      <div className="container">
        <ContentHeading title={"Courses"} heading={"Popular Courses"} />

        <div className="row g-4 justify-content-center">
          {data.slice(0, 3).map((course, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay={`${0.1 + index * 0.2}s`}
            >
              <div className="course-item bg-light">
                <div className="position-relative overflow-hidden">
                  <img
                    className="img-fluid"
                    src={course?.image}
                    alt="Course"
                    style={{ width: "100%", height: "250px" }}
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
                      Enroll Now
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
                    <small>(4.5)</small>
                  </div>
                  <h5 className="mb-4 text-truncate" >{course?.name}</h5>
                </div>
                <div className="d-flex border-top">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-user-tie text-primary me-2" />
                    {course?.instructorName}
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-clock text-primary me-2" />
                    {course?.duration}
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2" />
                    299 Students
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    ///* <!-- Courses End --> */
  );
};

export default Cources;
