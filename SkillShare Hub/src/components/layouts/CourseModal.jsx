import React from "react";
import "../../assets/style/style.css";
import ProfileImage from "../../assets/images/images.png";
import CourseLevel from "../../helper/CourseLevel";
import CourseCategory from "../../helper/CourseCategory";

const CourseModal = ({
  title,
  handleOnChange,
  data,
  hanldeUploadImage,
  handleDeleteImage,
  handleSubmit,
  button
}) => {
  return (
    <div
      id="costumModal"
      className="modal fade show wow fadeInDown"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="costumModalLabel"
      // aria-hidden="true"
      style={{ display: "block" }}
    >
      <div className="modal-dialog">
        <div className="modal-content relative">
          <div className="modal-header">
            <h4
              className="modal-title btn-bg rounded p-1"
              style={{ margin: "0 auto" }}
            >
              {title}
            </h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "24px",
                backgroundColor: "red",
              }}
              onClick={handleDeleteImage}
            >
              <i className="fa fa-close"></i>
            </button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="bg-white shadow rounded p-2 w-100 max-w-md mx-auto">
                <div className="w-100 text-center mb-2 position-relative">
                  <div
                    className="rounded-circle overflow-hidden mx-auto position-relative d-inline-block"
                    style={{ width: "96px", height: "96px" }}
                  >
                    <img
                      src={data?.image || ProfileImage}
                      alt="Instructor profile"
                      className="img-fluid w-100 h-100"
                    />
                  </div>
                  <form>
                    <label
                      className="position-absolute bottom-0 text-center cursor-pointer"
                      style={{ marginLeft: "-47px" }}
                    >
                      <div
                        className="text-xs bg-primary text-white text-bolder bg-opacity-10 py-2"
                        style={{
                          borderBottomLeftRadius: "100%",
                          borderBottomRightRadius: "100%",
                          borderTopLeftRadius: "75%",
                          borderTopRightRadius: "75%",
                          overflow: "hidden",
                          marginTop: "-10px",
                          cursor: "pointer"
                        }}
                      >
                        Upload Image
                      </div>
                      <input
                        type="file"
                        className="d-none"
                        onChange={hanldeUploadImage}
                      />
                    </label>
                  </form>
                </div>
                <form className="space-y-1" onSubmit={handleSubmit}>
                  <div className="mb-1">
                    <label className="form-label fw-bolder">Course Name</label>
                    <input
                      type="text"
                      placeholder="Enter course name"
                      name="name"
                      value={data.name}
                      onChange={handleOnChange}
                      className="form-control input-control"
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label fw-bolder">
                      Course Description
                    </label>
                    <input
                      type="text"
                      placeholder="Enter course description"
                      name="description"
                      value={data.description}
                      onChange={handleOnChange}
                      className="form-control input-control"
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label fw-bolder">
                      Course Duration
                    </label>
                    <input
                      type="text"
                      placeholder="Enter course duration"
                      name="duration"
                      value={data.duration}
                      onChange={handleOnChange}
                      className="form-control input-control"
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label fw-bolder">
                      No. of Lecture
                    </label>
                    <input
                      type="text"
                      placeholder="Enter course lecture"
                      name="lecture"
                      value={data.lecture}
                      onChange={handleOnChange}
                      className="form-control input-control"
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label fw-bolder">Course Level</label>
                    <select
                      type="text"
                      placeholder="Enter course level"
                      name="level"
                      value={data.level}
                      onChange={handleOnChange}
                      className="form-control input-control"
                    >
                      <option value={""}>Select Level </option>
                      {CourseLevel.map((level, index) => (
                        <option value={level.value} key={level.value + index}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-1">
                    <label className="form-label fw-bolder">
                      Course Language
                    </label>
                    <input
                      type="text"
                      placeholder="Enter course language"
                      name="language"
                      value={data.language}
                      onChange={handleOnChange}
                      className="form-control input-control"
                    />
                  </div>
                  <div className="m-1">
                    <label className="form-label fw-bolder">Course Price</label>
                    <input
                      type="text"
                      placeholder="Enter course price"
                      name="price"
                      value={data.price}
                      onChange={handleOnChange}
                      className="form-control input-control"
                    />
                  </div>
                  <div className="m-1">
                    <label className="form-label fw-bolder">
                      Course Category
                    </label>
                    <select
                      type="text"
                      name="category"
                      value={data.category}
                      onChange={handleOnChange}
                      className="form-control input-control scrollable-select"
                    >
                      <option value={""}>Select Category </option>
                      {CourseCategory.map((category, index) => (
                        <option
                          value={category.value}
                          key={category.value + index}
                        >
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="m-1">
                    <label className="form-label fw-bolder">
                      Instructor Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter instructor name"
                      name="instructorName"
                      value={data.instructorName}
                      onChange={handleOnChange}
                      className="form-control input-control"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-default"
                      data-dismiss="modal"
                      onClick={handleDeleteImage}
                      // onClick={handleCloseModal}
                    >
                      Close
                    </button>
                    <button className="btn btn-bg" type="submit">
                      {button}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
