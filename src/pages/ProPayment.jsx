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

      <div className="min-h-screen pt-16 pb-5 ">
        <Title title={title}></Title>
        {/* options={options} */}
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </Container>
  );
};

export default ProPayment;
