import React from "react";
import "../../assets/style/CustomModal.css";

const UserEducationModal = ({
  handleCloseModal,
  handleOnChange,
  handleSubmit,
  data,
}) => {
  return (
    <div
      id="costumModal"
      className="modal fade show wow fadeInDown mt-5"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="costumModalLabel"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title btn-bg rounded p-2 text-center"
              id="exampleModalLabel"
            >
              Update Education
            </h5>
            <button
              type="button"
              className="btn-close btn-danger"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="message-text"
                  className="col-form-label fw-bolder h3"
                >
                  Collge Name
                </label>
                <input
                  className="form-control"
                  placeholder="Enter your college name.."
                  type="text"
                  defaultValue={""}
                  onChange={handleOnChange}
                  name="college"
                  value={data?.college}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="message-text"
                  className="col-form-label fw-bolder h3"
                >
                  Degree
                </label>
                <input
                  className="form-control"
                  placeholder="Enter your degree.. ex: Bachelor of Technology"
                  type="text"
                  defaultValue={""}
                  onChange={handleOnChange}
                  name="degree"
                  value={data?.degree}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="message-text"
                  className="col-form-label fw-bolder h3"
                >
                  Branch
                </label>
                <input
                  className="form-control"
                  placeholder="Enter your branch.. ex: Computer Science & Engineering"
                  type="text"
                  defaultValue={""}
                  onChange={handleOnChange}
                  name="branch"
                  value={data?.branch}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="message-text"
                  className="col-form-label fw-bolder h3"
                >
                  Passing Year
                </label>
                <input
                  className="form-control"
                  placeholder="Enter your passing year.."
                  type="text"
                  defaultValue={""}
                  onChange={handleOnChange}
                  name="passingYear"
                  value={data?.passingYear}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-default"
                  data-dismiss="modal"
                  style={{ marginLeft: "-5px" }}
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button className="btn btn-bg" type="submit">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEducationModal;
