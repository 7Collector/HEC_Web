import { Link } from "react-router-dom";

const Navbar = (loggedin, page) => {
  return (
    <div className="flex flex-row justify-between px-10 py-4 items-center">
      <Link to="/">
        <img className="h-16 w-16" src="/hec_logo.png" />
      </Link>
      <div className="flex flex-row justify-center text-white gap-16 text-lg py-4">
        <Link
          to="/treks"
          className={
            page === "Treks"
              ? "hover:font-semibold font-semibold"
              : "hover:font-semibold"
          }
        >
          Treks
        </Link>
        <Link
          to="/events"
          className={
            page === "Events"
              ? "hover:font-semibold font-semibold"
              : "hover:font-semibold"
          }
        >
          Events
        </Link>
        <Link
          to="/team"
          className={
            page === "Team"
              ? "hover:font-semibold font-semibold"
              : "hover:font-semibold"
          }
        >
          Team
        </Link>
        <Link
          to="/aboutus"
          className={
            page === "About us"
              ? "hover:font-semibold font-semibold"
              : "hover:font-semibold"
          }
        >
          About us
        </Link>
        <Link
          to="/contact"
          className={
            page === "Contact"
              ? "hover:font-semibold font-semibold"
              : "hover:font-semibold"
          }
        >
          Contact
        </Link>
      </div>
      <Link
        to={loggedin ? "/auth/omniport" : "/user/"}
        className="px-4 bg-white text-black rounded-4xl font-semibold text-xl text-center py-2 h-fit"
      >
        {loggedin ? <p>Login</p> : <p>Dashboard</p>}
      </Link>
    </div>
  );
};

export default Navbar;
