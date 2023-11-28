import axiosPublic from "./axiosPublic";

export const saveSurveyPreference = async (data) => {
  console.log(data);
  const response = await axiosPublic.post("/survey-preferences", data);
  return response.data;
};
