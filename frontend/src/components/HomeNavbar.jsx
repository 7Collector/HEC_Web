import { Link } from "react-router-dom";

const HomeNavbar = (loggedin) => {
    return(
        <div>
            <div className="flex flex-row justify-center text-white gap-16 text-lg py-4">
                <Link to="/treks" className="hover:font-semibold">
                    Treks
                </Link>
                <Link to="/events" className="hover:font-semibold">
                    Events
                </Link>
                <Link to="/team" className="hover:font-semibold">
                    Team
                </Link>
                <Link to="/aboutus" className="hover:font-semibold">
                    About us
                </Link>
                <Link to="/contact" className="hover:font-semibold">
                    Contact
                </Link>
            </div>
        </div>
    )
}

export default HomeNavbar;