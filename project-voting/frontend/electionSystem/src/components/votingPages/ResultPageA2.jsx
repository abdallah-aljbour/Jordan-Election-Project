// src/LocalListings.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ResultPageA2 = () => {
  const [localListings, setLocalListings] = useState([]);
  const [totalVotingCount, setTotalVotingCount] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [votesAboveThreshold, setVotesAboveThreshold] = useState([]);
  const [totalVotesAboveThreshold, setTotalVotesAboveThreshold] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocalListings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4026/api/local-listingsA2"
        );
        setLocalListings(response.data);
      } catch (error) {
        console.error("Error fetching local listings:", error);
      }
    };

    const fetchTotalVotingCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4026/api/total-voting-countA2"
        );
        setTotalVotingCount(response.data.totalVotingCount);
      } catch (error) {
        console.error("Error fetching total voting count:", error);
      }
    };

    const fetchThreshold = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4026/api/thresholdA2"
        );
        setThreshold(response.data.threshold);
      } catch (error) {
        console.error("Error fetching threshold:", error);
      }
    };

    const fetchVotesAboveThreshold = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4026/api/votes-above-thresholdA2"
        );
        console.log("Votes Above Threshold Data:", response.data); // Debug log

        if (response.data && Array.isArray(response.data.listings)) {
          setVotesAboveThreshold(response.data.listings);
          setTotalVotesAboveThreshold(
            response.data.totalVotesAboveThreshold || 0
          );
        } else {
          console.warn("Unexpected data format:", response.data); // Warn if data is not in expected format
          setVotesAboveThreshold([]);
          setTotalVotesAboveThreshold(0);
        }
      } catch (error) {
        console.error("Error fetching votes above threshold:", error);
        setError("An error occurred while fetching data.");
      }
    };

    fetchLocalListings();
    fetchTotalVotingCount();
    fetchThreshold();
    fetchVotesAboveThreshold();
  }, []);

  const formatNumber = (num) => {
    if (typeof num === "number") {
      return num
        .toString()
        .replace(/(\.\d*?[1-9])0+$/, "$1")
        .replace(/\.$/, "");
    }
    return num;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        احصائيات دائرة عمان الثانية
      </h1>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-black text-white">
              <th className="py-3 px-6 border-b text-left">الاسم</th>
              <th className="py-3 px-6 border-b text-left">عدد الأصوات</th>
            </tr>
          </thead>
          <tbody>
            {localListings.map((listing) => (
              <tr
                key={listing.listingID}
                className={`border-b ${
                  listing.votingCount >= threshold
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                <td className="py-3 px-6">{listing.Name}</td>
                <td className="py-3 px-6">
                  {formatNumber(listing.votingCount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-lg font-semibold text-center mb-4 text-black">
        <p>إجمالي عدد الأصوات: {formatNumber(totalVotingCount)}</p>
        <p>العتبة: {formatNumber(threshold)}</p>
      </div>

      <div className="text-lg font-semibold text-center text-black">
        <h2 className="text-xl font-bold mb-4">
          القوائم التي تتجاوز الحد الأدنى:
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-black text-white">
                <th className="py-3 px-6 border-b text-left">الاسم</th>
                <th className="py-3 px-6 border-b text-left">عدد الأصوات</th>
                <th className="py-3 px-6 border-b text-left">
                  المقاعد التي حصلت عليها القائمة
                </th>
                <th className="py-3 px-6 border-b text-left">
                  المرشحون الفائزون
                </th>
              </tr>
            </thead>
            <tbody>
              {votesAboveThreshold.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-3 px-6 text-center">
                    لا توجد بيانات
                  </td>
                </tr>
              ) : (
                votesAboveThreshold.map((listing) => (
                  <tr
                    key={listing.listingID}
                    className="border-b bg-green-100 hover:bg-green-200 transition-colors duration-300"
                  >
                    <td className="py-3 px-6">{listing.Name}</td>
                    <td className="py-3 px-6">
                      {formatNumber(listing.votingCount)}
                    </td>
                    <td className="py-3 px-6">
                      {formatNumber(listing.seatsWon)}
                    </td>
                    <td className="py-3 px-6">
                      <ul>
                        {listing.citizens.map((citizen) => (
                          <li key={citizen.nationalID}>
                            {citizen.name} - الأصوات:{" "}
                            {formatNumber(citizen.votingCount)}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-lg font-semibold text-center mt-4 text-black">
        <p>
          إجمالي عدد الأصوات التي تتجاوز الحد الأدنى:{" "}
          {formatNumber(totalVotesAboveThreshold)}
        </p>
      </div>
    </div>
  );
};

export default ResultPageA2;
