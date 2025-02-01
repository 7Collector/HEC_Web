import HomeGreeting from "../components/HomeGreeting";
import Earth from "../components/Earth";
import HomeNavbar from "../components/HomeNavbar";
import UpcomingTreks from "../components/UpcomingTreks";
import treks from "../dataset/treks";
import Reviews from "../components/Reviews";
import reviews from "../dataset/reviews";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="bg-black min-h-screen px-20">
            <HomeNavbar />
            <div className="flex flex-row min-h-full justify-center items-center py-10">
                <HomeGreeting />
                <Earth />
            </div>
            <UpcomingTreks treks={treks}/>
            <Reviews reviews={reviews} />

            <Footer />
        </div>
    )
}

export default Home;
