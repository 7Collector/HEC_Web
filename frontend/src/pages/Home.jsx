import HomeGreeting from "../components/home/HomeGreeting";
import Earth from "../components/home/Earth";
import HomeNavbar from "../components/home/HomeNavbar";
import UpcomingTreks from "../components/home/UpcomingTreks";
import treks from "../dataset/treks";
import Reviews from "../components/home/Reviews";
import reviews from "../dataset/reviews";
import Footer from "../components/utilities/Footer";

const Home = ({loggedIn}) => {
  return (
    <div className="bg-black min-h-screen px-20">
      <div className="flex flex-col h-[100vh]">
        <HomeNavbar className="px-20"/>
        <div className="flex-1 flex flex-row min-h-full justify-between items-center py-10">
          <HomeGreeting loggedIn={loggedIn} />
          <Earth />
        </div>
      </div>
      <UpcomingTreks treks={treks} />
      <Reviews reviews={reviews} />

      <Footer />
    </div>
  );
};

export default Home;
