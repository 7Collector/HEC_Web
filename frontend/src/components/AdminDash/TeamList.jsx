import { useState } from "react";
import { motion } from "framer-motion";
import TeamListCard from "../cards/TeamListCard";

const CollapsibleSection = ({ title, members }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-xl text-white font-semibold">{title}</p>
        <img
          src={isOpen ? "/up.png" : "/down.png"}
          alt="Toggle"
          className="w-5 h-5 transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
        />
      </div>
      
      {/* Animated dropdown */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        {members?.map((member) => (
          <TeamListCard key={member.enroll} member={member} />
        ))}
      </motion.div>

      <hr className="border-[#212121]" />
    </div>
  );
};

const TeamList = ({ team }) => {
  return (
    <>
      <CollapsibleSection title="Secretary" members={team.secretary} />
      <CollapsibleSection title="Deputy Secretary" members={team.deputySecretary} />
      <CollapsibleSection title="Joint Secretary" members={team.jointSecretary} />
      <CollapsibleSection title="Executives" members={team.executive} />
    </>
  );
};

export default TeamList;
