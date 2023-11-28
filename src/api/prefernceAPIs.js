import axiosPublic from "./axiosPublic";

export const saveSurveyPreference = async (data) => {
  console.log(data);
  const response = await axiosPublic.post("/survey-preferences", data);
  return response.data;
};

export const getSingleSurveyPreferences = async (_id) => {
  const response = await axiosPublic.get(`/survey-preferences/${_id._id}`);
  return response.data;
};
