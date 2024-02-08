import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useEffect } from "react";
import { useState } from "react";
import axiosSecure from "../api/axiosSecure";
import useAuth from "../hooks/useAuth";
import usePerformMutation from "../hooks/usePerformMutation";
import { savePaymentData } from "../api/paymentAPIs";
import { updateUserRole } from "../api/usersAPIs";
import { useNavigate } from "react-router-dom";
import { showAlertOnError } from "../utilities/displaySweetAlert";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const price = 14.0;

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: price })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [price]);

  //performing mutation for saving payment data
  const mutation1 = usePerformMutation(
    "savePayment",
    savePaymentData,
    "Payment done successfully!"
  );

  //performing mutation for updating user role
  const mutation2 = usePerformMutation(
    "updateRole",
    updateUserRole,
    "Congrates!!! Now you're PRO!"
  );

  //payment handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      showAlertOnError("Please login first");
      navigate("/login");
    } else {
      if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardElement);

      if (card == null) {
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        console.log("Error:", error);
        setError(error.message);
      } else {
        console.log("Payment Method:", paymentMethod);
        setError("");
      }

      const { paymentIntent, error: paymentError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || "Not Found",
              email: user?.email || "Not Found",
            },
          },
        });

      if (paymentError) {
        setError(paymentError.message);
      } else {
        setError("");
        if (paymentIntent.status === "succeeded") {
          setTransactionID(paymentIntent.id);

          const payment = {
            name: user?.displayName || "Not Found",
            email: user?.email || "Not Found",
            price: price,
            transactionID: paymentIntent.id,
          };

          const email = user?.email;
          const role = "pro-user";
          const updatedRole = { role };

          mutation1.mutate({ payment });
          mutation2.mutate({ email, updatedRole });
          navigate("/", { replace: true });
        }
      }
    }
  };

  return (
    <div className="w-full h-1/4 px-5 sm:px-20 py-5 bg-[#a1dada41] rounded-lg">
      <form onSubmit={handleSubmit} className="">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="btn mt-10 bg-[#FE7E51] text-lg font-medium text-white hover:text-[#FE7E51] normal-case rounded-lg"
        >
          Pay
        </button>

        {error && <p className="text-red-600">{error}</p>}

        {transactionID && (
          <p className="text-green-600">
            Payment success!! Your transaction ID : {transactionID}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
