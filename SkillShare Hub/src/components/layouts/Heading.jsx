import React from 'react'

const Heading = ({ title}) => {
  return (
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <h6 className="section-title bg-white text-center text-primary px-2">
        {title}
      </h6>
    </div>
  )
}

export default Heading
