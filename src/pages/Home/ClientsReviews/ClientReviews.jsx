import { useEffect } from "react";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReviewCard from "./ReviewCard";
import Title from "../../../components/shared/Title";
import Container from "../../../components/shared/Container";

const ClientReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("clientReviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  const title = {
    mainTitle: "Clients Reviews",
    subTitle: "What our clients say",
  };

  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <Container>
      <div className="">
        <Title title={title}></Title>
        <div className="py-12">
          <Slider {...settings}>
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review}></ReviewCard>
            ))}
          </Slider>
        </div>
      </div>
    </Container>
  );
};

export default ClientReviews;
