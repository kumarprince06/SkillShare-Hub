import React, { useState, useEffect } from "react";
import Select  from "react-select";
import skillOptions from "../../helper/SkillList";

const UserSkillModal = ({
  handleCloseModal,
  handleSubmit,
  data,
  handleSkillUpdate,
}) => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Function to handle the change in selected skills
  const handleChange = (selectedOptions) => {
    const skillValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    handleSkillUpdate(skillValues)
  };

  // console.log(data?.skills)
   // Set initial selected skills from props when the component loads
   useEffect(() => {
    if (data.skills && data.skills.length > 0) {
      const formattedSkills = data.skills.map(skill => ({
        label: skill,
        value: skill,
      }));
      setSelectedSkills(formattedSkills.map(skill => skill.value));
    }
  }, [data.skills]);

  return (
    <div
      id="costumModal"
      className="modal fade show wow fadeInDown mt-5"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="costumModalLabel"
      aria-hidden="true"
      style={{ display: "block", height: "600px" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title btn-bg rounded p-2 text-center"
              id="exampleModalLabel"
            >
              Update Skill
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
                <label htmlFor="skills" className="col-form-label fw-bolder h3">
                  Skills
                </label>
                <Select
                  isMulti
                  name={"skills"}
                  options={skillOptions} // The options for the dropdown
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleChange}
                  value={selectedSkills.map(skill => ({
                    label: skill,
                    value: skill,
                  }))}
                  // displayValue="label" // Display the label in the dropdown
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

export default UserSkillModal;
