import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "../src/assets/scss/bootstrap.scss";
import { RouterProvider } from "react-router-dom";
import router from "../src/routes/router.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from 'react-redux'
import { store } from "./Store/Store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID} >
    <React.StrictMode>
      <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
    ,
  </GoogleOAuthProvider>
);
