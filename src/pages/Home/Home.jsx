import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import ClientReviews from "./ClientsReviews/ClientReviews";
import HowDoesItWork from "./HowDoesItWork";
import FAQ from "./FAQ";
import FeaturedSurveys from "./FeaturedSurveys/FeaturedSurveys";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>PanaPoll | Home</title>
      </Helmet>

      <Banner></Banner>
      <HowDoesItWork></HowDoesItWork>
      <FeaturedSurveys></FeaturedSurveys>
      <ClientReviews></ClientReviews>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
