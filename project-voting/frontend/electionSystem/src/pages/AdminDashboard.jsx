import { useState } from "react";
import Overview from "./Overview";
import UserManagement from "./UserManagement";
import ElectionManagement from "./ElectionManagement";
import PaidAdvertisements from "./dashadvertising";
import UserMessages from "./usermessages";
import cover from "../assets/images/10.svg";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div
      className="bg-no-repeat bg-left-top h-64 w-full z-50 relative bg-white space-y-4 p-4 md:p-24"
      style={{
        backgroundImage: `url(${cover})`,
        backgroundSize: "30%",
      }}
    >
      {/* Sidebar */}
      <aside className="w-72 bg-gray-800 text-gray-100 p-6 flex-shrink-0 fixed right-0 top-0 h-full">
        <h2 className="text-2xl font-bold mb-6">لوحة التحكم</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <button
                className={`w-full px-4 py-2 font-semibold rounded-md ${
                  activeTab === "overview"
                    ? "bg-white text-gray-800"
                    : "bg-gray-700 text-gray-100"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                الصفحة الرئيسية
              </button>
            </li>
            <li className="mb-4">
              <button
                className={`w-full px-4 py-2 font-semibold rounded-md ${
                  activeTab === "user-management"
                    ? "bg-white text-gray-800"
                    : "bg-gray-700 text-gray-100"
                }`}
                onClick={() => setActiveTab("user-management")}
              >
                إدارة المستخدمين
              </button>
            </li>
            <li className="mb-4">
              <button
                className={`w-full px-4 py-2 font-semibold rounded-md ${
                  activeTab === "Advertising"
                    ? "bg-white text-gray-800"
                    : "bg-gray-700 text-gray-100"
                }`}
                onClick={() => setActiveTab("Advertising")}
              >
                الاعلانات
              </button>
            </li>
            <li className="mb-4">
              <button
                className={`w-full px-4 py-2 font-semibold rounded-md ${
                  activeTab === "election-management"
                    ? "bg-white text-gray-800"
                    : "bg-gray-700 text-gray-100"
                }`}
                onClick={() => setActiveTab("election-management")}
              >
                إدارة الانتخابات
              </button>
            </li>

            <li className="mb-4">
              <button
                className={`w-full px-4 py-2 font-semibold rounded-md ${
                  activeTab === "masseges"
                    ? "bg-white text-gray-800"
                    : "bg-gray-700 text-gray-100"
                }`}
                onClick={() => setActiveTab("masseges")}
              >
                الرسائل
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 mr-72 bg-white">
        {activeTab === "overview" && <Overview />}
        {activeTab === "user-management" && <UserManagement />}
        {activeTab === "election-management" && <ElectionManagement />}
        {activeTab === "masseges" && <UserMessages />}
        {activeTab === "Advertising" && <PaidAdvertisements />}
      </main>
    </div>
  );
};

export default AdminDashboard;
