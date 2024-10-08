import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SummaryAPI from "../../common/API";
import Heading from "../../components/layouts/Heading";
import { Link } from "react-router-dom";

const MyCourse = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 2; // Number of items per page

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryAPI.getEnrollCourse.url, {
        method: SummaryAPI.getEnrollCourse.method,
        credentials: "include",
      });

      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        toast.error(result.message || "Failed to load courses");
      }
    } catch (error) {
      toast.error("An error occurred while fetching courses.");
    } finally {
      setLoading(false); // Set loading to false after the fetch is complete
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1).toLowerCase();
  };

  // Calculate the data to be displayed on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className="text-center p-2">
        <Heading title={"My Learning"} />
      </div>
      {loading ? ( // Show spinner while loading
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : currentData.length > 0 ? (
        <>
          {currentData.map((course, index) => (
            <Link
              className="bg-info rounded bg-opacity-10 p-1 m-2 w-100 wow fadeINLeft d-block text-dark"
              data-wow-delay="0.1s"
              key={index}
              to={`/course-details/${course?.courseId?._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="d-flex flex-md-row flex-column m-2">
                <div className="w-lg-25 w-sm-100 flex-lg-none flex-10 m-1 ">
                  <img
                    src={course?.courseId?.image}
                    className="img-fluid rounded"
                    style={{
                      width: "150px",
                      height: "150px",
                      mixBlendMode: "multiply",
                    }}
                    alt={course?.name}
                  />
                </div>
                <div className="w-lg-75 w-100 px-lg-5 px-0">
                  <h6
                    className="fw-bolder"
                    style={{
                      width: "100%",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {course?.courseId?.name || "No Title Available"}
                  </h6>
                  <p className="capitalize">
                    <strong>Level & Language:</strong>{" "}
                    {capitalizeFirstLetter(course?.courseId?.level) +
                      " & " +
                      course?.courseId?.language}
                  </p>
                  <p>
                    <strong>Instructor:</strong>{" "}
                    {course?.courseId?.instructorName || "N/A"}
                  </p>
                  <p>
                    <strong>Duration:</strong>{" "}
                    {course?.courseId?.duration + " Hours" || "N/A"}
                  </p>
                  <p>
                    <strong>No. of Lecture:</strong>{" "}
                    {course?.courseId?.lecture || "N/A"}
                  </p>
                  <p>
                    <strong>Payment Status:</strong>{" "}
                    {capitalizeFirstLetter(course?.status) || "N/A"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          {/* Pagination Controls */}
          <div className="pagination-controls text-center mt-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-primary mx-1"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-primary mx-1"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="bg-info bg-opacity-25 rounded text-center py-3 fw-bolder fs-4 text-dark">
          No Course Enrolled yet..!
        </div>
      )}
    </div>
  );
};

export default MyCourse;
