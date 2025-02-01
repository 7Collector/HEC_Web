import { Link } from "react-router-dom"
import TrekCard from "./TrekCard"

const UpcomingTreks = ({treks}) => {
    return(
        <div className="flex flex-col gap-12 justify-center items-center py-10">
            <p className="text-4xl text-white font-bold">Upcoming Events & Treks</p>
            <div className="flex flex-row justify-between">
            {
                treks.map(trek => {
                    return (
                        <TrekCard trek={trek} />
                    )
                })
            }
            </div>
            <Link to="/treks" className="bg-[#1e1e1e] rounded-4xl py-4 px-8 flex flex-row items-center justify-center w-fit">
                <p className="text-xl font-bold text-white">View All</p>
                <img src="/arrow.png" className="ml-4 w-8 h-8" />
            </Link>
        </div>
    )
}

export default UpcomingTreks