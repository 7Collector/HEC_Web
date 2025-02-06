import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TrekCard = ({ trek, admin }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="bg-white rounded-2xl w-[25vw] group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <img src={trek.image} className="w-full h-56 rounded-t-2xl" />
      <div className="px-4 py-2">
        <p className="font-bold text-black text-xl">{trek.name}</p>
        <p className="text-[#424242]">
          ₹{trek.price} • {trek.date} • {trek.difficulty}
        </p>
        <p className="text-black text-lg">{trek.description}</p>
        <motion.button
          className="bg-black hidden rounded-xl flex-row justify-center mt-2 text-white font-semibold py-2 w-full group-hover:flex hover:cursor-pointer"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => navigate(`/treks/view/${trek._id}`)}
        >
          View Trek
        </motion.button>
        <motion.button
          className="bg-black hidden rounded-xl flex-row justify-center mt-2 text-white font-semibold py-2 w-full group-hover:flex hover:cursor-pointer"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => navigate(admin ? `/admin/treks/edit/${trek._id}` : `/user/treks/register/${trek._id}`)}
        >
          {admin && "Edit Trek"}
          {!admin && trek.registration && "Register"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TrekCard;
