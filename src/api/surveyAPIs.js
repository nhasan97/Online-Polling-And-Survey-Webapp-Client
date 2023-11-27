import axiosPublic from "./axiosPublic";

export const saveSurveyData = async (data) => {
  console.log(data);
  const response = await axiosPublic.post("/surveys", data);
  return response.data;
};

export const getSurveyData = async () => {
  const response = await axiosPublic.get("/surveys");
  return response.data;
};

export const getUserBasedSurveyData = async (email) => {
  const response = await axiosPublic.get(`/surveys?email=${email}`);
  return response.data;
};
