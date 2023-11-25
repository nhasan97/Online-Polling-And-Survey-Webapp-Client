import axiosPublic from "./axiosPublic";

export const saveUserData = async (user) => {
  const currentUser = {
    email: user.email,
    role: "user",
    status: "verified",
  };

  const { data } = await axiosPublic.put(`/users/${user?.email}`, currentUser);

  return data;
};
