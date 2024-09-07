import React, { useState, useEffect } from "react";
import "../assets/style/SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import SummaryAPI from "../common/API";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    profilepic: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(SummaryAPI.register.url, {
        method: SummaryAPI.register.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
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
          const googleUserData = {
            name: res.data.name,
            email: res.data.email,
            contact: "",
            password: res.data.id,
            profilepic: res.data.picture,
          };

          try {
            const response = await fetch(SummaryAPI.register.url, {
              method: SummaryAPI.register.method,
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(googleUserData),
            });

            const result = await response.json();
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
  useEffect(() => {
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
  
      // Move fbAsyncInit initialization here after the SDK is loaded
      js.onload = function () {
        window.fbAsyncInit = function () {
          window.FB.init({
            appId: import.meta.env.VITE_APP_FACEBOOK_APP_ID, // Your Facebook App ID
            cookie: true,
            xfbml: true,
            version: "v16.0",
          });
        };
      };
    })(document, "script", "facebook-jssdk");
  }, []);
  const handleFacebookLogin = () => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          window.FB.api(
            "/me",
            { fields: "name,email,picture" },
            async (userData) => {
              const facebookUserData = {
                name: userData.name,
                email: userData.email,
                contact: "",
                password: userData.id, // Use Facebook ID as password
                profilepic: userData.picture.data.url,
              };

              try {
                const response = await fetch(SummaryAPI.register.url, {
                  method: SummaryAPI.register.method,
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(facebookUserData),
                });

                const result = await response.json();
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
          );
        } else {
          toast.error("Facebook login failed or cancelled.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <div className="mainContainer">
      <div className="container signup-container">
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
                    Create a free account and get free access to full features
                    for 7 days. We invite you to join us and get a better
                    experience.
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
                  <h2 className="mb-2 fw-bolder display-4 text-center">
                    Sign Up
                  </h2>
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
                      <label htmlFor="yourContact" className="text-secondary">
                        Your Contact
                      </label>
                      <div className="input-relative position-relative mt-1 mt-lg-2">
                        <input
                          type="text"
                          className="default-input rounded-pill py-1 ps-3 py-lg-2 input-required"
                          name="contact"
                          id="yourContact"
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
                        />
                        <button
                          type="button"
                          className="btn btn-link position-absolute"
                          style={{
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <i class="fa-solid fa-eye-slash"></i>
                          ) : (
                            <i class="fa-solid fa-eye"></i>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="form-input mb-3 p-0 text-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary rounded-pill fw-bolder fs-4 px-4 w-100"
                      >
                        Sign Up
                      </button>
                    </div>
                    <div className="text-center my-2">
                      <span className="text-secondary">Or Sign Up with</span>
                    </div>
                    <div className="d-flex flex-md-row justify-content-center align-items-center">
                      <button
                        type="button"
                        className="btn btn-google d-flex flex-md-row align-items-center justify-content-center m-2"
                        onClick={() => login()}
                      >
                        <i className="fab fa-google me-2" />
                        Google
                      </button>
                      <button
                        type="button"
                        className="btn btn-facebook d-flex flex-md-row align-items-center justify-content-center m-2"
                        onClick={() => handleFacebookLogin()}
                      >
                        <i className="fab fa-facebook-f me-2" />
                        Facebook
                      </button>
                    </div>
                    <div className="text-center mt-4">
                      <span className="text-secondary">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="text-primary text-decoration-none"
                        >
                          Login
                        </Link>
                      </span>
                    </div>
                  </form>
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
