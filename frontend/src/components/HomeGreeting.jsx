import { Link } from "react-router-dom";

const HomeGreeting = (loggedin) => {
  return (
    <div className="flex flex-col gap-4">
      <img className="w-24 h-24" src="/hec_logo.png" />
      <p className="font-bold text-white text-4xl">Unleash Your Explorer</p>
      <p className="text-[#FFFFFF80] w-[70%] text-xl">
        Embark on thrilling journeys, discover hidden trails, and connect with
        nature like never before. Your adventure starts here.
      </p>
      <div className="flex flex-row gap-2">
        <Link to={loggedin ? "http://localhost:3000/auth/omniport" : "/user/"} className="w-[40%] bg-white text-black rounded-4xl font-semibold text-xl text-center py-3">
            {loggedin ? <p>Login</p> : <p>Dashboard</p>}
        </Link>
        <Link to="/treks" className="w-[40%] bg-[#1e1e1e] text-white rounded-4xl font-semibold text-xl text-center py-3">
            View Treks
        </Link>
      </div>
    </div>
  );
};

export default HomeGreeting;
