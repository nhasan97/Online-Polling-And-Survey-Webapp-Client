import axiosSecure from "./axiosSecure";

export const saveUserData = async (user) => {
  const currentUser = {
    email: user.email,
    role: "user",
    status: "verified",
  };

  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);

  return data;
};
