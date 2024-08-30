import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../assets/style/style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Context from "../../context/Context";
import SummaryAPI from "../../common/API";
import { setUserDetails } from "../../Store/UserSlice";
import { toast } from "react-toastify";

const Headers = () => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const [sticky, setSticky] = useState(false);
  const [ariaExpandMore, setAriaExpandMore] = useState(false);
  const [ariaExpandUser, setAriaExpandUser] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const context = useContext(Context);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryAPI.logout.url, {
      method: SummaryAPI.logout.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      await dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleNavbarToggle = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  const handleNavLinkClick = () => {
    setIsNavbarCollapsed(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDropdownToggleMore = () => {
    if (window.innerWidth <= 770) {
      setAriaExpandMore(!ariaExpandMore);
      setAriaExpandUser(false); // Close user dropdown if More dropdown is toggled
    }
  };

  const handleDropdownToggleUser = () => {
    if (window.innerWidth <= 770) {
      setAriaExpandUser(!ariaExpandUser);
      setAriaExpandMore(false); // Close More dropdown if user dropdown is toggled
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0 ${
        sticky ? "sticky" : ""
      }`}
    >
      <Link
        to="/"
        className="navbar-brand d-flex align-items-center px-4 px-lg-5"
      >
        <h2 className="m-0">
          <i className="fa fa-book me-3"></i>
          SkillShare Hub
        </h2>
      </Link>
      <button
        className="navbar-toggler me-4"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded={!isNavbarCollapsed}
        aria-label="Toggle navigation"
        onClick={handleNavbarToggle}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse ${
          isNavbarCollapsed ? "" : "show"
        }`}
        id="navbarCollapse"
      >
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <Link
            to="/"
            className="nav-item nav-link active"
            onClick={handleNavLinkClick}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="nav-item nav-link"
            onClick={handleNavLinkClick}
          >
            About
          </Link>
          <Link
            to="/courses"
            className="nav-item nav-link"
            onClick={handleNavLinkClick}
          >
            Courses
          </Link>
          <div className="nav-item dropdown">
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              id="navbarDropdownMore"
              role="button"
              aria-expanded={ariaExpandMore}
              onClick={handleDropdownToggleMore}
            >
              More
            </Link>
            <ul
              className={`dropdown-menu fade-down m-0 ${
                ariaExpandMore ? "show" : ""
              }`}
              aria-labelledby="navbarDropdownMore"
              data-bs-popper="none"
            >
              <li>
                <Link
                  to="/webinar"
                  className="dropdown-item"
                  onClick={handleNavLinkClick}
                >
                  Webinar
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="dropdown-item"
                  onClick={handleNavLinkClick}
                >
                  Instructors
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  className="dropdown-item"
                  onClick={handleNavLinkClick}
                >
                  Testimonial
                </Link>
              </li>
            </ul>
          </div>
          <Link
            to="/contact"
            className="nav-item nav-link"
            onClick={handleNavLinkClick}
          >
            Contact
          </Link>
        </div>
        {user?._id ? (
          <div className="nav-item btn-bg dropdown py-4 px-lg-5 d-lg-block">
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              id="navbarDropdownUser"
              role="button"
              aria-expanded={ariaExpandUser}
              onClick={handleDropdownToggleUser}
            >
              <i className="fa-solid fa-user-large"></i>
            </Link>
            <ul
              className={`dropdown-menu fade-down m-0 ml-4 ${
                ariaExpandUser ? "show" : ""
              }`}
              aria-labelledby="navbarDropdownUser"
            >
              <li>
                <Link
                  to={`${
                    user?.role === "ADMIN"
                      ? "/admin-account/webinar"
                      : "my-account/profile"
                  }`}
                  className="dropdown-item"
                  onClick={handleNavLinkClick}
                >
                  My Account
                </Link>
              </li>
              <li>
                <div className="dropdown-item logout" onClick={handleLogout}>
                  Logout
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-bg py-4 px-lg-5 d-sm-block d-lg-block"
            style={{ borderRadius: "0" }}
            onClick={handleNavLinkClick}
          >
            
            Join Now<i className="fa fa-arrow-right ms-3" ></i>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Headers;
