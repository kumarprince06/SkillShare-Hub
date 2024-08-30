import React from "react";
import "../../assets/style/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Services = () => {
  return (
    // <!-- Service Start -->
    <div className="container-xxl py-5 service-section">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="service-item text-center pt-3">
              <div className="p-4">
                <i className="fa fa-3x fa-graduation-cap text-primary mb-4" />
                <h5 className="mb-3">Expert Tutors</h5>
                <p>
                  Learn from industry experts and experienced educators who are
                  passionate about teaching and sharing knowledge.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="service-item text-center pt-3">
              <div className="p-4">
                <i className="fa fa-3x fa-globe text-primary mb-4" />
                <h5 className="mb-3">Interactive Online Classes</h5>
                <p>
                  Engage in interactive online classes with live sessions,
                  real-time feedback, and collaborative projects.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="service-item text-center pt-3">
              <div className="p-4">
                <i className="fa fa-3x fa-home text-primary mb-4" />
                <h5 className="mb-3">Hands-on Projects</h5>
                <p>
                  Apply your learning through practical projects that you can
                  showcase in your portfolio and share with others.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
            <div className="service-item text-center pt-3">
              <div className="p-4">
                <i className="fa fa-3x fa-book-open text-primary mb-4" />
                <h5 className="mb-3">Resource Library</h5>
                <p>
                  Access a vast library of resources including e-books,
                  tutorials, and guides to support your learning journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <!-- Service End -->
  );
};

export default Services;
