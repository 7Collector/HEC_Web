import { useEffect, useState } from "react";
import Loader from "../utilities/Loading";
import TeamList from "./TeamList";

const ManageTeam = ({ admin }) => {
  const [team, setTeam] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (admin.role === "secretary") {
        fetch("http://localhost:3000/api/admin/team", { credentials: "include" })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch team data");
          }
          return res.json();
        })
        .then((data) => {
          setLoading(false);
          setTeam(data);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching team data:", error);
        });
      
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      {admin.role === "secretary" ? (
        loading ? (
          <Loader style="h-[400px]" />
        ) : (
          <TeamList team={team} />
        )
      ) : (
        <p className="text-2xl text-white font-medium h-[200px] flex items-center justify-center">
          Not Secretary
        </p>
      )}
    </div>
  );
};

export default ManageTeam;
