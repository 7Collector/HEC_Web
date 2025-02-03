import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import treks from "../dataset/treks";
import reviews from "../dataset/reviews";
import TrekCard from "../components/TrekCard";
import YourReviewCard from "../components/YourReviewCard";
import YourTrekCard from "../components/YourTrekCard";
import ProfilePopUp from "../components/ProfilePopup";
import Loader from "../components/Loading";
import SessionExpiredDialog from "../components/SessionExpireDialog";

const UserDashboard = ({setLoggedIn}) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);
  const tabs = ["Upcoming", "Your Treks", "Your Reviews", "Profile"];
  const [tab, setTab] = useState(tabs[0]);

  useEffect(() => {
    fetch("http://localhost:3000/api/user/profile", { credentials: "include" })
      .then((response) => {
        if (response.status === 401) {
          setSessionExpired(true);
          return;
        }
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        setLoading(false);
        return response.json();
      })
      .then((data) => {
        setProfile(data);
        console.log("profile:", profile);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  return (
    <>
      {sessionExpired && (
        <SessionExpiredDialog onClose={() => setSessionExpired(false)} setLoggedIn={setLoggedIn} />
      )}
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-black min-h-screen">
          <div className="flex flex-row px-10 py-4 justify-between items-center">
            <div className="flex flex-row gap-4 items-center">
              <Link to="/">
                <img className="h-16 w-16" src="/hec_logo.png" />
              </Link>
              <p className="text-white text-xl font-semibold">
                Hey there, {profile?.name || "User"}
              </p>
            </div>
            <div className="relative">
              <img
                className="h-14 w-14 hover:cursor-pointer rounded-full"
                src={profile?.image}
                onError={(e) => {
                  e.target.src = profile?.image || "https://picsum.photos/200";
                }}
                onClick={() => {
                  const popup = document.querySelector(".user-popup");
                  popup.classList.toggle("hidden");
                }}
              />
              <ProfilePopUp profile={profile} />
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
            {tab === "Profile" && (
              <div>
                <p>Name: {profile.name}</p>
                <p>Email: {profile.email}</p>
                <p>Number: {profile.number}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserDashboard;
