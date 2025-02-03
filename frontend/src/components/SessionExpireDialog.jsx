import React from "react";
import { useNavigate } from "react-router-dom";

const SessionExpiredDialog = ({ onClose, setLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-black text-white p-8 rounded-md w-80 text-center border border-[#212121]">
        <h2 className="text-xl font-bold mb-4">Session Expired</h2>
        <p className="mb-4">Your session has expired. Please log in again.</p>
        <div className="flex flex-row gap-4 justify-center">
          <button
            onClick={() => {
              navigate('/');
              setLoggedIn(false);
              document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
              onClose()
            }}
            className="bg-[#1e1e1e] text-white font-semibold px-4 py-2 rounded hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              window.location.href = "http://localhost:3000/auth/omniport";
              onClose();
            }}
            className="bg-white text-black font-semibold px-4 py-2 rounded hover:cursor-pointer"
          >
            Login Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredDialog;
