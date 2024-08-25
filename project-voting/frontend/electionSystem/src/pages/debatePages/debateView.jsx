import React from "react";
import BackStageStream from "../../components/streamComponent/BackstageStream";
import { LivestreamView } from "../../components/streamComponent/liveStreamView";
import { useEffect, useState } from "react";
import axios from "axios";
import { ViewerStream } from "../../components/streamComponent/ViewerStream/ViewerStream";
const StreamView = () => {
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    
    async function getDebators() {
     
       await axios.get(
        encodeURI(
          `http://localhost:4026/api/debates/getDebators?debateID=${localStorage.getItem(
            "debateID"
          ).toString()}`
        ),
        { headers: { authorization:"Bearer "+ localStorage.getItem("token") } }
      ).then((response)=>{
        const debators = response.data.debators;
        console.log(response.data.debators)
              setParticipants(debators);
       
      }).catch((e)=>{
        console.log(e)
      })
        
     
    }
    getDebators() 
      
      
  
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Debater Screens Section */}
      <div className="flex justify-between space-x-4">
        {/* Left Debater Screen */}
        <div className="w-full h-[50rem] bg-gray-200 rounded-lg border-4 border-blue-500 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            {participants.length > 1 &&
             (localStorage.getItem("nationalID") ===
                participants[0]?.debatorID) ||
            localStorage.getItem("nationalID") ===
              participants[1]?.debatorID ? (
              <BackStageStream />
            ) : (
              <ViewerStream/>
            )}
          </div>
        </div>
      </div>

      {/* Debate Information Card Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2"></h2>
          <p className="text-gray-600 mb-4"></p>
          <p className="text-lg"></p>
        </div>
      </div>
    </div>
  );
};

export default StreamView;
