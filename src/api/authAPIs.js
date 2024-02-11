import axiosSecure from "./axiosSecure";

export const saveUserData = async (user, role) => {
  console.log(role);
  const currentUser = {
    name: user.displayName,
    email: user.email,
    role: role,
  };

  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);

  return data;
};
