import { Link } from "react-router-dom";

const RecentSurveyCard = ({ survey }) => {
  const { _id, title, description, category } = survey;
  return (
    <div
      className="card bg-[#95D0D4] hover:bg-[#7cbabe] shadow-xl"
      data-aos="zoom-in"
      data-aos-delay="10"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="false"
    >
      <Link to={`/survey-detail/${_id}`}>
        <div className="card-body items-start">
          <h2 className="card-title text-white text-2xl">{title}</h2>
          <div className="badge bg-transparent text-white text-base font-medium">
            {category}
          </div>
          {/* <p className="text-preview text-[#8b8b8b]" title={description}>
            {description}
          </p> */}
        </div>
      </Link>
    </div>
  );
};

export default RecentSurveyCard;
