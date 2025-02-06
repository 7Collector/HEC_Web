import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/utilities/Navbar';
import Loader from '../components/utilities/Loading';
import TrekCard from '../components/cards/TrekCard';
import ErrorPage from './ErrorPage';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50"
      >
        Previous
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 rounded ${
            currentPage === number 
              ? 'bg-white text-black' 
              : 'bg-gray-800 text-white'
          }`}
        >
          {number}
        </button>
      ))}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

const TreksPage = ({ loggedIn }) => {
  const [upcomingTreks, setUpcomingTreks] = useState([]);
  const [previousTreks, setPreviousTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const trekPerPage = 6;

  useEffect(() => {
    const fetchTreks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/getAllTreks?page=${currentPage}&limit=${trekPerPage}`);
        if (!response.ok) throw new Error('Failed to fetch treks');
        const data = await response.json();
        setUpcomingTreks(data.upcomingTreks);
        setPreviousTreks(data.previousTreks);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTreks();
  }, [currentPage]);

  if (loading) return <Loader style="min-h-screen min-w-screen" />;
  if (error) return <ErrorPage error={error} />;

  return (
    <div className="bg-black text-white">
      <div
        className="relative h-[100vh] flex items-center justify-center"
        style={{
          backgroundImage: 'url(/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Navbar and content remains the same */}
        <div className="absolute top-0 left-0 w-full backdrop-blur-md z-20">
          <Navbar
            loggedIn={loggedIn}
            className="relative z-10"
            page={"Treks"}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: -150 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl p-8 rounded-md"
        >
          <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
            Explore Our Treks
          </h1>
          <p className="text-2xl text-gray-200 drop-shadow-md">
            Embark on Unforgettable Journeys
          </p>
        </motion.div>
      </div>

      {/* Treks Container */}
      <div className="mx-auto px-20 py-16 space-y-16">
        {/* Upcoming Treks Section */}
        <section>
          <h2 className="text-3xl font-semibold border-b border-gray-700 pb-2 text-center mb-8">
            Upcoming Treks
          </h2>
          {upcomingTreks.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingTreks.map(trek => (
                <TrekCard key={trek._id} trek={trek} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">
              No upcoming treks at the moment.
            </p>
          )}
        </section>

        {/* Previous Treks Section */}
        <section>
          <h2 className="text-3xl font-semibold border-b border-gray-700 pb-2 text-center mb-8">
            Previous Treks
          </h2>
          {previousTreks.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-6">
                {previousTreks.map(trek => (
                  <TrekCard key={trek._id} trek={trek} />
                ))}
              </div>
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <p className="text-center text-gray-400">
              No previous treks found.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default TreksPage;