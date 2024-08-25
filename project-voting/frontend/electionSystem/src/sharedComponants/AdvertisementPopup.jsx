import { useState, useEffect } from "react";
import axios from "axios";
import image from "../assets/images/candidate.jpg";

function AdvertisementPopup() {
  const [showPopup, setShowPopup] = useState(false); // بدء عدم عرض النافذة
  const [advertisements, setAdvertisements] = useState([]); // حالة لتخزين الإعلانات
  const [currentAd, setCurrentAd] = useState(null); // حالة للإعلان الحالي

  useEffect(() => {
    // جلب الإعلانات من الـ backend
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4026/api/getAdvertisement"
        );
        console.log("value", response.data);
        if (response.data.showPopup && response.data.advertisments.length > 0) {
          setAdvertisements(response.data.advertisments);
        }
      } catch (error) {
        console.error("Error fetching advertisements", error);
      }
    };

    fetchAdvertisements();
  }, []);
  //   console.log("image",currentAd.pictuer);

  useEffect(() => {
    // تعيين تكرار ظهور النافذة كل 30 ثانية
    const interval = setInterval(() => {
      if (advertisements.length > 0) {
        const randomIndex = Math.floor(Math.random() * advertisements.length); // اختيار إعلان عشوائي
        setCurrentAd(advertisements[randomIndex]); // تعيين الإعلان الحالي
        setShowPopup(true); // إظهار النافذة
      }
    }, 10000);

    // تنظيف الـ interval عند تفكيك المكون
    return () => clearInterval(interval);
  }, [advertisements]);

  // إخفاء النافذة بعد 10 ثواني
  useEffect(() => {
    console.log("showPopup value: ", showPopup);

    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 10000); // 10 ثواني بعد إظهار النافذة

      // تنظيف الـ timer عند تفكيك المكون
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <>
      {showPopup && currentAd && (
        <div className="fixed z-50 overflow-hidden transform bg-white rounded-lg shadow-lg bottom-4 right-4 w-72 perspective-1000 rotate-y-2 rotate-x-2 h-96">
          <div className="relative p-4">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* {currentAd.pictuer && ( */}
            <div className="relative mb-4">
              <img
                src={`http://localhost:4026/api/images/${currentAd.pictuer}`}
                alt="Advertisement"
                className="object-cover w-full h-48 mt-4"
              />
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-white"></div>
            </div>

            <h2 className="mb-1 text-xl font-bold text-center text-gray-800">
              {currentAd.advertiserName}
            </h2>

            <h2 className="mb-1 text-xl font-bold text-center text-gray-800">
              {currentAd.title}
            </h2>
            <p className="text-sm text-center text-gray-600">
              {currentAd.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default AdvertisementPopup;
