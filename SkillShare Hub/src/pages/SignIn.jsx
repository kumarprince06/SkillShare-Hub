import React, { useContext, useEffect, useState } from "react";
import "../assets/style/SignIn.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import SummaryAPI from "../common/API";
import { toast } from "react-toastify";
import context from "../context/Context";
import {  useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';

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
      onSuccess: (codeResponse) =>{ 
        setUser(codeResponse)
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
  
    // useEffect(() => {
      
    // }, [user]);

  return (
    <section className="d-flex justify-content-center align-items-center login-section">
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2 className="fw-bolder fs-3">Student Login</h2>
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
            <button>Log in</button>
          </form>
          <div>
            <div className="text-center text-white fw-bolder m-1">Or</div>
            <div className=" d-flex flex-row flex-wrap gap-2 mt-2">
              <button>
                <i className="fab fa-facebook icon-fb"></i>
                Login with Facebook
              </button>
              <button onClick={() => GoogleLogin()}>
                <i className="fab fa-google icon-google"></i>
                Login with Google
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
