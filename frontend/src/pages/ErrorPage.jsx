import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = ({ error = "Something went wrong!" }) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      {/* Error Animation */}
      <motion.h1
        className="text-6xl font-bold text-red-500 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        An Error Occurred!
      </motion.h1>

      {/* Error Message */}
      <p className="text-gray-300 text-lg max-w-xl">{error}</p>

      {/* Go Back Button */}
      <motion.button
        onClick={() => navigate(-1)}
        className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg rounded-lg transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Go Back
      </motion.button>
    </div>
  );
};

export default ErrorPage;
