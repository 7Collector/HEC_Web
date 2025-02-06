import { useState, useEffect } from "react";
import YourReviewCard from "../cards/YourReviewCard";
import Loader from "../utilities/Loading";

const MyReviews = ({ style }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch("http://localhost:3000/api/user/reviews", {
        credentials: "include",
      });
      const data = await response.json();
      setReviews(data);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  return (
    <>
      <div className={`${style}`}>
        {loading ? (
          <Loader style={"h-[400px]"} />
        ) : (
          <>
            {reviews.length === 0 ? (
              <p className="text-2xl w-full text-white font-medium h-[400px] flex items-center justify-center">
                Post some reviews!
              </p>
            ) : (
              reviews.map((review) => {
                return <YourReviewCard review={review} />;
              })
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MyReviews;
