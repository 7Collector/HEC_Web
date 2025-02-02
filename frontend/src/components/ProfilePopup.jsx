import { Link } from "react-router-dom";

const ProfilePopUp = ({ profile }) => {
    return (
        <div className="user-popup hidden absolute top-12 right-0 border border-[#212121] drop-shadow-lg bg-black rounded-2xl p-4 w-[200px]">
            <p className="text-white text-lg font-semibold mb-2">Your Name</p>
            <Link
              to="/"
              className="block text-[#5e5e5e] text-lg font-semibold mt-2 hover:text-white"
            >
              Your Profile
            </Link>
            <Link
              to="/"
              className="block text-[#5e5e5e] text-lg font-semibold mt-2 hover:text-white"
            >
              Home
            </Link>
            <button
              className="block w-full bg-white mt-4 text-black text-lg font-semibold rounded-xl py-1 hover:bg-gray-700 hover:cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
    );
}

export default ProfilePopUp;