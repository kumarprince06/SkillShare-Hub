import React, { useContext, useEffect, useState } from "react";
import "../assets/style/SignIn.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import SummaryAPI from "../common/API";
import { toast } from "react-toastify";
import context from "../context/Context";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const { userDetail } = useContext(context);
  const [user, setUser] = useState(null);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

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

    // alert("Submit")
    const response = await fetch(SummaryAPI.login.url, {
      method: SummaryAPI.login.method,
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // console.log("result:",result)
    if (result.success) {
      toast.success(result.message);
      userDetail();
      navigate("/");
    }
    if (result.error) {
      toast.error(result.message);
    }
  };

  // console.log("Data", data)

  //Google Authenticaltion Login
  // Google Authentication SignUp
  const GoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
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
            console.log("Google Response: ", res);
            const googleUserData = {
              email: res.data.email,
              password: res.data.id, // You might want to handle password differently
            };

            // Send Google user data to backend
            try {
              const response = await fetch(SummaryAPI.login.url, {
                method: SummaryAPI.login.method,
                headers: {
                  "content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(googleUserData),
              });

              const result = await response.json();
              console.log(result);
              if (result.success) {
                toast.success(result.message);
                userDetail();
                navigate("/");
              } else {
                toast.error(result.message);
              }
            } catch (error) {
              toast.error("An error occurred during registration");
            }
          })
          .catch((err) => console.log(err));
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  // Facebook Authentication SignUp
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
              console.log("Facebook Userdata: ", userData)
              const facebookUserData = {
                email: userData.email,
                password: userData.id, // Use Facebook ID as password
              };

              try {
                const response = await fetch(SummaryAPI.login.url, {
                  method: SummaryAPI.login.method,
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                  body: JSON.stringify(facebookUserData),
                });

                const result = await response.json();
                if (result.success) {
                  toast.success(result.message);
                  userDetail();
                  navigate("/");
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
    <section className="d-flex justify-content-center align-items-center login-section">
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2 className="fw-bolder fs-1 mb-2">Student Login</h2>
            <div className="inputbox">
              <ion-icon name="mail-outline" />
              <input
                type="text"
                name="email"
                value={data.email}
                onChange={handleOnChange}
              />
              <label htmlFor>Username</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline" />
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
              />
              <label htmlFor>Password</label>
            </div>
            <div className="forget">
              <label>
                <input type="checkbox" />
                Remember Me
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button className="fs-5 btn btn-primary fw-bolder">Log in</button>
          </form>
          <div>
            <div className="text-center text-white fw-bolder m-1">Or</div>
            <div className=" d-flex flex-md-row gap-2 mt-2">
              <button
                type="button"
                className="btn btn-facebook d-flex flex-md-row align-items-center justify-content-center m-2"
                onClick={() => handleFacebookLogin()}
              >
                <i className="fab fa-facebook-f me-2" />
                Facebook
              </button>
              <button
                type="button"
                className="btn btn-google d-flex flex-md-row align-items-center justify-content-center m-2"
                onClick={() => login()}
              >
                <i className="fab fa-google me-2" />
                Google
              </button>
            </div>
          </div>
          <div className="register">
            <p>
              Don't have a account? <Link to={"/signup"}>Register</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
