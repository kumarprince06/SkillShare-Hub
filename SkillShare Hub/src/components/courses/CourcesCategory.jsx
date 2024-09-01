import React, { useEffect } from "react";
import WebDevCat from '../../assets/images/webdevelopmentcategory.jpg'
import DatabaseCat from '../../assets/images/dbcategory.jpg'
import mern from '../../assets/images/mern.jpg'
import programCat from '../../assets/images/programminglanguage.jpg'
import ContentHeading from "../layouts/ContentHeading";


const CourcesCategory = () => {

  useEffect(()=>{
    // Initialize WOW.js
    new WOW.WOW().init();
  })
  return (
    // <!-- Categories Start -->
    <div className="container-xxl py-5 category">
      <div className="container">
        <ContentHeading title={"Categories"} heading={"Course Categories"} />
        <div className="row g-3">
          <div className="col-lg-7 col-md-6">
            <div className="row g-3">
              <div
                className="col-lg-12 col-md-12 wow zoomIn"
                data-wow-delay="0.1s"
              >
                <a className="position-relative d-block overflow-hidden" href>
                  <img className="img-fluid" src={WebDevCat} alt="category image" />
                  <div
                    className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3 "
                    style={{ margin: 1 }}
                  >
                    <h5 className="m-0 ">Web Development</h5>
                    <small className="text-primary">49 Courses</small>
                  </div>
                </a>
              </div>
              <div
                className="col-lg-6 col-md-12 wow zoomIn"
                data-wow-delay="0.3s"
              >
                <a className="position-relative d-block overflow-hidden" href>
                  <img className="img-fluid" src={mern} alt="category image" />
                  <div
                    className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                    style={{ margin: 1 }}
                  >
                    <h5 className="m-0">MERN Stack</h5>
                    <small className="text-primary">10 Courses</small>
                  </div>
                </a>
              </div>
              <div
                className="col-lg-6 col-md-12 wow zoomIn"
                data-wow-delay="0.5s"
              >
                <a className="position-relative d-block overflow-hidden" href>
                  <img className="img-fluid" src={DatabaseCat} alt="category image" style={{ objectFit: "cover" }} />
                  <div
                    className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                    style={{ margin: 1 }}
                  >
                    <h5 className="m-0">Database</h5>
                    <small className="text-primary">10 Courses</small>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div
            className="col-lg-5 col-md-6 wow zoomIn"
            data-wow-delay="0.7s"
            style={{ minHeight: 350 }}
          >
            <a className="position-relative d-block h-100 overflow-hidden" href>
              <img
                className="img-fluid position-absolute w-100 h-100"
                src={programCat}
                alt="category image"
                style={{ objectFit: "cover" }}
              />
              <div
                className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                style={{ margin: 1 }}
              >
                <h5 className="m-0">Programming Language</h5>
                <small className="text-primary">49 Courses</small>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    //<!-- Categories Start -->
  );
};

export default CourcesCategory;
