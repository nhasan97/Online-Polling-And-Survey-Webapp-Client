import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import ClientReviews from "./ClientsReviews/ClientReviews";
import HowDoesItWork from "./HowDoesItWork";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>PanaPoll | Home</title>
      </Helmet>

      <Banner></Banner>
      <HowDoesItWork></HowDoesItWork>
      <ClientReviews></ClientReviews>
    </div>
  );
};

export default Home;
