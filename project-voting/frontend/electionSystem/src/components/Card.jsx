// const Card = ({ title, value, subtitle, icon, customContent }) => {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 min-w-[50rem] min-h-[150px] flex flex-col ">
//       <div className="flex items-center space-x-4 mb-4">
//         <div className="flex-shrink-0">{icon}</div>
//         <div className="flex-1">
//           <h2 className="text-xl font-semibold text-end">{title}</h2>
//           <p className="text-gray-600">{subtitle}</p>
//           <p className="text-lg font-bold">{value}</p>
//         </div>
//       </div>
//       {customContent && (
//         <div className=" flex-1">
//           {customContent} {/* عرض المحتوى المخصص هنا */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Card;

const Card = ({ title, value, subtitle, icon, customContent }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 min-w-[50rem] min-h-[150px] flex flex-col ">
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
          <p className="text-lg font-bold">{value}</p>
        </div>
      </div>
      {customContent && (
        <div className=" flex-1">
          {customContent} {/* عرض المحتوى المخصص هنا */}
        </div>
      )}
    </div>
  );
};

export default Card;
