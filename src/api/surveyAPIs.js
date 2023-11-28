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
  const response = await axiosPublic.patch(
    `/surveys/${obj._id}`,
    obj.updatedSurvey
  );
  return response.data;
};

export const getSurvey = async (_id) => {
  const response = await axiosPublic.get(`/surveys/${_id._id}`);
  return response.data;
};

export const saveSurveyResponse = async (data) => {
  console.log(data);
  const response = await axiosPublic.post("/survey-responses", data);
  return response.data;
};

export const getAllResponses = async () => {
  const response = await axiosPublic.get("/survey-responses");
  return response.data;
};

export const getSingleSurveyResponses = async (_id) => {
  const response = await axiosPublic.get(`/survey-responses/${_id._id}`);
  return response.data;
};
