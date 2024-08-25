// import React, { useState, useEffect } from "react";
// import "../css/VotingPercentage.css"; // Import the custom CSS for animation

// function VotingPercentage() {
//   const [percentage1, setPercentage1] = useState(0);
//   const [percentage2, setPercentage2] = useState(0);
//   const [percentage3, setPercentage3] = useState(0);
//   const [currentList, setCurrentList] = useState(0); // State to control which list is shown

//   const localLists = [
//     { title: "عمان العاصمة الأولى", percentage: percentage2 },
//     { title: "عمان العاصمة الثانية", percentage: percentage3 },
//     { title: "دائرة الزرقاء", percentage: percentage1 },
//   ];

//   const progressColors = ["red", "black", "green"]; // Colors for local lists

//   useEffect(() => {
//     const interval1 = setInterval(() => {
//       setPercentage1((prev) => (prev < 100 ? prev + 1 : prev));
//     }, 20);

//     const interval2 = setInterval(() => {
//       setPercentage2((prev) => (prev < 100 ? prev + 1 : prev));
//     }, 20);

//     const interval3 = setInterval(() => {
//       setPercentage3((prev) => (prev < 100 ? prev + 1 : prev));
//     }, 20);

//     // Automatic slider for local lists
//     const listInterval = setInterval(() => {
//       setCurrentList((prevList) => (prevList + 1) % localLists.length);
//     }, 3000); // Change list every 3 seconds

//     return () => {
//       clearInterval(interval1);
//       clearInterval(interval2);
//       clearInterval(interval3);
//       clearInterval(listInterval);
//     };
//   }, []);

//   const getGradientStyle = (color1, color2, color3) => ({
//     borderImage: `linear-gradient(to bottom, ${color1}, ${color2}, ${color3}) 1 / 4px`, // Increased border size to 4px
//     borderImageSlice: 1,
//   });

//   return (
//     <>
//       <h2 className="title relative text-3xl font-bold text-center my-10">
//         نسبة التصويت
//       </h2>
//       <div className="main-wrapper flex justify-center gap-20">
//         {/* Partisan Card */}
//         <div
//           className="card bg-base-100 w-[37rem] shadow-xl animated-border"
//           style={getGradientStyle("red", "black", "green")}
//         >
//           <figure className="px-10 pt-10">
//             <img
//               src="https://cdn4.premiumread.com/?url=https://alrai.com/alraijordan/uploads/images/2024/05/21/553158.jpeg&w=870&q=100&f=jpg?t=1"
//               alt="Shoes"
//               className="rounded-xl"
//             />
//           </figure>
//           <div className="card-body items-center text-center w-">
//             <h2 className="card-title" style={{ color: "red" }}>
//               نسبة الأنتخابات الحزبية
//             </h2>
//             <div className="card-actions">
//               <div
//                 className="radial-progress"
//                 style={{
//                   "--value": percentage1,
//                   color: "red", // Set text color to match border
//                 }}
//                 role="progressbar"
//               >
//                 {percentage1}%
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Local Lists Slider */}
//         <div className="slider-wrapper flex items-center justify-center">
//           {localLists.map((list, index) => (
//             <div
//               key={index}
//               className={`card bg-base-100 w-[37rem] shadow-xl animated-border ${
//                 index === currentList ? "block" : "hidden"
//               }`}
//               style={getGradientStyle("red", "black", "green")}
//             >
//               <figure className="px-10 pt-10">
//                 <img
//                   src="https://cdn4.premiumread.com/?url=https://alrai.com/alraijordan/uploads/images/2024/05/21/553158.jpeg&w=870&q=100&f=jpg?t=1"
//                   alt="Shoes"
//                   className="rounded-xl"
//                 />
//               </figure>
//               <div className="card-body items-center text-center">
//                 <h2
//                   className="card-title"
//                   style={{ color: progressColors[index] }}
//                 >
//                   {list.title}
//                 </h2>
//                 <div className="card-actions">
//                   <div
//                     className="radial-progress"
//                     style={{
//                       "--value": list.percentage,
//                       color: progressColors[index], // Set text color to match border
//                     }}
//                     role="progressbar"
//                   >
//                     {list.percentage}%
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default VotingPercentage;

