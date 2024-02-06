import timeStampToDateConverter from "../../utilities/timeStampToDateConverter";

const CommentCard = ({ coment }) => {
  const { commenterName, commenterImage, comment, timeStamp } = coment;
  return (
    <div className="w-full flex items-center p-3 gap-3 border-b sm:border sm:rounded-full">
      <div>
        <img
          src={commenterImage}
          alt=""
          className="w-[40px] h-[40px] rounded-full"
        />
      </div>
      <div className="w-full flex flex-col items-start justify-center gap-2">
        <div className="w-full flex items-center justify-between">
          <h4 className="font-bold">{commenterName}</h4>
          <h2 className="text-sm font-medium mr-3">
            {timeStampToDateConverter(timeStamp)}
          </h2>
        </div>

        <p className="text-[#8b8b8b] text-base">{comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
