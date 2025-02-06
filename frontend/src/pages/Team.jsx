import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/utilities/Navbar";
import Footer from "../components/utilities/Footer";
import TeamMemberFrame from "../components/cards/TeamMember";
import Loader from "../components/utilities/Loading";
import ErrorPage from "./ErrorPage";
import facultyAdvisor from "../dataset/team";

const Team = ({ loggedIn }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deputySecretaries, setDeputySecretaries] = useState([]);
  const [jointSecretaries, setJointSecretaries] = useState([]);
  const [secretary, setSecretary] = useState({});

  useEffect(() => {
    const fetchTreks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/team`);
        if (!response.ok) throw new Error('Failed to fetch treks');
        const data = await response.json();
        setSecretary(data.secretary[0] || {});
        setDeputySecretaries(data.deputySecretary);
        setJointSecretaries(data.jointSecretary);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTreks();
  }, []);

  if (loading) return <Loader style="min-h-screen min-w-screen" />;
  if (error) return <ErrorPage error={error} />;
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div
        className="relative h-[100vh] flex items-center justify-center"
        style={{
          backgroundImage: 'url(/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Navbar */}
        <div className="absolute top-0 left-0 w-full backdrop-blur-md z-20">
          <Navbar loggedIn={loggedIn} page={"Team"} />
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: -150 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl p-8 rounded-md"
        >
          <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
            Meet the Team
          </h1>
          <p className="text-2xl text-gray-200 drop-shadow-md">
            Teamwork Makes the Dream Work
          </p>
        </motion.div>
      </div>

      <div className="bg-black min-h-screen w-full flex-col gap-4 items-center">
            <div className="flex flex-wrap justify-evenly items-center">
            <div className="mt-8">
              <h1 className="text-white text-3xl px-12 flex flex-col items-center justify-center">
                Secretary
                <div className="h-[2px] bg-red-600 mt-2 mb-4 w-[250px]" />
              </h1>
              <TeamMemberFrame
                name={secretary.name}
                image={secretary.image}
                large
              />
            </div>
            <div className="mt-12">
              <h1 className="text-white text-3xl px-12 flex flex-col items-center justify-center">
                Faculty Advisor
                <div className="h-[2px] bg-red-600 mt-2 mb-4 w-[250px]" />
              </h1>
              <TeamMemberFrame
                name={facultyAdvisor.name}
                image={facultyAdvisor.image}
                large
              />
            </div>
            </div>
            <div className="mt-12">
              <h1 className="text-white text-3xl px-12 flex flex-col items-center justify-center">
                Deputy Secretary
                <div className="h-[2px] bg-white mt-2 mb-4 w-[250px]" />
              </h1>
              <div className="flex flex-wrap justify-center gap-8 items-center">
                {
                  deputySecretaries.map((member) => (
                    <TeamMemberFrame
                      key={member.name}
                      name={member.name}
                      image={member.image}
                      large={false}
                    />
                  ))
                }
              </div>
            </div>
            <div className="mt-8">
              <h1 className="text-white text-3xl px-12 flex flex-col items-center justify-center">
                Joint Secretary
                <div className="h-[2px] bg-white mt-2 mb-4 w-[250px]" />
              </h1>
              <div className="flex flex-wrap justify-center gap-8 items-center">
                {
                  jointSecretaries.map((member) => (
                    <TeamMemberFrame
                      key={member.name}
                      name={member.name}
                      image={member.image}
                      large={false}
                    />
                  ))
                }
              </div>
            </div>
          </div>
      <Footer />
    </div>
  );
}

export default Team;
