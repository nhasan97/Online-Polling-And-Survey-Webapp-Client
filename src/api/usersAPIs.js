import axiosPublic from "./axiosPublic";

export const getRole = async (email) => {
  const response = await axiosPublic.get(`/users?email=${email}`);
  return response.data[0].role;
};
