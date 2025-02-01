import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="px-10 flex flex-row justify-between bg-black py-12">
      <div className="flex flex-col gap-1 text-white w-[25%]">
        <p className="text-2xl text-white font-semibold">Useful Links</p>
        <div className="px-2 flex flex-col gap-0.5 text-lg">
          <Link to="/" className="hover:font-bold">
            Home
          </Link>
          <Link to="/treks" className="hover:font-bold">
            Treks
          </Link>
          <Link to="/events" className="hover:font-bold">
            Events
          </Link>
          <Link to="/team" className="hover:font-bold">
            Team
          </Link>
          <Link to="/aboutus" className="hover:font-bold">
            About us
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-white w-[25%]">
        <p className="text-2xl text-white font-semibold">Other Links</p>
        <div className="px-2 flex flex-col gap-0.5 text-lg">
          <Link to="/" className="hover:font-bold">
            Consent Form
          </Link>
          <Link to="/treks" className="hover:font-bold">
            Medical Guidelines
          </Link>
          <Link to="/events" className="hover:font-bold">
            Equipment
          </Link>
        </div>
      </div>
      <div className="flex flex-col text-white w-[25%]">
        <p className="text-2xl text-white font-semibold">Contact us</p>
        <p className="text-lg">📞 Phone: <a href="tel:+01332284381" className="hover:text-gray-300">+01332-28-4381</a></p>
        <p className="text-lg">📧 Mail: <a href="mailto:hec@iitr.ac.in" className="hover:text-gray-300">hec@iitr.ac.in</a></p>
        <p className="text-lg">📅 Monday to Saturday: 5:00 PM - 6:00 PM</p>
        <p className="text-lg">
          📍 HEC Office, 2nd Floor Multi Activity Center, <br />
          IIT Roorkee, Uttarakhand-247667
        </p>
      </div>
    </div>
  );
};

export default Footer;
