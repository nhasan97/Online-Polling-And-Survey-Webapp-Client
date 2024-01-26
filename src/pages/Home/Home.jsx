import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import ClientReviews from "./ClientsReviews/ClientReviews";
import HowDoesItWork from "./HowDoesItWork/HowDoesItWork";
import FAQ from "./FAQ";
import FeaturedSurveys from "./FeaturedSurveys/FeaturedSurveys";
import RecentSurveys from "./RecentSurveys/RecentSurveys";
import OverView from "./OverView/OverView";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>PanaPoll | Home</title>
      </Helmet>

      <Banner></Banner>
      <FeaturedSurveys></FeaturedSurveys>
      <RecentSurveys></RecentSurveys>
      {/*<OverView></OverView>
      <HowDoesItWork></HowDoesItWork>
      <ClientReviews></ClientReviews>
      <FAQ></FAQ> */}
    </div>
  );
};

export default Home;
