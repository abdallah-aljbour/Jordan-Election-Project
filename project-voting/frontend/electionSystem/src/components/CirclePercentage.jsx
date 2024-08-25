const CirclePercentage = ({ percentage, title, subtitle }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg
          className="absolute inset-0 w-full h-full transform rotate-[-90deg]"
          viewBox="0 0 36 36"
        >
          <circle
            className="text-gray-300"
            stroke="currentColor"
            fill="transparent"
            strokeWidth="3"
            cx="18"
            cy="18"
            r="16"
          />
          <circle
            className="text-red-500"
            stroke="currentColor"
            fill="transparent"
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
            cx="18"
            cy="18"
            r="16"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800">
          {percentage}%
        </div>
      </div>
      <div className="text-center mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

export default CirclePercentage;
