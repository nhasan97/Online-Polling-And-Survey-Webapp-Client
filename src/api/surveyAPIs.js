import axiosPublic from "./axiosPublic";
import axiosSecure from "./axiosSecure";

export const saveSurveyData = async (data) => {
  const response = await axiosPublic.post("/surveys", data);
  return response.data;
};

export const getSurveyData = async () => {
  const response = await axiosPublic.get("/surveys");
  return response.data;
};

export const getUserBasedSurveyData = async (email) => {
  const response = await axiosSecure.get(`/user-surveys?email=${email}`);
  return response.data;
};

export const updateSurveyData = async (obj) => {
  const response = await axiosSecure.patch(
    `/surveys/${obj._id}`,
    obj.updatedSurvey
  );
  return response.data;
};

export const deleteSurveyData = async (_id) => {
  const response = await axiosSecure.delete(`/surveys/${_id._id}`);
  return response.data;
};

export const getSurvey = async (_id) => {
  const response = await axiosPublic.get(`/surveys/${_id._id}`);
  return response.data;
};

export const updateSurveyStatus = async (obj) => {
  console.log(obj);
  const { data } = await axiosSecure.patch(
    `/surveys/update-status/${obj?._id}`,
    obj?.updatedSurvey
  );

  return data;
};
