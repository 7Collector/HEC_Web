import { useState } from "react";
import { Link } from "react-router-dom";
import treks from "../dataset/treks";
import reviews from "../dataset/reviews";
import TrekCard from "../components/TrekCard";
import YourReviewCard from "../components/YourReviewCard";
import YourTrekCard from "../components/YourTrekCard";
import ProfilePopUp from "../components/ProfilePopup";

const UserDashboard = () => {

  const tabs = ["Upcoming", "Your Treks", "Your Reviews", "Profile"];
  const [tab, setTab] = useState(tabs[0]);


  return (
    <div className="bg-black min-h-screen">
      <div className="flex flex-row px-10 py-4 justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <Link to="/">
            <img className="h-16 w-16" src="/hec_logo.png" />
          </Link>
          <p className="text-white text-xl font-semibold">Hey there, </p>
        </div>
        <div className="relative">
          <img
            className="h-14 w-14 hover:cursor-pointer rounded-full"
            src="https://picsum.photos/200"
            onClick={() => {
              const popup = document.querySelector(".user-popup");
              popup.classList.toggle("hidden");
            }}
          />
          <ProfilePopUp />
        </div>
      </div>
      <div className="flex flex-row justify-center text-white gap-10 text-lg border-b-2 border-[#212121]">
        {tabs.map((t, index) => {
          return (
            <div
              key={index}
              onClick={() => setTab(t)}
              className={
                tab === t
                  ? "border-b-2 font-semibold border-white"
                  : "text-[#888888] hover:font-semibold hover:text-white hover:cursor-pointer"
              }
            >
              {t}
            </div>
          );
        })}
      </div>
      <div className="content px-20 py-10">
        {tab === "Upcoming" && (
          <div className="flex flex-row justify-between">
            {treks.map((trek) => {
              return <TrekCard trek={trek} />;
            })}
          </div>
        )}
        {tab === "Your Treks" && (
          <div className="flex flex-row justify-between">
            {treks.map((trek) => {
              return <YourTrekCard trek={trek} />;
            })}
          </div>
        )}
        {tab === "Your Reviews" && (
          <div className="flex flex-wrap items-center gap-4 justify-center justify-items-stretch">
            {reviews.map((review) => {
              return <YourReviewCard review={review} />;
            })}
          </div>
        )}
        {tab === "Profile" && <p>profile</p>}
      </div>
    </div>
  );
};

export default UserDashboard;