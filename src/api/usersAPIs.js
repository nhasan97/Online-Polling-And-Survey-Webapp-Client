import axiosSecure from "./axiosSecure";

export const getRole = async (email) => {
  const response = await axiosSecure.get(`/users?email=${email}`);
  return response.data[0].role;
};

export const getUsersData = async () => {
  const response = await axiosSecure.get("/users");
  return response.data;
};

export const updateUserRole = async (obj) => {
  const { data } = await axiosSecure.put(
    `/users/update-role/${obj?.email}`,
    obj?.updatedRole
  );

  return data;
};
