import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
// Import your images
import carousel1 from "../../assets/images/carousel-1.jpg";
import carousel2 from "../../assets/images/carousel-2.jpg";
import "../../assets/style/style.css";
import { useSelector } from "react-redux";

const Carousel = () => {
  const user = useSelector((state) => state.user.user);
  const options = {
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  };

  return (
    <div className="header-carousel container-fluid p-0 mb-5 ">
      <OwlCarousel {...options}>
        <div className="position-relative owl-carousel-item">
          <img className="img-fluid" src={carousel1} alt="Carousel 1" />
          <div
            className="carousel-content position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
            style={{ background: "rgba(24, 29, 56, 0.7)" }}
          >
            <div className="container">
              <div className="row justify-content-start">
                <div className="col-sm-10 col-lg-8">
                  <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
                    Welcome to SkillShare Hub
                  </h5>
                  <h1 className="display-3 text-white animated slideInDown">
                    Learn and Share Your Skills Online
                  </h1>
                  <p className="fs-5 text-white mb-4 pb-2">
                    Join our community and access a wide variety of courses to
                    enhance your skills. Whether you're a beginner or an expert,
                    there's something for everyone.
                  </p>
                  <Link
                    to={"courses"}
                    className="btn btn-bg py-md-3 px-md-5 me-3 animated slideInLeft"
                  >
                    Explore Courses
                  </Link>
                  {!user?._id && (
                    <Link
                      to={"/login"}
                      className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                    >
                      Get Started
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="position-relative owl-carousel-item">
          <img className="img-fluid" src={carousel2} alt="Carousel 2" />
          <div
            className="carousel-content position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
            style={{ background: "rgba(24, 29, 56, 0.7)" }}
          >
            <div className="container">
              <div className="row justify-content-start">
                <div className="col-sm-10 col-lg-8">
                  <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
                    Discover New Skills
                  </h5>
                  <h1 className="display-3 text-white animated slideInDown">
                    Online Learning Made Easy
                  </h1>
                  <p className="fs-5 text-white mb-4 pb-2">
                    Our platform offers a user-friendly experience for all
                    learners. Start your learning journey today and unlock new
                    opportunities.
                  </p>
                  <a
                    href="#"
                    className="btn btn-bg py-md-3 px-md-5 me-3 animated slideInLeft"
                  >
                    Browse Categories
                  </a>
                  {!user?._id && (
                    <Link
                      to={"signup"}
                      className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                    >
                      Sign Up Now
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </OwlCarousel>
    </div>
  );
};

export default Carousel;
