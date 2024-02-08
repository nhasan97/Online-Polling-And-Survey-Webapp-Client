import { Helmet } from "react-helmet-async";
import Container from "../components/shared/Container";
import Title from "../components/shared/Title";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const ProPayment = () => {
  //setting the title
  const title = {
    mainTitle: "Become a Pro User",
    subTitle: "You deserve more",
  };

  const stripePromise = loadStripe(import.meta.env.VITE_Publishable_Key);

  return (
    <Container>
      <Helmet>
        <title>PanaPoll | Become PRO</title>
      </Helmet>

      <div className="min-h-screen flex flex-col justify-center items-center pt-16 pb-5 space-y-6">
        <Title title={title}></Title>

        <div className="w-full h-1/4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 px-5 lg:px-20 py-5 bg-[#71357B] text-white rounded-lg">
          <div>
            <p className="text-xl lg:text-2xl mb-6">Pro user Plan</p>
            <h1 className="text-2xl lg:text-3xl">
              Only
              <span className="text-4xl lg:text-5xl font-semibold">$14</span> /
              One time payment
            </h1>
          </div>
          <div className="text-base lg:text-lg">
            <ul>
              <p className="text-xl lg:text-2xl mb-3 lg:mb-6">You will enjoy</p>
              <li className="mb-2">
                <i className="fa-solid fa-check"></i> Participate in any survey
              </li>
              <li className="mb-2">
                <i className="fa-solid fa-check"></i> Like/Dislike survey
              </li>
              <li className="mb-2">
                <i className="fa-solid fa-check"></i> Comment in any survey
              </li>
              <li className="mb-2">
                <i className="fa-solid fa-check"></i> Report survey
              </li>
            </ul>
          </div>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </Container>
  );
};

export default ProPayment;
