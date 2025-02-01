import { Link } from "react-router-dom"
import ReviewCard from "./ReviewCard"

const Reviews = ({reviews}) => {
    return(
        <div className="flex flex-col gap-12 justify-center items-center py-10">
            <div className="flex flex-col gap-2 justify-center items-center text-center">
                <p className="text-4xl text-white font-bold">Tales from the Trekkers</p>
                <p className="text-2xl text-[#FFFFFF80] font-medium w-[60%]">Every trek has a story, and every explorer has a voice. Here’s what our community has to say about their adventures with HEC IITR.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 justify-center justify-items-stretch">
            {
                reviews.map(review => {
                    return (
                        <ReviewCard review={review} />
                    )
                })
            }
            </div>
            <Link to="/reviews" className="bg-[#1e1e1e] rounded-4xl py-4 px-8 flex flex-row items-center justify-center w-fit">
                <p className="text-xl font-bold text-white">Read All Reviews</p>
                <img src="/arrow.png" className="ml-4 w-8 h-8" />
            </Link>
        </div>
    )
}

export default Reviews