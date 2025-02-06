import { useState } from "react";
import { useNavigate } from "react-router-dom";

const YourProfile = ({ style, profile, setLoggedIn }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(profile.number);
  const [signature, setSignature] = useState(profile.signature || "");
  const [isEditingNumber, setIsEditingNumber] = useState(false);
  const [isEditingSignature, setIsEditingSignature] = useState(false);
  const [tempSignature, setTempSignature] = useState(signature);

  const handleNumberSave = () => {
    setIsEditingNumber(false);
    setLoading(true);
    fetch("http://localhost:3000/api/user/profile", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number }),
    }).then((res) => {
      if (res.ok) {
        setLoading(false);
        profile.number = number;
      } else {
        setNumber(profile.number);
      }
    });
  };

  const handleSignatureSave = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempSignature(reader.result);
        setIsEditingSignature(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSignature = () => {
    setSignature(tempSignature);
    setIsEditingSignature(false);
    // API call to save signature
  };

  const handleLogout = () => {
    setLoggedIn(false);
    document.cookie =
      "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    navigate("/");
  };

  return (
    <div className={`${style} text-white w-full max-w-2xl`}>
      <div className="space-y-6">
        {/* Profile Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">Name</span>
            <span className="text-gray-300 text-xl font-semibold">
              {profile.name}
            </span>
          </div>
        </div>

        <hr className="border-[#212121]" />

        <div className="space-y-4">
          <div className="flex items-center justify-between space-y-4">
            <span className="text-xl font-semibold">Email</span>
            <span className="text-gray-300 text-xl font-semibold">
              {profile.email}
            </span>
          </div>
        </div>
        
        <hr className="border-[#212121]" />

        {/* Mobile Number */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">Mobile Number</span>
            <div className="flex items-center space-x-4">
              {isEditingNumber ? (
                <input
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="bg-[#121212] text-white border text-xl font-semibold border-gray-600 p-2 rounded-md"
                />
              ) : (
                <span className="text-gray-300 text-xl font-semibold">
                  {number}
                </span>
              )}
              <button
                className="bg-white text-black font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => {
                  if (isEditingNumber) {
                    handleNumberSave();
                  }
                  setIsEditingNumber(!isEditingNumber);
                }}
              >
                {isEditingNumber ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>

        <hr className="border-[#212121]" />

        {/* Signature */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">Signature</span>
            <div className="flex flex-col items-end space-y-2">
              {tempSignature || signature ? (
                <img
                  src={isEditingSignature ? tempSignature : signature}
                  alt="Signature"
                  className="h-16 bg-white p-2 rounded-md"
                />
              ) : (
                <span className="text-gray-400 italic">
                  No signature uploaded
                </span>
              )}
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSignatureSave}
                  className="bg-[#121212] text-white border border-gray-600 p-2 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200"
                />
                {isEditingSignature && (
                  <button
                    onClick={handleSaveSignature}
                    className="bg-white text-black font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <hr className="border-[#212121]" />

        {/* Logout Button */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-white text-black font-semibold px-8 py-3 rounded-md hover:bg-gray-200 hover:cursor-pointer transition-colors text-xl"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourProfile;
