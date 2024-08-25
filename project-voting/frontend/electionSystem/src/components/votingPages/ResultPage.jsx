// src/LocalListings.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultPageA1 from "./ResultPageA1";
import ResultPageA2 from "./ResultPageA2";
import HeaderM from "../HeaderM";
import FooterM from "../Footer";
const ResultPage = () => {
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
          "http://localhost:4026/api/local-listings"
        );
        setLocalListings(response.data);
      } catch (error) {
        console.error("Error fetching local listings:", error);
      }
    };

    const fetchTotalVotingCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4026/api/total-voting-count"
        );
        setTotalVotingCount(response.data.totalVotingCount);
      } catch (error) {
        console.error("Error fetching total voting count:", error);
      }
    };

    const fetchThreshold = async () => {
      try {
        const response = await axios.get("http://localhost:4026/api/threshold");
        setThreshold(response.data.threshold);
      } catch (error) {
        console.error("Error fetching threshold:", error);
      }
    };

    const fetchVotesAboveThreshold = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4026/api/votes-above-threshold"
        );
        console.log("Votes Above Threshold Data:", response.data); // Debug log

        if (response.data && Array.isArray(response.data.listings)) {
          setVotesAboveThreshold(response.data.listings);
          setTotalVotesAboveThreshold(
            response.data.totalVotesAboveThreshold || 0
          );
        } else {
          console.warn("Unexpected data format:", response.data);
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

  // Function to format numbers to integers
  const formatNumber = (number) => {
    return Math.round(number);
  };

  return (
    <>
      <HeaderM />
      <div class="bg-gray-100 min-h-screen p-6 md:p-10 lg:p-16">
        <h1 class="text-3xl font-bold text-center mb-8 text-black">
          نتائج التصويت لدائرة الزرقاء
        </h1>

        <div class="overflow-x-auto mb-8">
          <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr class="bg-[#01924C] text-white">
                <th class="py-3 px-6 border-b">الاسم</th>
                <th class="py-3 px-6 border-b">الأصوات</th>
              </tr>
            </thead>
            <tbody>
              {localListings.map((listing) => (
                <tr
                  key={listing.listingID}
                  class={`border-b transition-colors duration-300 ${
                    listing.votingCount >= threshold
                      ? "bg-green-100 hover:bg-green-200"
                      : "bg-red-100 hover:bg-red-200"
                  }`}
                >
                  <td class="py-3 px-6 text-center md:text-right">
                    <div class="flex items-center justify-center md:justify-end">
                      <span class="ml-2 text-[#01924C] font-bold">
                        {listing.Name.charAt(0)}
                      </span>
                      <span>{listing.Name.slice(1)}</span>
                    </div>
                  </td>
                  <td class="py-3 px-6 text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start">
                      <span class="ml-2 font-bold">
                        {formatNumber(listing.votingCount)}
                      </span>
                      <span class="text-[#01924C]">صوت</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div class="text-lg font-semibold text-center mb-8 text-black">
          <p>إجمالي عدد الأصوات: {formatNumber(totalVotingCount)}</p>
          <p>العتبة: {formatNumber(threshold)}</p>
        </div>

        <div class="text-lg font-semibold text-center text-black">
          <h2 class="text-xl font-bold mb-4">
            القوائم التي تتجاوز الحد الأدنى:
          </h2>
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr class="bg-[#01924C] text-white">
                  <th class="py-3 px-6 border-b">الاسم</th>
                  <th class="py-3 px-6 border-b">الأصوات</th>
                  <th class="py-3 px-6 border-b">
                    المقاعد التي حصلت عليها القائمة
                  </th>
                  <th class="py-3 px-6 border-b">المرشحون الفائزون</th>
                </tr>
              </thead>
              <tbody>
                {votesAboveThreshold.length === 0 ? (
                  <tr>
                    <td colSpan="4" class="py-3 px-6 text-center">
                      لا توجد بيانات
                    </td>
                  </tr>
                ) : (
                  votesAboveThreshold.map((listing) => (
                    <tr
                      key={listing.listingID}
                      class="border-b bg-green-100 hover:bg-green-200 transition-colors duration-300"
                    >
                      <td class="py-3 px-6 text-center md:text-right">
                        <div class="flex items-center justify-center md:justify-end">
                          <span class="ml-2 text-[#01924C] font-bold">
                            {listing.Name.charAt(0)}
                          </span>
                          <span>{listing.Name.slice(1)}</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-center md:text-left">
                        <div class="flex items-center justify-center md:justify-start">
                          <span class="ml-2 font-bold">
                            {formatNumber(listing.votingCount)}
                          </span>
                          <span class="text-[#01924C]">صوت</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-center md:text-left">
                        <div class="flex items-center justify-center md:justify-start">
                          <span class="ml-2 font-bold">
                            {formatNumber(listing.seatsWon)}
                          </span>
                          <span class="text-[#01924C]">مقعد</span>
                        </div>
                      </td>
                      <td class="py-3 px-6">
                        <ul class="space-y-2">
                          {listing.citizens.map((citizen) => (
                            <li
                              key={citizen.nationalID}
                              class="flex items-center justify-between"
                            >
                              <span>{citizen.name}</span>
                              <div class="flex items-center">
                                <span class="ml-2 font-bold">
                                  {formatNumber(citizen.votingCount)}
                                </span>
                                <span class="text-[#01924C]">صوت</span>
                              </div>
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

        <ResultPageA1 />
        <ResultPageA2 />
      </div>
      <FooterM />
    </>
  );
};

export default ResultPage;
