import React, { useState } from 'react';
import Loader from '../utilities/Loading';

const CreateTrekPopup = ({ isOpen, onClose }) => {
  const [trekData, setTrekData] = useState({
    name: '',
    registrationCost: '',
    price: '',
    upi: 'temp',
    altitude: '',
    groupSize: '',
    tagline: '',
    description: '',
    length: '',
    date: '',
    dateString: '',
    difficulty: '',
    days: '',
    distance: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [leaders, setLeaders] = useState([]);
  const [receiptVerifiers, setReceiptVerifiers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrekData(prev => ({ ...prev, [name]: value }));
  };

  const handleLeaderChange = (index, e) => {
    const { name, value } = e.target;
    const newLeaders = [...leaders];
    newLeaders[index][name] = value;
    setLeaders(newLeaders);
  };

  const handleVerifierChange = (index, e) => {
    const { name, value } = e.target;
    const newVerifiers = [...receiptVerifiers];
    newVerifiers[index][name] = value;
    setReceiptVerifiers(newVerifiers);
  };

  const addLeader = (leader) => {
    setLeaders([...leaders, leader]);
  };

  const addVerifier = (verifier) => {
    setReceiptVerifiers([...receiptVerifiers, verifier]);
  };

  const removeLeader = (index) => {
    const newLeaders = leaders.filter((_, i) => i !== index);
    setLeaders(newLeaders);
  };

  const removeVerifier = (index) => {
    const newVerifiers = receiptVerifiers.filter((_, i) => i !== index);
    setReceiptVerifiers(newVerifiers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalTrekData = {
      ...trekData,
      leaders,
      receiptVerifiers,
      date: new Date(trekData.date),
      registrationCost: Number(trekData.registrationCost),
      price: Number(trekData.price),
      altitude: Number(trekData.altitude),
      length: Number(trekData.length),
      days: Number(trekData.days),
      distance: Number(trekData.distance),
      registration: true
    };

    handleCreateTrek(finalTrekData);
    setLoading(true);
  };

  const handleCreateTrek = async (trekData) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/trek",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(trekData),
        }
      );

      if (response.ok) {
        // Handle successful trek creation
        setLoading(false);
        setIsCreateTrekOpen(false);
        // Optionally refresh trek list
      } else {
        // Handle errors
        setLoading(false);
        console.error("Trek creation failed");
      }
    } catch (error) {
      setError("Error creating trek: " + error);
      console.error("Error creating trek:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      {loading ? (
        <Loader style={"w-[800px] h-[400px]"} />
      ):(<div className="bg-[#1A1A1A] text-white p-6 rounded-lg w-[800px] max-h-[90vh] overflow-y-auto no-scrollbar">
        <h2 className="text-2xl mb-4 sticky position-0">Create New Trek</h2>
        <p  className='text-red text-lg'>{error}</p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label htmlFor="name" className="text-sm text-gray-400">Trek Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={trekData.name}
              onChange={handleChange}
              className="bg-[#212121] text-white border-none p-2 rounded"
              required
            />
            <label htmlFor="tagline" className="text-sm text-gray-400">Tagline</label>
            <input
              type="text"
              id="tagline"
              name="tagline"
              value={trekData.tagline}
              onChange={handleChange}
              className="bg-[#212121] text-white border-none p-2 rounded"
              required
            />
          </div>

          <label htmlFor="description" className="text-sm text-gray-400">Description</label>
          <textarea
            id="description"
            name="description"
            value={trekData.description}
            onChange={handleChange}
            className="w-full bg-[#212121] text-white border-none p-2 rounded mb-4"
            required
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <label htmlFor="registrationCost" className="text-sm text-gray-400">Registration Cost</label>
            <input
              type="number"
              id="registrationCost"
              name="registrationCost"
              value={trekData.registrationCost}
              onChange={handleChange}
              className="bg-[#212121] text-white border-none p-2 rounded"
              required
            />
            <label htmlFor="price" className="text-sm text-gray-400">Total Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={trekData.price}
              onChange={handleChange}
              className="bg-[#212121] text-white border-none p-2 rounded"
              required
            />
            <label htmlFor="image" className="text-sm text-gray-400">UPI QR</label>
            <input
              type="file"
              id="image"
              name="image"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  setTrekData(prev => ({ ...prev, upi: reader.result }));
                };
                reader.readAsDataURL(file);
              }}
              className="bg-[#212121] text-white border-none p-2 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <label htmlFor="altitude" className="text-sm text-gray-400">Altitude (m)</label>
            <input
              type="number"
              id="altitude"
              name="altitude"
              value={trekData.altitude}
              onChange={handleChange}
              className="bg-[#212121] text-white border-none p-2 rounded"
              required
            />
            <label htmlFor="groupSize" className="text-sm text-gray-400">Group Size</label>
            <input
              type="number"
              id="groupSize"
              name="groupSize"
              value={trekData.groupSize}
              onChange={handleChange}
              className="bg-[#212121] text-white border-none p-2 rounded"
            />
            <label htmlFor="difficulty" className="text-sm text-gray-400">Difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              value={trekData.difficulty}
              onChange={handleChange}
              className="bg-[#212121] text-white border-none p-2 rounded"
              required
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Challenging">Challenging</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <label htmlFor="length" className="text-sm text-gray-400">Trek Length</label>
            <input
              type="number"
              id="length"
              name="length"
              value={trekData.length}
              onChange={handleChange}
              className="bg-[#212121] text-white border-none p-2 rounded"
              required
            />
            <label htmlFor="days" className="text-sm text-gray-400">Number of Days</label>
            <input
              type="number"
              id="days"
              name="days"
              value={trekData.days}
              onChange={handleChange}
              className="bg-[#212121] text-white border-none p-2 rounded"
              required
            />
            <label htmlFor="distance" className="text-sm text-gray-400">Distance (km)</label>
            <input
              type="number"
              id="distance"
              name="distance"
              value={trekData.distance}
              onChange={handleChange}
              className="bg-[#212121] text-white border-none p-2 rounded"
              required
            />
          </div>

          <label htmlFor="date" className="text-sm text-gray-400">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={trekData.date}
            onChange={handleChange}
            className="w-full bg-[#212121] text-white border-none p-2 rounded"
            required
          />

          <label htmlFor="dateString" className="text-sm text-gray-400">Date Text</label>
          <input
            type="text"
            id="dateString"
            name="dateString"
            placeholder='12 - 24 June'
            value={trekData.dateString}
            onChange={handleChange}
            className="w-full bg-[#212121] text-white border-none p-2 rounded"
            required
          />

          <label htmlFor="image" className="text-sm text-gray-400">Trek Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setTrekData(prev => ({ ...prev, image: reader.result }));
              };
              reader.readAsDataURL(file);
            }}
            className="w-full bg-[#212121] text-white border-none p-2 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200"
            required
          />

          <div className="mb-4">
            <h3 className="text-lg mb-2">Trek Leaders</h3>
            <div>
              <input
                type="text"
                placeholder="Search for Leader"
                className="bg-[#212121] text-white border-none p-2 rounded"
                onChange={(e) => searchUsers(e.target.value, 'leader')}
              />
              <div>
                {leaders
                  .map((user) => (
                    <button
                      key={user.enroll}
                      type="button"
                      onClick={() => addLeader(user)}
                      className="bg-[#212121] text-white p-2 rounded mb-2"
                    >
                      {user.name}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg mb-2">Receipt Verifiers</h3>
            <div>
              <input
                type="text"
                placeholder="Search for Verifier"
                className="bg-[#212121] text-white border-none p-2 rounded"
                onChange={(e) => searchUsers(e.target.value, 'verifier')}
              />
              <div>
                {receiptVerifiers
                  .map((user) => (
                    <button
                      key={user.enroll}
                      type="button"
                      onClick={() => addVerifier(user)}
                      className="bg-[#212121] text-white p-2 rounded mb-2"
                    >
                      {user.name}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#212121] text-white p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-white text-black p-2 rounded"
            >
              Create Trek
            </button>
          </div>
        </form>
      </div>)}
    </div>
  );
};

export default CreateTrekPopup;
