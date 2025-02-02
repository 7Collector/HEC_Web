const YourReviewCard = ({ review }) => {
  return (
    <div className="h-full bg-black border border-[#444444] rounded-2xl w-[30%] p-4 gap-2">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <img src={review.image} className="w-12 h-12 rounded-full" />
          <div className="flex flex-col">
            <p className="text-lg font-medium text-white">{review.name}</p>
            <p className="text-[#888888]">{review.trek}</p>
          </div>
        </div>
        <img src="/delete.png" className="w-8 h-8 hover:cursor-pointer" />
      </div>
      <p className="text-lg text-white">{review.text}</p>
    </div>
  );
};

export default YourReviewCard;
