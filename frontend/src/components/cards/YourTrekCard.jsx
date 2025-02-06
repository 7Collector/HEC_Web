const YourTrekCard = ({ trek }) => {
  return (
    <div className="bg-white rounded-2xl w-[30%]">
      <img src={trek.image} className="w-full h-56" />
      <div className="px-4 py-2">
        <p className="font-bold text-black text-xl">{trek.name}</p>
        <p className="text-[#424242]">
          {trek.cost} • {trek.date} • {trek.difficulty}
        </p>
        <p className="text-black text-lg">{trek.description}</p>
        {trek.completed && !trek.reviewed && (
          <div className="bg-black rounded-xl py-2 w-full flex flex-row items-center justify-center mt-2 hover:cursor-pointer">
            <p className="text-xl font-bold text-white">Write a Review</p>
            <img src="/arrow.png" className="ml-2 w-8 h-8" />
          </div>
        )}
        {!trek.paid && (
          <div className="bg-[#32cd32] rounded-xl py-2 w-full flex flex-row items-center justify-center mt-2 hover:cursor-pointer">
            <p className="text-xl font-bold text-white">Pay $XXXX</p>
            <img src="/arrow.png" className="ml-2 w-8 h-8" />
          </div>
        )}
        {trek.completed && trek.reviewed && (
          <div className="bg-black rounded-xl py-2 w-full flex flex-row items-center justify-center mt-2 hover:cursor-pointer">
            <p className="text-xl font-bold text-white">View Details</p>
            <img src="/arrow.png" className="ml-2 w-8 h-8" />
          </div>
        )}
      </div>
    </div>
  );
};

export default YourTrekCard;