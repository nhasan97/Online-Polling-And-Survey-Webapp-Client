import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import CreateSurvey from "../pages/Dashboard/CreateSurvey";
import DisplaySurveys from "../pages/Dashboard/DisplaySurveys";
import PrivateRoute from "./PrivateRoute";
import SurveyorRoute from "./SurveyorRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <SurveyorRoute>
              <DisplaySurveys></DisplaySurveys>
            </SurveyorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "create-survey",
        element: <CreateSurvey></CreateSurvey>,
      },
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;
