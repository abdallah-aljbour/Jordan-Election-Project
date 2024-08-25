import { useState, useEffect } from "react";
import axios from "axios";
import VotingStats from "../components/VotingStats";
import Card from "../components/Card";
import VotingPercentage from "../components/VotingPercentage";
import DistrictVotingPercentage from "../components/DistrictZA";
import Candidatemembers from "../components/CandidateCount"; // استدعاء المكون
// import cover from "../assets/images/10.svg";
const Overview = () => {
  const [districtVotes, setDistrictVotes] = useState({});
  const [votingStats, setVotingStats] = useState({
    localVoteCount: 0,
    partyVoteCount: 0,
  });

  useEffect(() => {
    const fetchVotingData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4026/api/voting-data"
        );
        const { districtVotes } = response.data;
        setDistrictVotes(districtVotes);
      } catch (error) {
        console.error("Error fetching voting data:", error);
      }
    };

    const fetchVotingStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4026/test/votingstats"
        );
        const { localVoteCount, partyVoteCount } = response.data;
        setVotingStats({ localVoteCount, partyVoteCount });
      } catch (error) {
        console.error("Error fetching voting stats:", error);
      }
    };

    fetchVotingData();
    fetchVotingStats();
  }, []);

  return (
    // هنا التباعد بين الكارد
    <div className=" bg-white">
      {/* <div className="w-full h-64 bg-cover bg-center flex justify-center items-center">
  <img src={cover} alt="flag" className="h-full object-cover"/>
</div> */}

      <h1 className="text-5xl font-bold text-[#201D1E] font-amiri text-center mb-6 mt-6">
        نظرة عامة
      </h1>

      <div className=" flex justify-center space-x-8 rtl:space-x-reverse">
        <div className="bg-white shadow-2xl rounded-lg p-8 transition transform hover:scale-125 hover:shadow-3xl hover:shadow-[#DA2A29] hover:bg-gray-50 duration-300 ease-in-out">
          <VotingPercentage />
        </div>
      </div>
      {/* test---------------------- */}
      <div className="p-4">
        {/* <Card
        title="حالة الانتخابات"
        value="نشطة"
        subtitle="تنتهي خلال 3 أيام"
        icon={
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
      >
        <VotingPercentage />
      </Card> */}
      </div>
      {/* //----------------------------- */}

      {/* <div className="flex justify-center space-x-8 rtl:space-x-reverse ">
        <DistrictVotingPercentage districtName="ZA" votes={districtVotes['ZA']} />
        <DistrictVotingPercentage districtName="A1" votes={districtVotes['A1']} />
        <DistrictVotingPercentage districtName="A2" votes={districtVotes['A2']} />
      </div>
       */}
      <div className="p-4 flex justify-center space-x-8 rtl:space-x-reverse">
        {/* كارد لكل مكون DistrictVotingPercentage */}
        <div className="bg-white shadow-2xl rounded-lg p-8 transition transform hover:scale-125 hover:shadow-3xl hover:shadow-[#DA2A29] hover:bg-gray-50 duration-300 ease-in-out">
          <DistrictVotingPercentage
            districtName="ZA"
            votes={districtVotes["ZA"]}
          />
        </div>

        <div className="bg-white shadow-2xl rounded-lg p-8 transition transform hover:scale-125 hover:shadow-3xl hover:shadow-[#DA2A29] hover:bg-gray-50 duration-300 ease-in-out">
          <DistrictVotingPercentage
            districtName="A1"
            votes={districtVotes["A1"]}
          />
        </div>

        <div className="bg-white shadow-2xl rounded-lg p-8 transition transform hover:scale-125 hover:shadow-3xl hover:shadow-[#DA2A29] hover:bg-gray-50 duration-300 ease-in-out">
          <DistrictVotingPercentage
            districtName="A2"
            votes={districtVotes["A2"]}
          />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 mt-8">
        <VotingStats
          localVoteCount={votingStats.localVoteCount}
          partyVoteCount={votingStats.partyVoteCount}
        />

        <div className="flex flex-col items-center space-y-4 mt-8">
          <Candidatemembers /> {/* استدعاء مكون عرض عدد المرشحين هنا */}
        </div>
      </div>
    </div>
  );
};

export default Overview;
