import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import About from "../pages/About";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Cource from "../pages/Course";
import Profile from "../pages/user/Profile";
import UserWebinar from "../pages/user/Webinar";
import UserPanel from "../pages/user/UserPanel";
import Error from "../pages/Error";
import Testimonials from "../pages/Testimonials";
import OurTeams from "../pages/OurTeams";
import COntact from "../pages/COntact";
import Webinar from "../pages/Webinar";
import AdminPanel from "../pages/admin/AdminPanel";
import AdminCourses from "../pages/admin/Courses";
import AdminWebinar from "../pages/admin/Webinar";
import AdminInstructor from "../pages/admin/Instructor";
import CourseDetails from "../pages/CourseDetails";
import MyCourse from "../pages/user/MyCourse";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "about", element: <About /> },
      { path: "courses", element: <Cource /> },
      { path: "contact", element: <COntact /> },
      { path: "login", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "error", element: <Error /> },
      { path: "testimonials", element: <Testimonials /> },
      { path: "team", element: <OurTeams /> },
      { path: "webinar", element: <Webinar /> },
      { path: "course-details/:id", element: <CourseDetails/>},
      {
        path: "admin-account",
        element: <AdminPanel />,
        children: [
          // {path:"", element:<HomePage/>},
          // { path: "profile", element: <AdminProfile /> },
          { path: "webinar", element: <AdminWebinar /> },
          { path: "courses", element: <AdminCourses /> },
          { path: "instructor", element: <AdminInstructor /> },
        ],
      },
      {
        path: "my-account",
        element: <UserPanel />,
        children: [
          { path: "course", element: <MyCourse /> },
          { path: "profile", element: <Profile /> },
          { path: "webinar", element: <UserWebinar /> },
        ],
      },
    ],
  },
]);

export default router;
