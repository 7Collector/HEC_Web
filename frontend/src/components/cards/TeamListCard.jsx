import { useState } from "react";

const TeamListCard = ({ member }) => {
  const [role, setRole] = useState(member.role);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleDelete = () => {
    // Delete logic here
  };

  return (
    <div className="team-list-card bg-black text-white font-semibold flex items-center justify-between p-4 rounded-md">
      <h3 className="text-white font-semibold w-1/4">{member?.name || "User"}</h3>
      <div className="flex items-center gap-4 w-3/4">
        <label htmlFor="role" className="text-white">Role:</label>
        <select
          id="role"
          value={role}
          onChange={handleRoleChange}
          disabled={isLoading}
          className="bg-black text-white border border-white px-2 py-1 rounded"
        >
          <option value="secretary">Secretary</option>
          <option value="deputySecretary">Deputy Secretary</option>
          <option value="jointSecretary">Joint Secretary</option>
          <option value="executive">Executive</option>
        </select>
        {isLoading ? (
          <span className="text-gray-400">Saving...</span>
        ) : (
          <>
            {role !== member.role && (
              <button
                onClick={handleSave}
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Save
              </button>
            )}
            <button
              onClick={handleDelete}
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TeamListCard;
