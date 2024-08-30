import React from "react";
import "../../assets/style/style.css";
import courceImg1 from "../../assets/images/course-1.jpg";
import courceImg2 from "../../assets/images/course-2.jpg";
import courceImg3 from "../../assets/images/course-3.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="container-fluid  text-light footer pt-5 mt-1 wow fadeIn">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-3">Quick Link</h4>
            <Link
              className="btn btn-link"
              to={"/about"}
              style={{ textDecoration: "none" }}
            >
              About Us
            </Link>
            <Link
              className="btn btn-link"
              to={"/contact"}
              style={{ textDecoration: "none" }}
            >
              Contact Us
            </Link>
            <Link
              className="btn btn-link"
              to={"/privacy-policy"}
              style={{ textDecoration: "none" }}
            >
              Privacy Policy
            </Link>
            <Link
              className="btn btn-link"
              to={"/terms-condition"}
              style={{ textDecoration: "none" }}
            >
              Terms & Condition
            </Link>
            <Link
              className="btn btn-link"
              to={"/faq-help"}
              style={{ textDecoration: "none" }}
            >
              FAQs & Help
            </Link>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-3">Contact</h4>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt me-3"></i>25/3, Howrah, West
              Bengal, India
            </p>
            <p className="mb-2">
              <i className="fa fa-phone-alt me-3"></i>+91 8617266822
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope me-3"></i>kumarprince.s0611@gmail.com
            </p>
            <div className="d-flex pt-2">
              <Link
                className="btn btn-outline-light btn-social"
                to={"https://x.com/kumar_prince06"}
                target="_blank"
              >
                <i className="fab fa-twitter"></i>
              </Link>
              <Link
                className="btn btn-outline-light btn-social"
                to={"https://www.facebook.com/kumar.prince.06"}
                target="_blank"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link
                className="btn btn-outline-light btn-social"
                to={"https://www.instagram.com/kumar_prince06/"}
                target="_blank"
              >
                <i className="fab fa-instagram"></i>
              </Link>
              <Link
                className="btn btn-outline-light btn-social"
                to={"https://www.linkedin.com/in/kumarprince06"}
                target="_blank"
              >
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-3">Gallery</h4>
            <div className="row g-2 pt-2">
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src={courceImg1}
                  alt="Gallery Item 1"
                />
              </div>
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src={courceImg2}
                  alt="Gallery Item 2"
                />
              </div>
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src={courceImg3}
                  alt="Gallery Item 3"
                />
              </div>
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src={courceImg2}
                  alt="Gallery Item 4"
                />
              </div>
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src={courceImg3}
                  alt="Gallery Item 5"
                />
              </div>
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src={courceImg1}
                  alt="Gallery Item 6"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-2">
              Stay Updated with Our Newsletter
            </h4>
            <p>
              Subscribe to receive the latest news, updates, and exclusive
              offers right in your inbox.
            </p>
            <div
              className="position-relative mx-auto"
              style={{ maxWidth: "400px" }}
            >
              <input
                className="form-control border-0 w-100 py-3 ps-4 pe-5"
                type="text"
                placeholder="Your email"
              />
              <button
                type="button"
                className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-1"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy;{" "}
              <Link
                className="border-bottom"
                to={"/"}
                style={{ textDecoration: "none" }}
              >
                SkillShare Hub
              </Link>
              , All Right Reserved. Designed By{" "}
              <Link
                className="border-bottom"
                to={""}
                style={{ textDecoration: "none" }}
              >
                Kumar Prince
              </Link>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="footer-menu">
                <Link to={"/"} style={{ textDecoration: "none" }}>
                  Home
                </Link>
                <Link to={"/cookies"} style={{ textDecoration: "none" }}>
                  Cookies
                </Link>
                <Link to={"/faq-help"} style={{ textDecoration: "none" }}>
                  FAQs & Help
                </Link>
                {/* <Link to={"/faq-help"}>FQAs</Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
