import React, { useState, useEffect } from "react";
import "../assets/style/SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import SummaryAPI from "../common/API";
import { toast } from "react-toastify";
import {  useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    profilepic: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState(null);
  const [facebookUser, setFacebookUser] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sending data to the backend
    try {
      const response = await fetch(SummaryAPI.register.url, {
        method: SummaryAPI.register.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      if (result.success) {
        toast.success(result.message);
        navigate("/login");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred during registration");
    }
  };

  // Google Authentication SignUp
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          console.log("Google Response: ", res)
          const googleUserData = {
            name: res.data.name,
            email: res.data.email,
            contact: "", // You might want to add a field for contact if required
            password: res.data.id, // You might want to handle password differently
            profilepic: res.data.picture,
          };

          // Send Google user data to backend
          try {
            const response = await fetch(SummaryAPI.register.url, {
              method: SummaryAPI.register.method,
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(googleUserData),
            });

            const result = await response.json();
            console.log(result);
            if (result.success) {
              toast.success(result.message);
              navigate("/login");
            } else {
              toast.error(result.message);
            }
          } catch (error) {
            toast.error("An error occurred during registration");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);


  // Facebook Authentication SignUp
  const handleFacebookResponse = async (response) => {
    if (response.accessToken) {
      const facebookUserData = {
        name: response.name,
        email: response.email,
        contact: "", // You might want to add a field for contact if required
        password: "", // You might want to handle password differently
      };

      // Send Facebook user data to backend
      try {
        const response = await fetch(SummaryAPI.register.url, {
          method: SummaryAPI.register.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(facebookUserData),
        });

        const result = await response.json();
        console.log(result);
        if (result.success) {
          toast.success(result.message);
          navigate("/login");
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("An error occurred during registration");
      }
    }
  };

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="logiform-container py-4">
          <div className="flex-container d-flex flex-wrap justify-content-center bg-light p-0">
            <div className="column d-block p-3 p-md-4 p-lg-5 getstarted-col">
              <div className="d-flex gap-4 content p-3 px-md-4 py-md-5 px-lg-5 child-w-100 flex-wrap position-relative h-100 align-items-center">
                <div className="back-arrow position-relative">
                  <button className="btn btn-semitransparent rounded-pill py-0 px-4 py-lg-2 px-lg-5">
                    <i className="fas fa-arrow-right-long text-white" />
                  </button>
                </div>
                <div className="text-content position-relative">
                  <span className="text-secondary2">Hi Welcome!</span>
                  <h2 className="text-white">Let's Get Started</h2>
                  <p className="text-secondary2 mt-4">
                    Create free account and get free access of full features for
                    7 days. We invite you to join us and get better experience.
                  </p>
                </div>
                <div className="content-icon position-relative">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/06/15/16/16/man-1459246_1280.png"
                    alt="Icon"
                    className="w-100"
                  />
                </div>
              </div>
            </div>
            <div className="column d-block p-3 d-flex align-items-center justify-content-center h-100">
              <div className="content">
                <div className="form-wrapper py-4">
                  <h2 className="mb-2">Sign Up</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-input mb-2 p-0">
                      <label htmlFor="yourName" className="text-secondary">
                        Your Name
                      </label>
                      <div className="input-relative position-relative mt-1 mt-lg-2">
                        <input
                          type="text"
                          className="default-input rounded-pill py-1 ps-3 py-lg-2 input-required"
                          name="name"
                          onChange={handleOnChange}
                          value={data.name}
                          id="yourName"
                          maxLength={20}
                        />
                      </div>
                    </div>
                    <div className="form-input mb-2 p-0">
                      <label htmlFor="yourEmail" className="text-secondary">
                        Your Email
                      </label>
                      <div className="input-relative position-relative mt-1 mt-lg-2">
                        <input
                          type="text"
                          className="default-input rounded-pill py-1 ps-3 py-lg-2 input-required"
                          name="email"
                          id="yourEmail"
                          onChange={handleOnChange}
                          value={data.email}
                          maxLength={40}
                        />
                      </div>
                    </div>
                    <div className="form-input mb-2 p-0">
                      <label htmlFor="yourEmail" className="text-secondary">
                        Your Contact
                      </label>
                      <div className="input-relative position-relative mt-1 mt-lg-2">
                        <input
                          type="text"
                          className="default-input rounded-pill py-1 ps-3 py-lg-2 input-required"
                          name="contact"
                          id="yourcontact"
                          onChange={handleOnChange}
                          value={data.contact}
                          maxLength={10}
                        />
                      </div>
                    </div>
                    <div className="form-input mb-2 p-0">
                      <label htmlFor="yourPassword" className="text-secondary">
                        Your Password
                      </label>
                      <div className="input-relative position-relative mt-1 mt-lg-2">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="default-input rounded-pill py-1 ps-3 py-lg-2 input-required"
                          name="password"
                          id="yourPassword"
                          onChange={handleOnChange}
                          value={data.password}
                          maxLength={40}
                        />
                        <div
                          id="showPassword"
                          className="show-password"
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? (
                            <i className="fas fa-eye-slash"></i>
                          ) : (
                            <i className="fas fa-eye"></i>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-check mb-2 p-0">
                      <input
                        type="checkbox"
                        name="rememberme"
                        id="rememberMe"
                      />
                      <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <div className="form-submit">
                      <button
                        id="btnCreateAccount"
                        type="submit"
                        className="btn btn-success w-100 rounded-pill py-lg-2 mt-1 mt-lg-2"
                      >
                        Create Account
                      </button>
                    </div>
                  </form>
                  <div className="other-options-signup text-center py-3">
                    <span className="text-dark">Or</span>
                    <div className="signup-options-list d-flex flex-wrap gap-2 mt-2">
                      <button className="btn border rounded-pill py-lg-2 social-btn">
                        <i className="fab fa-facebook icon-fb"></i>
                        Signup with Facebook
                      </button>
                      <button className="btn border rounded-pill py-lg-2 social-btn" onClick={() => login()}>
                        <i className="fab fa-google icon-google"></i>
                        Signup with Google
                      </button>
                    </div>
                  </div>
                  <div className="have-account-option text-center mt-2">
                    <p>
                      Already have an account?
                      <Link to={"/login"} className="text-decoration-none">
                        {" "}
                        Log in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
