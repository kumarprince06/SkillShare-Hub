import React from "react";
import aboutImg from "../../assets/images/about.jpg";

const About = () => {
  return (
    // <!-- About Start -->
    <div className="container-xxl py-5 mb-2">
      <div className="container">
        <div className="row g-5">
          <div
            className="col-lg-6 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ minHeight: 400 }}
          >
            <div className="position-relative h-100">
              <img
                className="img-fluid position-absolute w-100 h-100"
                src={aboutImg}
                alt="About Us"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
            <h6 className="section-title bg-white text-start text-primary pe-3">
              About Us
            </h6>
            <h1 className="mb-4">Welcome to SkillShare Hub</h1>
            <p className="mb-4">
              At SkillShare Hub, we are committed to providing top-notch courses
              designed to enhance your skills and knowledge. Our platform is
              dedicated not only to delivering high-quality education but also
              to fostering a community where skills can be shared and developed
              collaboratively.
            </p>
            <p className="mb-4">
              We believe that learning should be a two-way street. That’s why we
              encourage our users to not just learn from our expertly designed
              courses but also to contribute their own expertise. Whether you’re
              a seasoned professional or a passionate learner, SkillShare Hub is
              the place to grow your skills and share your knowledge with
              others.
            </p>
            <div className="row gy-2 gx-4 mb-4">
              <div className="col-sm-6">
                <p className="mb-0">
                  <i className="fa fa-arrow-right text-primary me-2" />
                  Expert-Led Courses
                </p>
              </div>
              <div className="col-sm-6">
                <p className="mb-0">
                  <i className="fa fa-arrow-right text-primary me-2" />
                  Skill Sharing Community
                </p>
              </div>
              <div className="col-sm-6">
                <p className="mb-0">
                  <i className="fa fa-arrow-right text-primary me-2" />
                  Collaborative Learning
                </p>
              </div>
              <div className="col-sm-6">
                <p className="mb-0">
                  <i className="fa fa-arrow-right text-primary me-2" />
                  Professional Development
                </p>
              </div>
            </div>
            <a className="btn btn-bg py-3 px-5 mt-2 fw-bolder" href="#">
              Discover More
            </a>
          </div>
        </div>
      </div>
    </div>
    // <!-- About End -->
  );
};

export default About;
