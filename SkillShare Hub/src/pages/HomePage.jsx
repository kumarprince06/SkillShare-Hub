import React, { useState, useEffect } from "react";
import "../assets/style/style.css";
import Carousel from "../components/layouts/Carousel";
import Services from "../components/layouts/Services";
import About from "../components/layouts/About";
import CourcesCategory from "../components/courses/CourcesCategory";
import Cources from "../components/courses/Cources";
import Instructor from "../components/Instructor/Instructor";
import Testimonials from "../components/layouts/Testimonials";
import { useSelector } from "react-redux";
import WebinarCard from "../components/webinar/WebinarCard";

const HomePage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const user = useSelector((state)=>state?.user?.user)
  // console.log(user)

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
    <div >
      <Carousel />
      <Services />
      <About />
      {/* <CourcesCategory /> */}
      <Cources />
      <WebinarCard />
      <Instructor/>
      <Testimonials />
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

export default HomePage;
