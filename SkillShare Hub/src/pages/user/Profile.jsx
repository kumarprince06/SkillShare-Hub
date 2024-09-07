import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import ProfileUpdateModal from "../../components/UserModal/ProfileUpdateModal";
import UploadImage from "../../helper/ImageUpload";
import DeleteImage from "../../helper/ImageDelete";
import SummaryAPI from "../../common/API";
import { toast } from "react-toastify";
import context from "../../context/Context";
import UserBioModal from "../../components/UserModal/UserBioModal";
import UserSkillModal from "../../components/UserModal/UserSkillModal";
import UserEducationModal from "../../components/UserModal/UserEducationModal";
import ProfileImg from "../../assets/images/avatar.png";
const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const { userDetail } = useContext(context);
  // console.log(user);
  const [modalActive, setModalActive] = useState(false);
  const [bioModal, SetBioModal] = useState(false);
  const [skillModal, setSkillModal] = useState(false);
  const [eduModal, setEduModal] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [profileData, setProfileData] = useState({
    _id: user?._id,
    name: user?.name,
    designation: user?.designation,
    experience: user?.experience,
    email: user?.email,
    contact: user?.contact,
    profilepic: user?.profilepic,
    facebookurl: user?.facebookurl,
    instagramurl: user?.instagramurl,
    twitterurl: user?.twitterurl,
    linkedinurl: user?.linkedinurl,
    skills: user?.skills || [],
    college: user?.college,
    degree: user?.degree,
    branch: user?.branch,
    passingYear: user?.passingYear,
    bio: user?.bio,
  });
  // console.log("Prpfile Data: ", profileData);

  // Function to handle updating skills
  const handleSkillUpdate = (updatedSkills) => {
    setProfileData((prevData) => ({
      ...prevData,
      skills: updatedSkills, // Update the skills in profileData
    }));

    handleSubmit();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    setModalActive(false);
    setTempImage(null);
    setFormSubmitted(false);
  };

  const handleShowModal = () => {
    setModalActive(true);
  };

  const handleUploadProductImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadImageToCloudinary = await UploadImage(file);
    if (uploadImageToCloudinary && uploadImageToCloudinary.url) {
      setProfileData((prev) => ({
        ...prev,
        profilepic: uploadImageToCloudinary.url,
      }));
      setTempImage(uploadImageToCloudinary);
      console.log("Temporary Image:", tempImage);
    }
  };

  const handleImageDeletion = async () => {
    if (tempImage && !formSubmitted) {
      // console.log("Delete Image API Called after submitting the form");
      alert("Modal Close and deleteing image");
      await DeleteImage(tempImage.public_id);
      alert("Image deleted");
    }
    handleCloseModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryAPI.updateUser.url, {
        method: SummaryAPI.updateUser.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        setFormSubmitted(true);
        handleCloseModal();
        userDetail();
        SetBioModal(false);
        setEduModal(false);
        setSkillModal(false);
      } else if (result.error) {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      if (tempImage) {
        await DeleteImage(tempImage.public_id);
        setTempImage(null);
      }
    }
  };

  //Bio
  const handleBioModal = () => {
    SetBioModal((prev) => !prev);
  };

  const handleEduModal = () => {
    setEduModal((prev) => !prev);
  };

  const handleSkillModal = () => {
    setSkillModal((prev) => !prev);
  };

  return (
    <div className="container">
      <div className="d-flex flex-column position-relative">
        <div className="position-absolute end-0 m-3 ">
          <button
            className="btn wow fadeInRight"
            data-wow-delay="0.2s"
            onClick={handleShowModal}
          >
            <i className="fa-solid fa-2x fa-pen-to-square text-info "></i>
          </button>
        </div>
        <div className="d-flex flex-lg-row flex-column p-5 mx-1 mb-4 justify-content-around  bg-opacity-10 rounded shadow">
          <div className="m-2 w-100">
            <div className="text-center rounded">
              <img
                src={user?.profilepic || ProfileImg}
                className="w-50 mt-xl-3 mt-lg-5 py-2 rounded-circle"
                alt={user?.name}
              />
            </div>
            <div className="w-100 mt-2">
              <ul className="list-unstyled d-flex flex-row justify-content-around mx-lg-5 btn-bg rounded">
                <li className="m-2" style={{ cursor: "pointer" }}>
                  <i class="fa-brands fa-lg fa-lg-lg-2x fa-facebook"></i>
                </li>
                <li className="m-2" style={{ cursor: "pointer" }}>
                  <i class="fa-brands fa-lg fa-lg-lg-2x fa-instagram"></i>
                </li>
                <li className="m-2" style={{ cursor: "pointer" }}>
                  <i class="fa-brands fa-lg fa-lg-lg-2x fa-linkedin-in"></i>
                </li>
                <li className="m-2" style={{ cursor: "pointer" }}>
                  <i class="fa-brands fa-lg fa-lg-lg-2x fa-twitter"></i>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex flex-column w-100 mt-lg-5 mx-2">
            <div className="bg-info d-lg-inline-block py-1-9 px-1-9 px-sm-6 mx-1-9 mb-1-9 rounded  ">
              <h3 className="h2 text-white text-center mb-0">{user?.name}</h3>
              <h6 className="text-secondary text-center">
                {user?.designation}
              </h6>
            </div>

            <div
              className="pl-5 overflow-auto"
              style={{ paddingLeft: "20px", marginTop: "10px" }}
            >
              {" "}
              {/*Add Padding from left*/}
              <ul className="list-unstyled mb-1-9">
                <li className="mb-2 mb-xl-3 display-28">
                  <span className="display-26 text-info fw-bolder me-2 font-weight-600">
                    Designation:
                  </span>
                  {user?.designation}
                </li>
                <li className="mb-2 mb-xl-3 display-28">
                  <span className="display-26 text-info fw-bolder me-2 font-weight-600">
                    Experience:
                  </span>
                  {user?.experience ? (user?.experience+" Years"):(" ")}
                </li>
                <li className="mb-2 mb-xl-3 display-28">
                  <span className="display-26 text-info fw-bolder me-2 font-weight-600">
                    Email:
                  </span>
                  {user?.email}
                </li>
                <li className="mb-2 mb-xl-3 display-28">
                  <span className="display-26 text-info fw-bolder me-2 font-weight-600">
                    Website:
                  </span>
                  {user?.experience ? user?.experience : "-"}
                </li>
                <li className="display-28">
                  <span className="display-26 text-info fw-bolder me-2 font-weight-600">
                    Phone:
                  </span>
                  +91{user?.contact}
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* About Me Scetion */}
        <div className="m-2 py-3 d-flex flex-column">
          <div className="d-flex flex-row justify-content-between">
            <div
              className=" sction-title mx-5 wow fadeInUp mb-0"
              data-wow-delay="0.1s"
            >
              <h6 className="section-title bg-white text-left text-primary px-2 fw-bolder">
                About Me
              </h6>
            </div>
            <div>
              <button
                className="btn"
                data-bs-toggle="modal"
                onClick={handleBioModal}
              >
                <i className="fa-solid fa-pen-to-square text-info"></i>
              </button>
            </div>
          </div>
          <div>
            <p className="fw-bolder">{user?.bio}</p>
          </div>
        </div>
        {/* Skill Section */}
        <div className="m-2 py-3 d-flex flex-column">
          <div className="d-flex flex-row justify-content-between">
            <div className=" sction-title mx-5 mb-0" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-left text-primary px-2 fw-bolder">
                Skills
              </h6>
            </div>
            <div>
              <button
                className="btn"
                data-bs-toggle="modal"
                onClick={handleSkillModal}
              >
                <i className="fa-solid fa-pen-to-square text-info"></i>
              </button>
            </div>
          </div>
          <div>
            {profileData.skills && profileData.skills.length > 0 ? (
              profileData.skills.map((skill, index) => (
                <button
                  key={index}
                  className="btn-bg m-1 rounded p-1 text-center fw-bolder"
                  type="button"
                  disabled // Makes the button non-clickable
                >
                  {skill}
                </button>
              ))
            ) : (
              <p>No skills available</p> // Fallback if no skills are present
            )}
          </div>
        </div>
        {/* Education Section */}
        <div className="m-2 py-3 d-flex flex-column">
          <div className="d-flex flex-row justify-content-between">
            <div className=" sction-title mx-5 mb-0" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-left text-primary px-2 fw-bolder">
                Education
              </h6>
            </div>
            <div>
              <button
                className="btn"
                data-bs-toggle="modal"
                onClick={handleEduModal}
              >
                <i className="fa-solid fa-pen-to-square text-info"></i>
              </button>
            </div>
          </div>
          <div className="mb-2">
            <p className="mb-1">
              <strong>College:</strong> {user?.college}
            </p>
            <p className="mb-1">
              <strong>Degree:</strong> {user?.degree}
            </p>
            <p className="mb-1">
              <strong>Branch:</strong> {user?.branch}
            </p>
            <p className="mb-1">
              <strong>Passing Year:</strong> {user?.passingYear}
            </p>
          </div>
        </div>
      </div>
      {/* Profile Update Modal */}
      {modalActive && (
        <ProfileUpdateModal
          handleDeleteImage={handleImageDeletion}
          handleOnChange={handleOnChange}
          profileData={profileData}
          handleUploadProductImage={handleUploadProductImage}
          handleSubmit={handleSubmit}
        />
      )}
      {
        /* Bio Update Modal */ bioModal && (
          <UserBioModal
            handleCloseModal={handleBioModal}
            handleSubmit={handleSubmit}
            data={profileData}
            handleOnChange={handleOnChange}
          />
        )
      }
      {
        /* Skill Update Modal */ skillModal && (
          <UserSkillModal
            handleCloseModal={handleSkillModal}
            handleSubmit={handleSubmit}
            data={profileData}
            handleOnChange={handleOnChange}
            handleSkillUpdate={handleSkillUpdate}
          />
        )
      }
      {
        /* Education Update Modal */ eduModal && (
          <UserEducationModal
            handleCloseModal={handleEduModal}
            handleSubmit={handleSubmit}
            data={profileData}
            handleOnChange={handleOnChange}
          />
        )
      }
    </div>
  );
};

export default Profile;
