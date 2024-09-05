import React, { useContext, useEffect, useState } from "react";
import "../assets/style/SignIn.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import SummaryAPI from "../common/API";
import { toast } from "react-toastify";
import context from "../context/Context";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import FacebookLogin from "react-facebook-login";

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
  const handleFacebookResponse = async (response) => {
    // alert("Facebook Response:", response)
    if (response.accessToken) {
      const facebookUserData = {
        email: response.email,
        password: response.id,
      };

      try {
        const response = await fetch(SummaryAPI.login.url, {
          method: SummaryAPI.login.method,
          headers: {
            "content-type": "application/json",
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
              <FacebookLogin
                appId={import.meta.env.VITE_APP_FACEBOOK_APP_ID}
                autoLoad={false}
                fields="name,email,picture"
                cssClass="btn btn-facebook rounded-pill py-2 px-2 px-lg-2 m-2"
                callback={handleFacebookResponse}
                icon={<i className="fab fa-facebook-f me-2" />}
                textButton="Facebook"
              />
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
