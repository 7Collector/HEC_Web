const TrekCard = ({ trek }) => {
  return (
    <div className="bg-white rounded-2xl w-[30%]">
      <img src={trek.image} className="w-full h-56" />
      <div className="px-4 py-2">
        <p className="font-bold text-black text-xl">{trek.name}</p>
        <p className="text-[#424242]">
          {trek.cost} • {trek.date} • {trek.difficulty}
        </p>
        <p className="text-black text-lg">{trek.description}</p>
      </div>
    </div>
  );
};

export default TrekCard;
