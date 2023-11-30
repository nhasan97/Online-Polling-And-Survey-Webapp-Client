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

      <div className="min-h-screen pt-16 pb-5 space-y-6">
        <Title title={title}></Title>

        <div className="flex justify-between items-center px-20 py-5 bg-[#71357B] text-white rounded-lg">
          <div>
            <p className="text-2xl mb-6">Pro user Plan</p>
            <h1 className="text-3xl">
              Only <span className="text-5xl font-semibold">$14</span> / One
              time payment
            </h1>
          </div>
          <div className="text-lg">
            <ul>
              <p className="text-2xl mb-6">You will enjoy</p>
              <li className="text-lg mb-2">
                <i className="fa-solid fa-check"></i> Participate in any survey
              </li>
              <li className="text-lg mb-2">
                <i className="fa-solid fa-check"></i> Like/Dislike survey
              </li>
              <li className="text-lg mb-2">
                <i className="fa-solid fa-check"></i> Comment in any survey
              </li>
              <li className="text-lg mb-2">
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
