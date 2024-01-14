import axiosPublic from "./axiosPublic";

export const saveSurveyComment = async (data) => {
  console.log(data);
  const response = await axiosPublic.post("/survey-comments", data);
  return response.data;
};

export const getSingleSurveyComments = async (_id) => {
  const response = await axiosPublic.get(`/survey-comments/${_id._id}`);
  return response.data;
};
