import axiosPublic from "./axiosPublic";

export const saveSurveyData = async (data) => {
  console.log(data);
  const response = await axiosPublic.post("/surveys", data);
  return response.data;
};
