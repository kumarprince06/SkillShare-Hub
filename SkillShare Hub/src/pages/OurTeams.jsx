import React, { useEffect, useState } from "react";
import Instructor from "../components/Instructor/Instructor";
import Breadscrumb from "../components/layouts/Breadscrumb";

const OurTeams = () => {
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
      <Breadscrumb heading={"Our Team"} />

      {/* Breadscrumb ends */}
      <Instructor />
      {/* <Instructor /> */}
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

export default OurTeams;
