import React from "react";
import { motion } from "framer-motion";

const ImageFrame = ({ image, large }) => (
  <div className="w-full flex justify-center items-center">
    <img
      src={image}
      alt="team member"
      width={large ? 300 : 200}
      height={large ? 300 : 200}
      className="bg-black shadow-sm"
    />
  </div>
);

const TeamMemberFrame = ({ name, image, large }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-2 shadow-md">
        <ImageFrame image={image} large={large} />
        <p className="text-black text-2xl text-center mt-2">{name}</p>
      </div>
    </div>
  </motion.div>
);

export default TeamMemberFrame;
