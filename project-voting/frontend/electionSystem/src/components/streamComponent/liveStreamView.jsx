import {
  useCallStateHooks,
  CallControls,
  LivestreamLayout,
  PaginatedGridLayout,
  useCall
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

export const LivestreamView = () => {
  const { useParticipants ,} = useCallStateHooks();
const call=useCall()
  const participants = useParticipants();
  const [debatorsData, setDebators] = useState([]);

  useEffect(() => {
    async function getDebators() {
      const response = await axios.get(
        `http://localhost:4026/api/debates/getDebators?debateID=${localStorage.getItem(
          "debateID"
        )}`,
        { headers: { authorization:"Bearer "+ localStorage.getItem("token") } }
      );
      const  debators  = response.data.debators;
      setDebators(debators);
      call.join({create:true})
    }
    getDebators();
  }, []);
console.log(debatorsData[0])
  return (
    <>
      <div className="flex flex-col ">
        <div className="w-[70rem] flex h-[40rem] gap-28 text-white">
          
        <PaginatedGridLayout
              
                floatingParticipantProps={{ position: "bottom-right" }}
                showSpeakerName={true}
              />
        </div>
        <CallControls />
      </div>
    </>
  );
};
