import axiosSecure from "./axiosSecure";

export const savePaymentData = async (payment) => {
  console.log(payment.payment);
  const response = await axiosSecure.post("/payments", payment.payment);
  return response.data;
};

export const getPayments = async () => {
  const response = await axiosSecure.get("/payments");
  return response.data;
};
