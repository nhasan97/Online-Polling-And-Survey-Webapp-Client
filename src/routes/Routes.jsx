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
import Surveys from "../pages/Surveys/Surveys";
import SurveyDetails from "../pages/SurveyDetails";
import AdminSurveyorRoute from "./AdminSurveyorRoute";
import SurveyResponses from "../pages/Dashboard/SurveyResponses";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import AdminRoute from "./AdminRoute";
import ManageSurveys from "../pages/Dashboard/ManageSurveys";
import ProPayment from "../pages/ProPayment";
import ManagePayments from "../pages/Dashboard/ManagePayments";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/surveys",
        element: <Surveys></Surveys>,
      },
      {
        path: "/survey-detail/:_id",
        element: <SurveyDetails></SurveyDetails>,
      },
      {
        path: "/pro",
        element: <ProPayment></ProPayment>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "display-surveys",
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
        element: (
          <PrivateRoute>
            <SurveyorRoute>
              <CreateSurvey></CreateSurvey>
            </SurveyorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "create-survey",
        element: (
          <PrivateRoute>
            <SurveyorRoute>
              <CreateSurvey></CreateSurvey>
            </SurveyorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "survey-response/:_id",
        element: (
          <PrivateRoute>
            <AdminSurveyorRoute>
              <SurveyResponses></SurveyResponses>
            </AdminSurveyorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-surveys",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageSurveys></ManageSurveys>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManagePayments></ManagePayments>
            </AdminRoute>
          </PrivateRoute>
        ),
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
