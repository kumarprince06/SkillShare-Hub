import React, { useEffect, useState } from "react";
import "../assets/style/style.css";
import { Link } from "react-router-dom";
import Services from "../components/layouts/Services";
import About from "../components/layouts/About";
import Instructor from "../components/Instructor/Instructor";

const AboutUs = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
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
      behavior: "smooth", 
    });
  };

  return (
    <div>
      {/* //<!-- Header Start --> */}
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                About Us
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link
                      className="text-white"
                      to="/"
                      style={{ textDecoration: "none" }}
                    >
                      Home
                    </Link>
                  </li>

                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    About
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* //<!-- Header End --> */}
      <Services />
      <About />
      <Instructor />

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

export default AboutUs;
