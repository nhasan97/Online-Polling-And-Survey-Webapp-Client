import axiosPublic from "./axiosPublic";

export const saveSurveyResponse = async (data) => {
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

export const getTotalVotes = async () => {
  const response = await axiosPublic.get("/total-votes");
  return response.data;
};

export const getParticularSurveyVotes = async (_id) => {
  const response = await axiosPublic.get(`/total-votes/${_id}`);
  return response.data;
};
