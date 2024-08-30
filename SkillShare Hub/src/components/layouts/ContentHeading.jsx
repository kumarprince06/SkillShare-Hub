import React from "react";
import "../../assets/style/style.css";

const ContentHeading = ({ title, heading }) => {
  return (
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <h6 className="section-title bg-white text-center text-primary px-3">
        {title}
      </h6>
      <h1 className="mb-5">{heading}</h1>
    </div>
  );
};

export default ContentHeading;
