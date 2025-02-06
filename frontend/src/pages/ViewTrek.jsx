import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/utilities/Loading";
import Navbar from "../components/utilities/Navbar";
import { Link } from "react-router-dom";

const TrekDetails = ({ loggedIn }) => {
  const { trekId } = useParams();
  const [trek, setTrek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrek = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/getTrek/${trekId}`
        );
        if (!response.ok) throw new Error("Failed to fetch trek details");
        const data = await response.json();
        setTrek(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrek();
  }, [trekId]);

  if (loading) return <Loader style={"min-h-screen min-w-screen"} />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!trek)
    return <p className="text-center text-gray-400">Trek not found.</p>;

  return (
    <div className="bg-black text-white">

      {/* Hero Section */}
      <div
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${trek.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Navbar inside the same div with background */}
        <div className="absolute top-0 left-0 w-full backdrop-blur-md z-20">
          <Navbar
            loggedIn={loggedIn}
            className="relative z-10"
          />
        </div>
        <div className="absolute inset-0"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-gray-900/50 z-10 text-center max-w-3xl p-8 rounded-md"
        >
          <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
            {trek.name}
          </h1>
          <p className="text-2xl text-gray-200 drop-shadow-md">
            {trek.tagline}
          </p>
        </motion.div>
      </div>

      {/* Details Container */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Overview Section */}
        <section className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-semibold border-b border-gray-700 pb-2">
              Trek Overview
            </h2>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div>
                <p className="font-medium text-gray-400">Difficulty</p>
                <p>{trek.difficulty}</p>
              </div>
              <div>
                <p className="font-medium text-gray-400">Duration</p>
                <p>{trek.days} Days</p>
              </div>
              <div>
                <p className="font-medium text-gray-400">Distance</p>
                <p>{trek.distance} km</p>
              </div>
              <div>
                <p className="font-medium text-gray-400">Altitude</p>
                <p>{trek.altitude} m</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-semibold border-b border-gray-700 pb-2">
              Description
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {trek.description}
            </p>
          </motion.div>
        </section>

        {/* Pricing Section */}
        <section className="text-center bg-gray-900 bg-opacity-50 rounded-xl p-8">
          <h2 className="text-3xl font-semibold mb-6">Expedition Details</h2>
          <div className="flex justify-center space-x-12">
            <div>
              <p className="text-gray-400">Trek Date</p>
              <p className="text-2xl font-bold">{trek.dateString}</p>
            </div>
            <div className="border-l border-gray-700 pl-12">
              <p className="text-gray-400">Group Size</p>
              <p className="text-2xl font-bold">
                {trek.groupSize || "Flexible"}
              </p>
            </div>
            <div className="border-l border-gray-700 pl-12">
              <p className="text-gray-400">Total Cost</p>
              <p className="text-2xl font-bold">
                {trek.price
                  ? `₹  ${trek.price.toLocaleString("en-IN")}`
                  : "Flexible"}
              </p>
            </div>
          </div>
        </section>
        <div className="w-full flex justify-center items-center">
          <Link
            to={`/user/treks/register/${trek._id}`}
            className="bg-[#1e1e1e] rounded-4xl py-4 px-8 flex flex-row items-center justify-center w-fit"
          >
            <p className="text-xl font-bold text-white">Register</p>
            <img src="/arrow.png" className="ml-4 w-8 h-8" />
          </Link>
        </div>
        {/* Leaders Section */}
        {trek.leaders && trek.leaders.length > 0 && (
          <section>
            <h2 className="text-3xl font-semibold text-center mb-8">
              Trek Leaders
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {trek.leaders.map((leader, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gray-900 rounded-lg p-6 flex items-center space-x-6 hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.03 }}
                >
                  {leader.image && (
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-xl font-semibold">{leader.name}</p>
                    <div className="text-gray-400">
                      <p>{leader.instagram}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
        {/* Gallery Section */}
        {trek.gallery && trek.gallery.length > 0 && (
          <section>
            <h2 className="text-3xl font-semibold text-center mb-8">
              Journey Gallery
            </h2>
            <motion.div
              className="grid grid-cols-3 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
            >
              {trek.gallery.map((img, idx) => (
                <motion.img
                  key={idx}
                  src={img}
                  alt={`${trek.name} gallery ${idx + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                />
              ))}
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TrekDetails;
