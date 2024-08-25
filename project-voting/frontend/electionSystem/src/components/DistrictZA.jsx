import { useEffect, useState } from "react";
import axios from "axios";
import CirclePercentage from "../components/CirclePercentage"; // تأكد من أن المسار صحيح

const DistrictVotingPercentage = ({ districtName }) => {
  const [percentage, setPercentage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPercentage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4026/api/districts/${districtName}`
        );
        setPercentage(response.data.votingPercentage);
      } catch (err) {
        setError("Error fetching data");
      }
    };

    fetchPercentage();
  }, [districtName]);

  if (error) {
    return <p>{error}</p>;
  }

  if (percentage === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-center">
        <CirclePercentage
          percentage={percentage.toFixed(2)}
          title={`دائرة ${districtName}`}
          subtitle={`نسبة التصويت في دائرة ${districtName}`}
        />
      </div>
    </>
  );
};

export default DistrictVotingPercentage;
