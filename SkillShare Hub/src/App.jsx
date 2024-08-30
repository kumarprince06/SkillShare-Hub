import { Outlet } from "react-router-dom";
import "./App.css";
import Headers from "./components/layouts/Headers";
import Footer from "./components/layouts/Footer";
import Spinners from "./components/layouts/Spinners";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import context from "./context/Context";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./Store/UserSlice";
import SummaryAPI from "./common/API";
function App() {
  const [loading, setLoading] = useState(true);

  // Simulate a loading process (e.g., fetching data)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const dispatch = useDispatch();
  // const user = useSelector((state) => state?.user?.user);

  const userDetail = async () => {
    const dataApi = await fetch(SummaryAPI.userDetail.url, {
      method: SummaryAPI.userDetail.method,
      credentials: "include",
    });

    const ApiResponse = await dataApi.json();

    // console.log("User Data API Response ", ApiResponse.data)
    if (ApiResponse.success) {
      dispatch(setUserDetails(ApiResponse.data));
    }
  };

  useEffect(() => {
    //UserDetails
    userDetail();
  });

  return (
    <>
      {loading && <Spinners />}
      <context.Provider
      value={{
        userDetail, //User Data
      }}
      >
        <ToastContainer position="top-center" />
        <Headers />
        <main>
          <Outlet  />
        </main>
        <Footer />
      </context.Provider>
    </>
  );
}

export default App;
