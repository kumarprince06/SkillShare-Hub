import React from "react";
import ProfileImage from "../../assets/images/images.png";
const ProfileUpdateModal = ({
  handleDeleteImage,
  handleOnChange,
  profileData,
  handleUploadProductImage,
  handleSubmit,
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
        <div className="modal-content">
          <div className="modal-header">
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

          <div className="container overflow-auto">
            <h4 className="modal-title btn-bg rounded p-1 text-center">
              Update Profile
            </h4>
            <div className="bg-white shadow rounded p-2 w-100 max-w-md mx-auto">
              <div className="w-100 text-center mb-2">
                <div
                  className="rounded-circle overflow-hidden d-inline-block"
                  style={{ width: "80px", height: "80px" }}
                >
                  <img
                    src={profileData.profilepic || ProfileImage}
                    alt="Instructor profile"
                    className="img-fluid"
                  />
                </div>
                <form>
                  <label className="mt-0">
                    <span className="btn btn-secondary w-100 mb-0">
                      Upload Profile
                    </span>
                    <input
                      type="file"
                      className="d-none"
                      onChange={handleUploadProductImage}
                    />
                  </label>
                </form>
              </div>
              <form className="space-y-1" onSubmit={handleSubmit}>
                <div className="mb-1">
                  <label className="form-label fw-bolder">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={profileData.name}
                    onChange={handleOnChange}
                    className="form-control input-control"
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label fw-bolder">Designation</label>
                  <input
                    type="text"
                    placeholder="Enter your designation"
                    name="designation"
                    value={profileData.designation}
                    onChange={handleOnChange}
                    className="form-control input-control"
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label fw-bolder">Experience</label>
                  <input
                    type="text"
                    placeholder="Enter your experience"
                    name="experience"
                    value={profileData.experience}
                    onChange={handleOnChange}
                    className="form-control input-control"
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label fw-bolder">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={profileData.email}
                    onChange={handleOnChange}
                    className="form-control input-control"
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label fw-bolder">Contact</label>
                  <input
                    type="text"
                    placeholder="Enter your contact"
                    name="contact"
                    value={profileData.contact}
                    onChange={handleOnChange}
                    className="form-control input-control"
                  />
                </div>
                <div className="modalflex justify-content-around">
                  <div className="m-1">
                    <label className="form-label fw-bolder">LinkedIn Url</label>
                    <input
                      type="text"
                      placeholder="Enter LinkedIn URL"
                      name="linkedinurl"
                      value={profileData.linkedinurl}
                      onChange={handleOnChange}
                      className="form-control input-control"
                    />
                  </div>
                  <div className="m-1">
                    <label className="form-label fw-bolder">Facebook Url</label>
                    <input
                      type="text"
                      placeholder="Enter Facebook URL"
                      name="facebookurl"
                      value={profileData.facebookurl}
                      onChange={handleOnChange}
                      className="form-control input-control"
                    />
                  </div>
                </div>
                <div className="modalflex justify-content-around">
                  <div className="m-1">
                    <label className="form-label fw-bolder">Twitter Url</label>
                    <input
                      type="text"
                      placeholder="Enter Twitter URL"
                      name="twitterurl"
                      value={profileData.twitterurl}
                      onChange={handleOnChange}
                      className="form-control input-control"
                    />
                  </div>
                  <div className="m-1">
                    <label className="form-label fw-bolder">
                      Instagram Url
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Instagram URL"
                      name="instagramurl"
                      value={profileData.instagramurl}
                      onChange={handleOnChange}
                      className="form-control input-control"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={handleDeleteImage}
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
    </div>
  );
};

export default ProfileUpdateModal;
