import React from "react";
import "../../assets/style/style.css";
import TestimonialImg1 from "../../assets/images/testimonial-1.jpg";
import TestimonialImg2 from "../../assets/images/testimonial-2.jpg";
import TestimonialImg3 from "../../assets/images/testimonial-3.jpg";
import TestimonialImg4 from "../../assets/images/testimonial-4.jpg";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";

const options = {
  autoplay: true,
  smartSpeed: 1000,
  center: true,
  margin: 24,
  dots: true,
  loop: true,
  nav: true, // Enable navigation
  navText: [
    "<div class='nav-btn prev-slide'>‹</div>",
    "<div class='nav-btn next-slide'>›</div>",
  ], // Custom navigation buttons
  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 2,
    },
    992: {
      items: 3,
    },
  },
};

const Testimonials = () => {
  return (
    //<!-- Testimonial Start -->
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="text-center">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Testimonial
          </h6>
          <h1 className="mb-5">Our Students Say!</h1>
        </div>
        <OwlCarousel
          {...options}
          className="testimonial-carousel position-relative"
        >
          <div className="testimonial-item text-center">
            <img
              className="border rounded-circle p-2 mx-auto mb-3"
              src={TestimonialImg1}
              style={{ width: 80, height: 80 }}
              alt="Client 1"
            />
            <h5 className="mb-0">John Doe</h5>
            <p>Web Developer</p>
            <div className="testimonial-text bg-light text-center p-4">
              <p className="mb-0">
                This platform provided me with the best resources to excel in my
                career. The courses are well-structured and easy to follow.
              </p>
            </div>
          </div>
          <div className="testimonial-item text-center">
            <img
              className="border rounded-circle p-2 mx-auto mb-3"
              src={TestimonialImg2}
              style={{ width: 80, height: 80 }}
              alt="Client 2"
            />
            <h5 className="mb-0">Jane Smith</h5>
            <p>Data Scientist</p>
            <div className="testimonial-text bg-light text-center p-4">
              <p className="mb-0">
                The skill-sharing sessions were incredibly insightful. I gained
                hands-on experience and valuable industry insights.
              </p>
            </div>
          </div>
          <div className="testimonial-item text-center">
            <img
              className="border rounded-circle p-2 mx-auto mb-3"
              src={TestimonialImg3}
              style={{ width: 80, height: 80 }}
              alt="Client 3"
            />
            <h5 className="mb-0">Samuel Green</h5>
            <p>UX Designer</p>
            <div className="testimonial-text bg-light text-center p-4">
              <p className="mb-0">
                I was able to improve my design skills significantly. The
                feedback from peers and instructors was invaluable.
              </p>
            </div>
          </div>
          <div className="testimonial-item text-center">
            <img
              className="border rounded-circle p-2 mx-auto mb-3"
              src={TestimonialImg4}
              style={{ width: 80, height: 80 }}
              alt="Client 4"
            />
            <h5 className="mb-0">Emily White</h5>
            <p>Project Manager</p>
            <div className="testimonial-text bg-light text-center p-4">
              <p className="mb-0">
                The project management course helped me streamline my processes
                and improve team productivity.
              </p>
            </div>
          </div>
        </OwlCarousel>
      </div>
    </div>
    //<!-- Testimonial End -->
  );
};

export default Testimonials;
