import PropTypes from "prop-types";
import "./Review.css";

const ReviewCard = ({ review }) => {
  const { image, name, say } = review;

  return (
    <div className="card mx-3 shadow-xl">
      <figure className="px-10 pt-10 bg-[#c9c9c949] backdrop:blur-lg rounded-xl translate-y-[10%] z-10">
        <div className="avatar">
          <div className="w-36 mask mask-squircle">
            <img src={image} alt="Movie" className="w-full border-white z-10" />
          </div>
        </div>
      </figure>
      <div className="card-body py-20 bg-[#70357b] text-white items-center text-center rounded-xl relative">
        <div className="px-2 py-1 bg-white rounded-full absolute top-0 translate-y-[-50%] z-20">
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

        <h2 className="card-title font-bold">{name}</h2>

        <p className="text-preview text-center" title={say}>
          {say}
        </p>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewCard;
