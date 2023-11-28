import PropTypes from "prop-types";
import "./Review.css";
// import "@smastrom/react-rating/style.css";
// import { Rating } from "@smastrom/react-rating";

const ReviewCard = ({ review }) => {
  const { image, name, rating, say } = review;

  return (
    <div>
      <div className="card mx-3">
        <div className="bg-transparent flex justify-center items-center">
          <img
            src={image}
            alt="Movie"
            className="w-40 h-40 rounded-xl border-white z-10"
          />
        </div>

        <div className="card-body h-52 bg-[#71357B] text-white justify-center items-center rounded-xl relative">
          <div className="p-1 bg-white rounded-full absolute top-0 translate-y-[-40%] z-20">
            <div className="rating">
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
                checked
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
            </div>
          </div>

          <h2 className="card-title font-bold mt-10">{name}</h2>

          <p className="text-preview text-center" title={say}>
            {say}
          </p>

          {/* <Rating style={{ maxWidth: 180 }} value={rating} readOnly /> */}
        </div>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewCard;
