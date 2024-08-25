import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderM from "../HeaderM";

function PartyVoting() {
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);

  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = async () => {
    try {
      const response = await axios.get("http://localhost:4026/api/parties");
      setParties(response.data);
    } catch (error) {
      console.error("Error fetching parties:", error);
      Swal.fire("Error", "Failed to fetch parties. Please try again.", "error");
    }
  };

  const handlePartySelect = (partyID) => {
    setSelectedParty(partyID);
  };

  const handleVote = async () => {
    if (selectedParty) {
      const result = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "هل تريد التصويت لهذه القائمة؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم، صوت!",
        cancelButtonText: "إلغاء",
      });

      if (result.isConfirmed) {
        try {
          await axios.post(`http://localhost:4026/api/vote/${selectedParty}`);
          Swal.fire("نجاح", "تم تسجيل تصويتك بنجاح!", "success");
          fetchParties(); // تحديث القائمة بعد التصويت
        } catch (error) {
          console.error("Error recording vote:", error);
          Swal.fire(
            "خطأ",
            "فشل في تسجيل التصويت. يرجى المحاولة مرة أخرى.",
            "error"
          );
        }
      }
    }
  };

  return (
    <>
      <HeaderM />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-40">
        <h1 className="text-2xl font-bold mb-4 text-gray-800"> الاحزاب:</h1>
        <div className="space-y-4">
          {parties.map((party) => (
            <div key={party.partyID} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={`party-${party.partyID}`}
                checked={selectedParty === party.partyID}
                onChange={() => handlePartySelect(party.partyID)}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor={`party-${party.partyID}`}
                className="text-gray-700 text-lg"
              >
                {party.Name}
              </label>
            </div>
          ))}
        </div>
        <button
          onClick={handleVote}
          disabled={!selectedParty}
          className={`mt-4 px-4 py-2 font-semibold text-white rounded-lg focus:outline-none focus:ring-2 ${
            selectedParty
              ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          تصويت
        </button>
      </div>
    </>
  );
}

export default PartyVoting;
