import { Carousel } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
export const DebateCatalouge = () => {
  const [debates, setDebates] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:4026/api/debates/getDebates",
          {
            headers: {
              authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0OTI3MzUxNjEiLCJpYXQiOjE3MjM0NjEzODF9.DbcLSU4XSzcKeCgputclDGroqQ3FO_iVg1tFYqWAMOg",
            },
          }
        );
        setDebates(response.data);
        console.log(debates);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <>
      <div className="w-full flex flex-col">
        <Carousel className="rounded-xl w-full"></Carousel>
      </div>
    </>
  );
};
