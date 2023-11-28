import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import ClientReviews from "./ClientsReviews/ClientReviews";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>PanaPoll | Home</title>
      </Helmet>

      <Banner></Banner>
      <ClientReviews></ClientReviews>
    </div>
  );
};

export default Home;
