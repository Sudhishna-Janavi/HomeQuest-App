import React, { useState } from "react";

const InvestorDashboard = () => {
  const [hdbPrice, setHdbPrice] = useState(""); // Start with an empty string
  const [monthlyRent, setMonthlyRent] = useState(""); // Start with an empty string
  const [holdTime, setHoldTime] = useState(""); // Start with an empty string
  const [roi, setRoi] = useState(null);
  const [error, setError] = useState("");

  const calculateROI = () => {
    // Ensure the values are valid before calculating
    if (!hdbPrice || !monthlyRent || !holdTime) {
      setError("Please fill in all fields.");
      setRoi(null);
      return;
    }

    const priceNum = parseFloat(hdbPrice);
    const rentNum = parseFloat(monthlyRent);
    const yearsNum = parseFloat(holdTime);

    if (priceNum <= 0 || rentNum <= 0 || yearsNum <= 0) {
      setError("Please enter valid positive numbers for all fields.");
      setRoi(null);
      return;
    }

    // Calculate total rent for the given hold time (assuming monthly rent * 12 months per year)
    const totalRent = rentNum * 12 * yearsNum;

    // Calculate ROI based on the formula
    const roiValue = ((totalRent - priceNum) / priceNum) * 100;
    setRoi(roiValue.toFixed(2)); // Set ROI value and round it to 2 decimal places
    setError(""); // Reset error if calculation is successful
  };

  return (
    <div className="min-h-screen p-6 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(/backgroundImg.jpeg)` }}>
      <h1 className="text-4xl font-extrabold text-center mb-2">Investor Dashboard</h1>
      <h1 className="text-2xl font-bold mb-6 text-center">ROI Calculator</h1>

      <section className="mb-8">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl w-full">
          {/* Placeholder for graph */}
          <div className="w-full md:w-1/2">
            <img
              src="https://via.placeholder.com/400x300?text=Chart"
              alt="ROI Chart"
              className="w-full h-auto rounded shadow"
            />
          </div>

          {/* Calculator */}
          <div className="w-full md:w-1/2 space-y-4">
            <div>
              <label className="block text-sm font-medium">HDB Price</label>
              <input
                type="number"
                placeholder="Value"
                className="w-full border rounded p-2"
                value={hdbPrice}
                onChange={(e) => setHdbPrice(e.target.value)} // Allow empty value
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Monthly Rent</label>
              <input
                type="number"
                placeholder="Value"
                className="w-full border rounded p-2"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value)} // Allow empty value
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Expected Hold Time (Years)</label>
              <input
                type="number"
                placeholder="Value"
                className="w-full border rounded p-2"
                value={holdTime}
                onChange={(e) => setHoldTime(e.target.value)} // Allow empty value
              />
            </div>

            <button
              onClick={calculateROI}
              className="w-full bg-black text-white py-2 px-4 rounded mt-4 hover:bg-gray-800"
            >
              Calculate
            </button>

            {roi !== null && (
              <div className="mt-4 text-lg font-medium">
                ROI: <span className="font-bold">{roi}%</span>
              </div>
            )}
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Search History</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Resale 3BR units in Punggol (Mar 2025)</li>
          <li>Rental condos with less than 4% yield (Feb 2025)</li>
        </ul>
      </section>
    </div>
  );
};

export default InvestorDashboard;