import React, { useState, useEffect } from "react";

import "../css/VotingPercentage.css"; // Import the custom CSS for animation

function VotingPercentage() {
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  const [percentage3, setPercentage3] = useState(0);
  const [currentList, setCurrentList] = useState(0); // State to control which list is shown

  const localLists = [
    { title: "عمان العاصمة الأولى", percentage: percentage2 },
    { title: "عمان العاصمة الثانية", percentage: percentage3 },
    { title: "دائرة الزرقاء", percentage: percentage1 },
  ];

  const progressColors = ["balck", "black", "clack"]; // Colors for local lists

  useEffect(() => {
    const interval1 = setInterval(() => {
      setPercentage1((prev) => (prev < 100 ? prev + 1 : prev));
    }, 20);

    const interval2 = setInterval(() => {
      setPercentage2((prev) => (prev < 100 ? prev + 1 : prev));
    }, 20);

    const interval3 = setInterval(() => {
      setPercentage3((prev) => (prev < 100 ? prev + 1 : prev));
    }, 20);

    // Automatic slider for local lists
    const listInterval = setInterval(() => {
      setCurrentList((prevList) => (prevList + 1) % localLists.length);
    }, 3000); // Change list every 3 seconds

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
      clearInterval(listInterval);
    };
  }, []);

  const getGradientStyle = (color1, color2, color3) => ({
    borderImage: `linear-gradient(to bottom, ${color1}, ${color2}, ${color3}) 1 / 4px`,
    borderImageSlice: 1,
  });

  return (
    <>
      <h2 className="title text-2xl sm:text-3xl font-bold text-center my-6 sm:my-10 ">
        نسبة التصويت
      </h2>
      <div className="main-wrapper flex flex-col lg:flex-row justify-center items-center gap-8 sm:gap-10 lg:gap-20">
        {/* Partisan Card */}
        <div
          className="card bg-base-100 w-full max-w-[37rem] shadow-xl "
          // style={getGradientStyle("")}
        >
          <figure className="px-4 pt-6 sm:px-10 sm:pt-10">
            <img
              src="https://cdn4.premiumread.com/?url=https://alrai.com/alraijordan/uploads/images/2024/05/21/553158.jpeg&w=870&q=100&f=jpg?t=1"
              alt="Shoes"
              className="rounded-xl w-full"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2
              className="card-title text-lg sm:text-xl"
              // style={{ color: "red" }}
            >
              نسبة الأنتخابات الحزبية
            </h2>
            <div className="card-actions mt-4">
              <div
                className="radial-progress"
                style={{
                  "--value": percentage1,
                  color: "black",
                }}
                role="progressbar"
              >
                {percentage1}%
              </div>
            </div>
          </div>
        </div>

        {/* Local Lists Slider */}
        <div className="slider-wrapper flex items-center justify-center w-full max-w-[37rem]">
          {localLists.map((list, index) => (
            <div
              key={index}
              className={`card bg-base-100 w-full shadow-xl animated-border ${
                index === currentList ? "block" : "hidden"
              }`}
              // style={getGradientStyle("red", "black", "green")}
            >
              <figure className="px-4 pt-6 sm:px-10 sm:pt-10">
                <img
                  src="https://cdn4.premiumread.com/?url=https://alrai.com/alraijordan/uploads/images/2024/05/21/553158.jpeg&w=870&q=100&f=jpg?t=1"
                  alt="Shoes"
                  className="rounded-xl w-full"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2
                  className="card-title text-lg sm:text-xl"
                  style={{ color: progressColors[index] }}
                >
                  {list.title}
                </h2>
                <div className="card-actions mt-4">
                  <div
                    className="radial-progress"
                    style={{
                      "--value": list.percentage,
                      color: progressColors[index],
                    }}
                    role="progressbar"
                  >
                    {list.percentage}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default VotingPercentage;
