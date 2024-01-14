const CommentCard = ({ coment }) => {
  const { commenterName, commenterImage, comment } = coment;
  return (
    <div className="flex items-center p-3 gap-3 border rounded-full">
      <div>
        <img
          src={commenterImage}
          alt=""
          className="w-[40px] h-[40px] rounded-full"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <h4 className="font-bold">{commenterName}</h4>
        <p className="text-[#8b8b8b] text-base">{comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
