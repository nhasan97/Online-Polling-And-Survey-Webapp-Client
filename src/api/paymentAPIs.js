import axiosSecure from "./axiosSecure";

export const savePaymentData = async (payment) => {
  console.log(payment.payment);
  const response = await axiosSecure.post("/payments", payment.payment);
  return response.data;
};
