import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
  StreamTheme,
} from "@stream-io/video-react-sdk";
import { LivestreamView } from "./liveStreamView";
import { useEffect, useState } from "react";
import axios from "axios";

const apiKey = "682pm9spe7t3";

export default function BackStageStream() {
  const [passedClient, setClient] = useState({});
  const [passedCall, setCall] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          encodeURI(
            `http://localhost:4026/api/debates/getDebator?debateID=${localStorage.getItem(
              "debateID"
            )}`
          ),
          {
            headers: {
              authorization:"bearer "+ localStorage.getItem("token"),
            },
          }
        );
        const debators = response.data.debators.debatorData;
        const token = response.data.debators.debator.debatorToken;
        console.log(token);
        if (debators) {
          const userId = debators.nationalID;
          const user = { id: userId, name: debators.name };
console.log(userId)
          const client = new StreamVideoClient({ apiKey, user, token });
          console.log(client)
          setClient(client);

          const callId = 10;
          const call = client.call("livestream", callId);
          
          setCall(call);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);
console.log(passedCall);
console.log(passedClient)
  return (
    passedClient.call &&
    passedCall.id && (
      <StreamVideo client={passedClient}>
        <StreamCall call={passedCall}>
          <StreamTheme>
            <LivestreamView />
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
    )
  );
}
