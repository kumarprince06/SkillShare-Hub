import React from "react";
import '../../assets/style/CustomModal.css'
const UserBioModal = ({handleCloseModal, handleOnChange,handleSubmit, data}) => {
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
              Update Bio
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
                  Bio:
                </label>
                <textarea
                  className="form-control"
                  placeholder="Enter your bio.."
                  id="message-text"
                  defaultValue={""}
                  onChange={handleOnChange}
                  name="bio"
                  value={data?.bio}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-default"
                  data-dismiss="modal"
                  style={{marginLeft: "-5px"}}
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

export default UserBioModal;
