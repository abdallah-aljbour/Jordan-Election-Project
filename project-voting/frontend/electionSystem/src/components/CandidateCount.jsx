import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Candidatemembers = () => {
  const [candidateCount, setCandidateCount] = useState(0);

  useEffect(() => {
    const fetchCandidateCount = async () => {
      try {
        console.log("Fetching candidate count..."); // قبل استدعاء البيانات
        const response = await axios.get(
          "http://localhost:4026/test/candidate"
        );
        console.log("Full API Response:", response); // طباعة الرد الكامل

        const { candidatenum } = response.data; // استخدام المفتاح الصحيح هنا
        console.log("Candidate Count Data:", candidatenum); // طباعة العدد
        setCandidateCount(candidatenum);
      } catch (error) {
        console.error("Error fetching candidate count:", error);
      }
    };

    fetchCandidateCount();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <Card
        title=" عدد المرشحين"
        value={candidateCount}
        subtitle="في جميع المناطق"
        icon={
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        }
      />
    </div>
  );
};

export default Candidatemembers;
