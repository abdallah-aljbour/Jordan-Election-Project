// // import React from "react";
// // import homvid from "../assets/homevid.mp4";
// // function Faq() {
// //   return (
// //     <>
// //       <div className="wrapper my-8 flex justify-center flex-col items-center">
// //         <div className="collapse collapse-plus bg-base-200">
// //           <input type="radio" name="my-accordion-3" defaultChecked />
// //           <div className="collapse-title text-2xl font-medium text-center">
// //             آلية التصويت
// //           </div>
// //           <div className="collapse-content flex justify-center">
// //             <video width="600" controls>
// //               <source src={homvid} type="video/mp4" />
// //             </video>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default Faq;

// import React from "react";

// import homvid from "../assets/homevid.mp4";

// const votingSteps = [
//   {
//     title: "الخطوة الأولى",
//     content: "التسجيل في الموقع الإلكتروني للتصويت",
//   },
//   {
//     title: "الخطوة الثانية",
//     content: "التحقق من هويتك باستخدام الوثائق المطلوبة",
//   },
//   {
//     title: "الخطوة الثالثة",
//     content: "اختيار المرشح أو القضية التي تريد التصويت لها",
//   },
//   {
//     title: "الخطوة الرابعة",
//     content: "تأكيد اختيارك وإرسال صوتك",
//   },
// ];

// function Faq() {
//   return (
//     <>
//       <h2 className="title relative text-3xl font-bold text-center  before after my-10  mx-6">
//         معلومات قيمة عن الانتخابات
//       </h2>
//       <div className="mb-16 flex flex-col md:flex-row items-start justify-center gap-8 p-8">
//         <div className="w-full md:w-1/2">
//           <video className="w-full h-auto rounded-lg shadow-lg" controls>
//             <source src={homvid} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//         <div className="w-full md:w-1/2">
//           <h2 className="text-2xl font-bold mb-4 text-right">آلية التصويت</h2>
//           <div className="join join-vertical w-full h-[]">
//             {votingSteps.map((step, index) => (
//               <div
//                 key={index}
//                 className=" collapse collapse-arrow join-item border border-base-300 h-28"
//               >
//                 <input type="radio" name="voting-accordion" />
//                 <div className="collapse-title text-2xl font-medium text-right ">
//                   {step.title}
//                 </div>
//                 <div className="collapse-content text-lg text-center font-bold ">
//                   <p>{step.content}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <hr className="text-red-600" />
//       </div>
//     </>
//   );
// }

// export default Faq;
import React from "react";
import homvid from "../assets/homevid.mp4";

const votingSteps = [
  {
    title: "الخطوة الأولى",
    content: "التسجيل في الموقع الإلكتروني للتصويت",
  },
  {
    title: "الخطوة الثانية",
    content: "التحقق من هويتك باستخدام الوثائق المطلوبة",
  },
  {
    title: "الخطوة الثالثة",
    content: "اختيار المرشح أو القضية التي تريد التصويت لها",
  },
  {
    title: "الخطوة الرابعة",
    content: "تأكيد اختيارك وإرسال صوتك",
  },
];

function Faq() {
  return (
    <>
      <h2 className="title relative text-2xl sm:text-3xl font-bold text-center before after my-6 sm:my-10 mx-4">
        معلومات قيمة عن الانتخابات
      </h2>
      <div className="flex flex-col md:flex-row items-start justify-center gap-4 sm:gap-8 p-4 sm:p-8">
        <div className="w-full md:w-1/2">
          <video className="w-full h-auto rounded-lg shadow-lg" controls>
            <source src={homvid} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-right">
            آلية التصويت
          </h2>
          <div className="join join-vertical w-full">
            {votingSteps.map((step, index) => (
              <div
                key={index}
                className="collapse collapse-arrow join-item border border-base-300"
              >
                <input type="radio" name="voting-accordion" />
                <div className="collapse-title text-lg sm:text-2xl font-medium text-right">
                  {step.title}
                </div>
                <div className="collapse-content text-base sm:text-lg text-center font-bold">
                  <p>{step.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Faq;
