// // VotingStats.jsx
// const VotingStats = ({ localVoteCount, partyVoteCount }) => {
//   return (
//     <div className="flex flex-col space-y-4">
//       <div className="card">
//         <h3 className="text-lg font-semibold">
//           عدد الأشخاص الذين قاموا بالتصويت محليًا
//         </h3>
//         <p className="text-xl">{localVoteCount}</p>
//       </div>
//       <div className="card">
//         <h3 className="text-lg font-semibold">
//           عدد الأشخاص الذين قاموا بالتصويت حزبيًا
//         </h3>
//         <p className="text-xl">{partyVoteCount}</p>
//       </div>
//     </div>
//   );
// };

// export default VotingStats;
//------------------------
// VotingStats.jsx
import Card from "./Card";
const VotingStats = ({ localVoteCount, partyVoteCount }) => {
  return (
    <>
      {/* التعديل على المارجن */}
      <div className="flex flex-col space-y-4 mt-12 ">
        {/* كارد عدد الأشخاص الذين قاموا بالتصويت محليًا */}
        <Card
          title="عدد الأشخاص الذين قاموا بالتصويت محليًا"
          value={localVoteCount}
          subtitle="في الانتخابات المحلية"
          icon={
            <svg
              className="w-6 h-6 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h8M8 16h8m-4-8h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
              />
            </svg>
          }
        />
      </div>
      <div className="flex flex-col space-y-4">
        {/* كارد عدد الأشخاص الذين قاموا بالتصويت حزبيًا */}
        <Card
          title="عدد الأشخاص الذين قاموا بالتصويت حزبيًا"
          value={partyVoteCount}
          subtitle="في الانتخابات الحزبية"
          icon={
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M19 12c0 3.866-3.134 7-7 7S5 15.866 5 12 8.134 5 12 5s7 3.134 7 7z"
              />
            </svg>
          }
        />
      </div>
    </>
  );
};

export default VotingStats;
