import { Link } from "react-router-dom";
import "./Surveys.css";
import PropTypes from "prop-types";

const SurveyCard = ({ survey }) => {
  const { _id, title, description, category } = survey;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="p-5 flex flex-row items-start justify-between sm:hidden">
        <div className="space-y-3">
          <h2 className="card-title text-[#71357B] text-lg md:text-xl lg:text-2xl">
            {title}
          </h2>
          <div className="badge bg-[#95D0D4] text-white text-base font-medium">
            {category}
          </div>
        </div>
        {/* <p className="text-preview text-[#8b8b8b]" title={description}>
          {description}
        </p> */}
        <div className="card-actions justify-end">
          <Link
            to={`/survey-detail/${_id}`}
            className="btn btn-circle bg-[#FE7E51] hover:bg-white text-lg text-white hover:text-[#FE7E51] border-none"
          >
            <i className="fa-solid fa-circle-info group-hover:text-white"></i>
          </Link>
        </div>
      </div>

      <div className="card-body items-start hidden sm:flex">
        <h2 className="card-title text-[#71357B] text-lg md:text-xl lg:text-2xl">
          {title}
        </h2>
        <div className="badge bg-[#95D0D4] text-white text-base font-medium">
          {category}
        </div>
        <p className="text-preview text-[#8b8b8b]" title={description}>
          {description}
        </p>
        <div className="card-actions justify-end">
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

SurveyCard.propTypes = {
  survey: PropTypes.object.isRequired,
};

export default SurveyCard;
