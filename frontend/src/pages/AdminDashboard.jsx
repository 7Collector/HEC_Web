import { useState, useEffect } from "react";
import ProfilePopUp from "../components/utilities/ProfilePopup";
import Loader from "../components/utilities/Loading";
import SessionExpiredDialog from "../components/utilities/SessionExpireDialog";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ManageTeam from "../components/AdminDash/ManageTeam";
import TrekCard from "../components/cards/TrekCard";
import CreateTrekPopup from "../components/AdminDash/CreateTrekPopup";

const AdminDashboard = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);
  const tabs = ["Upcoming", "Previous Treks", "Manage Team", "Settings"];
  const [tab, setTab] = useState(tabs[0]);

  const [isCreateTrekOpen, setIsCreateTrekOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/profile", { credentials: "include" })
      .then((response) => {
        if (response.status === 401) {
          return response.json().then((data) => {
            if (data.message === "not admin") {
              console.log("Not admin");
              navigate("/user/dashboard");
              return;
            }
            setSessionExpired(true);
          });
        }
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setAdmin(data);
          setLoading(false);
        }
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  return (
    <>
      {sessionExpired && (
        <SessionExpiredDialog
          onClose={() => setSessionExpired(false)}
          setLoggedIn={setLoggedIn}
          adminLogin={true}
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
                Hey there, {admin?.name || "User"}
              </p>
            </div>
            <div className="relative">
              <img
                className="h-14 w-14 hover:cursor-pointer rounded-full"
                src={admin?.image}
                onError={(e) => {
                  e.target.src = admin?.image || "https://picsum.photos/200";
                }}
                onClick={() => {
                  const popup = document.querySelector(".user-popup");
                  popup.classList.toggle("hidden");
                }}
              />
              <ProfilePopUp profile={admin} setLoggedIn={setLoggedIn} />
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
              <div>
                <CreateTrekPopup
                  isOpen={isCreateTrekOpen}
                  onClose={() => setIsCreateTrekOpen(false)}
                />
                {admin.role === "secretary" && (
                  <button
                    className="rounded-md text-black font-semibold bg-white text-xl w-full py-3 mb-8 hover:cursor-pointer"
                    onClick={() => setIsCreateTrekOpen(true)}
                  >
                    Create New Trek
                  </button>
                )}
                <div className="flex flex-row justify-between">
                  {admin.upcomingTreks && admin.upcomingTreks.length != 0 ? (
                    admin.upcomingTreks.map((trek) => {
                      return <TrekCard trek={trek} admin={true}/>;
                    })
                  ) : (
                    <p className="text-2xl w-full text-white font-medium h-[400px] flex items-center justify-center">
                      No upcoming treks
                    </p>
                  )}
                </div>
              </div>
            )}

            {tab === "Previous Treks" && (
              <div className="flex flex-row justify-between">
                {admin.treks && admin.treks.length != 0 ? (
                  admin.treks.map((trek) => {
                    return <TrekCard trek={trek} />;
                  })
                ) : (
                  <p className="text-2xl w-full text-white font-medium h-[400px] flex items-center justify-center">
                    No Previous Treks
                  </p>
                )}
              </div>
            )}

            {tab === "Manage Team" && <ManageTeam admin={admin} style={""} />}

            {tab === "Settings" && (
              <p className="text-white">Settings Placeholder</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
