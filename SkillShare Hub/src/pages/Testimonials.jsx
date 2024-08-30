import React, { useEffect, useState } from "react";
import Testimonial from "../components/layouts/Testimonials";
import Breadscrumb from "../components/layouts/Breadscrumb";

const Testimonials = () => {
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
      behavior: "smooth", // Ensures smooth scrolling
    });
  };
  return (
    <div>
      {/* BreadsCrum */}
      <Breadscrumb heading={"Testimonial"} />
      {/* Breadscrumb ends */}
      <Testimonial />
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

export default Testimonials;
