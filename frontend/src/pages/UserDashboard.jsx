import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import reviews from "../dataset/reviews";
import TrekCard from "../components/cards/TrekCard";
import YourReviewCard from "../components/cards/YourReviewCard";
import YourTrekCard from "../components/cards/YourTrekCard";
import ProfilePopUp from "../components/utilities/ProfilePopup";
import Loader from "../components/utilities/Loading";
import SessionExpiredDialog from "../components/utilities/SessionExpireDialog";
import MyReviews from "../components/UserDash/MyReviews";
import YourProfile from "../components/UserDash/YourProfile";

const UserDashboard = ({ setLoggedIn }) => {
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
        <SessionExpiredDialog
          onClose={() => setSessionExpired(false)}
          setLoggedIn={setLoggedIn}
        />
      )}
      {loading ? (
        <Loader style={"min-h-screen"} />
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
              <ProfilePopUp profile={profile} setLoggedIn={setLoggedIn} />
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
                {profile.upcomingTreks && profile.upcomingTreks.length != 0 ? (
                  profile.upcomingTreks.map((trek) => {
                    return <TrekCard trek={trek} />;
                  })
                ) : (
                  <p className="text-2xl w-full text-white font-medium h-[400px] flex items-center justify-center">
                    No upcoming treks
                  </p>
                )}
              </div>
            )}
            {tab === "Your Treks" && (
              <div className="flex flex-row justify-between">
              {profile.treks && profile.treks.length != 0 ? (
                profile.treks.map((trek) => {
                  return <YourTrekCard trek={trek} />;
                })
              ) : (
                <p className="text-2xl w-full text-white font-medium h-[400px] flex items-center justify-center">
                    Please go on some treks... We want to show you the amazing experiences you've had with us...
                </p>
              )}
            </div>
            )}
            {tab === "Your Reviews" && (
              <MyReviews style={"flex flex-wrap items-center gap-4 h-full justify-center justify-items-stretch"} />
            )}
            {tab === "Profile" && (
              <div className="w-full flex justify-center">
                <YourProfile style={"items-center gap-4 h-[full]"} profile={profile} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserDashboard;
