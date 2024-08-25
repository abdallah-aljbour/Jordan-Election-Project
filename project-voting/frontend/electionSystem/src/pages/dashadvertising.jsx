import { useState, useEffect } from "react";
import axios from "axios";

const DashAdvertising = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetchPaidAds(); // جلب الإعلانات عند تحميل الصفحة
  }, []);

  const fetchPaidAds = async () => {
    try {
      const response = await axios.get("http://localhost:4026/test/paid-ads");
      setAds(response.data);
    } catch (error) {
      console.error("Error fetching paid advertisements:", error);
    }
  };

  const handleApprove = async (advertismentID) => {
    try {
      await axios.put(
        `http://localhost:4026/test/advertisements/${advertismentID}`,
        { isApproved: true }
      );
      fetchPaidAds(); // إعادة تحميل البيانات بعد التحديث
    } catch (error) {
      console.error("Error approving advertisement:", error);
    }
  };

  const handleReject = async (advertismentID) => {
    try {
      await axios.put(
        `http://localhost:4026/test/advertisements/${advertismentID}`,
        { isApproved: false }
      );
      fetchPaidAds(); // إعادة تحميل البيانات بعد التحديث
    } catch (error) {
      console.error("Error rejecting advertisement:", error);
    }
  };

  return (
    <div className=" bg-white ">
      <h2 className="text-5xl font-bold text-[#201D1E] font-amiri text-center mb-6 mt-6">
        إعلانات مدفوعة
      </h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              {/* رؤوس الأعمدة */}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الصورة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                العنوان
              </th>
              {/* <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الوصف
              </th> */}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                اسم المعلن
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                رقم الاعلان
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الحالة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الإجراء
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ads.map((ad) => (
              <tr key={ad.advertismentID}>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <img
                    src={ad.picture}
                    alt={ad.title}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {ad.title}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-right">
                  {ad.description}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {ad.advertiser.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {ad.advertismentID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {ad.isApproved ? "مقبول" : "مرفوض"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleApprove(ad.advertismentID)}
                    className="bg-green-500 text-white font-semibold py-1 px-2 rounded mr-2 hover:bg-green-600"
                  >
                    قبول
                  </button>
                  <button
                    onClick={() => handleReject(ad.advertismentID)}
                    className="bg-red-500 text-white font-semibold py-1 px-2 rounded hover:bg-red-600"
                  >
                    رفض
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashAdvertising;
