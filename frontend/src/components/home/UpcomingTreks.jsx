import { Link } from "react-router-dom";
import TrekCard from "../cards/TrekCard";
import Loader from "../utilities/Loading";
import { useEffect, useState } from "react";

const UpcomingTreks = () => {
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/upcoming")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch treks");
        }
        return response.json();
      })
      .then((data) => {
        setTreks(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-12 justify-center items-center py-10">
      <div className="flex flex-col gap-2 justify-center items-center text-center">
        <p className="text-4xl text-white font-bold">Upcoming Treks & Events</p>
        <p className="text-2xl text-[#FFFFFF80] font-medium w-[60%]">
          Adventure is calling! Explore breathtaking landscapes and
          unforgettable journeys with HEC IITR. Stay tuned for our next
          expedition.
        </p>
      </div>
      {loading ? (
        <Loader style={"h-[400px]"}/>
      ) : (
        <>
          <div className="flex flex-row justify-between">
            {treks.length === 0 ? (
              <p className="text-2xl text-white font-medium h-[200px] flex items-center justify-center">
                No upcoming treks
              </p>
            ) : (
              treks.map((trek) => {
                return <TrekCard trek={trek} />;
              })
            )}
          </div>
          <Link
            to="/treks"
            className="bg-[#1e1e1e] rounded-4xl py-4 px-8 flex flex-row items-center justify-center w-fit"
          >
            <p className="text-xl font-bold text-white">View All</p>
            <img src="/arrow.png" className="ml-4 w-8 h-8" />
          </Link>
        </>
      )}
    </div>
  );
};

export default UpcomingTreks;
