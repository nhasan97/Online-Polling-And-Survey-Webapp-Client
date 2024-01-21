import { Link } from "react-router-dom";
import "./FeaturedSurveyCard.css";

const FeaturedSurveyCard = ({ survey }) => {
  const { _id, title, description, category } = survey;

  return (
    <div className="overflow-hidden rounded-2xl border">
      <div className="card bg-base-100 featured-card relative">
        <div className="card-body items-start">
          <h2 className="card-title text-[#71357B] text-2xl">{title}</h2>
          <div className="badge bg-[#95D0D4] text-white text-base font-medium">
            {category}
          </div>
          <p className="text-preview text-[#8b8b8b]" title={description}>
            {description}
          </p>
          <div className="card-actions justify-end"></div>
        </div>
        <div className="hover-overlay w-full h-full bg-[#70357bd7] flex flex-col justify-center items-center gap-3 rounded-2xl absolute right-0">
          <Link
            to={`/survey-detail/${_id}`}
            className="btn bg-[#FE7E51] hover:bg-white text-lg text-white hover:text-[#FE7E51] border-none"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSurveyCard;
