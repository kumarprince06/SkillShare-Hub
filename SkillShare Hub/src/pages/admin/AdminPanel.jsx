import React, { useEffect, useState } from "react";
import "../../assets/style/Profile.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../Store/UserSlice";
import SummaryAPI from "../../common/API";
import { toast } from "react-toastify";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const [isSidebarActive, setSidebarActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(setUserDetails(storedUser));
    } else {
      navigate("/error");
    }
  }, [dispatch, navigate]);

  const toggleSidebar = () => {
    setSidebarActive(!isSidebarActive);
  };

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryAPI.logout.url, {
      method: SummaryAPI.logout.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  if (user === null) {
    return null; // Render nothing while the user state is being checked
  }

  return (
    <div className="wrapper d-flex align-items-stretch">
      <nav id="sidebar" className={isSidebarActive ? "active " : ""}>
        <div className="custom-menu">
          <button
            type="button"
            id="sidebarCollapse"
            className="btn btn-primary"
            onClick={toggleSidebar}
          >
            <i className="fa fa-bars"></i>
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
        <div className="p-4 mt-5" data-wow-delay="0.3s">
          <h1 className="wow fadeInUp">
            <Link to={"dashboard"} className="logo ">
              ADMIN
            </Link>
          </h1>
          <ul className="list-unstyled components mb-5 mt-5 wow fadeInLeft">
            {/* <li>
              <Link to={"profile"}>
                <span className="fa fa-user mr-3"></span> Profile
              </Link>
            </li> */}
            <li>
              <Link to={"webinar"}>
                <span className="fa fa-briefcase mr-3"></span> Webinar
              </Link>
            </li>
            <li>
              <Link to={"courses"}>
                <span className="fa-solid fa-book-open-reader mr-3"></span>{" "}
                Courses
              </Link>
            </li>
            <li>
              <Link to={"instructor"}>
                <span className="fa-solid fa-person-chalkboard mr-3"></span>{" "}
                Instructor
              </Link>
            </li>
            <li>
              <Link to={"#"} onClick={handleLogout}>
                <span className="fa fa-sign-out mr-3"></span> Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div id="content" className="p-4 p-md-5 pt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
