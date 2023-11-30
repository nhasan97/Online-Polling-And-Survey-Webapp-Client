import axiosPublic from "./axiosPublic";

export const saveUserData = async (user) => {
  const currentUser = {
    name: user.displayName,
    email: user.email,
    role: "user",
  };

  const { data } = await axiosPublic.put(`/users/${user?.email}`, currentUser);

  return data;
};
