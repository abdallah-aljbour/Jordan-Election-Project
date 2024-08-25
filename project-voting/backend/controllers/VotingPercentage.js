// import React, { useState, useEffect } from 'react';
// import CirclePercentage from './CirclePercentage'; // تأكد أن هذا المسار صحيح، بناءً على مكان وجود مكون CirclePercentage في مشروعك

// const VotingPercentage = () => {
//   const [percentage, setPercentage] = useState(null);

//   useEffect(() => {
//     // Fetch the voting percentage from the backend
//     fetch('http://localhost:4026/votingresult/total-voting-percentage')
//       .then(response => response.json())
//       .then(data => {
//         setPercentage(data.totalVotingPercentage);
//       })
//       .catch(error => {
//         console.error('Error fetching the voting percentage:', error);
//       });
//   }, []);

//   if (percentage === null) {
//     return <div>Loading...</div>; // يمكن استبدالها بشيء آخر يظهر أثناء التحميل
//   }

//   return (
//     <div className="space-y-8">
//       <div className="flex justify-center">
//         <CirclePercentage percentage={percentage} title="المشاركة الكلية" subtitle="نسبة الإقبال على التصويت" />
//       </div>
//     </div>
//   );
// };

// export default VotingPercentage;
