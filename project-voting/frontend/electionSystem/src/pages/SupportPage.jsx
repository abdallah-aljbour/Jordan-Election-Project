import React from "react";
import ChatBot from "../components/chatbot";
import ChatPopup from "../components/chatpopup";
import HeaderM from "../components/HeaderM";
import Footer from "../components/Footer";
import { FaQuestionCircle, FaBook, FaPhone, FaEnvelope } from "react-icons/fa";

const SupportPage = () => {
  return (
    <>
      <HeaderM />
      <div className="min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-12 text-4xl font-bold text-center text-gray-900">
            مركز الدعم
          </h1>

          <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-4">
            <SupportCard
              icon={<FaQuestionCircle className="w-12 h-12 text-green-600" />}
              title="الأسئلة الشائعة"
              description="اعثر على إجابات للأسئلة الأكثر شيوعًا"
            />
            <SupportCard
              icon={<FaBook className="w-12 h-12 text-blue-600" />}
              title="دليل المستخدم"
              description="تصفح دليل المستخدم الخاص بنا للحصول على معلومات مفصلة"
            />
            <SupportCard
              icon={<FaPhone className="w-12 h-12 text-yellow-600" />}
              title="اتصل بنا"
              description="تحدث مع أحد ممثلي خدمة العملاء لدينا"
            />
            <SupportCard
              icon={<FaEnvelope className="w-12 h-12 text-red-600" />}
              title="البريد الإلكتروني"
              description="أرسل لنا بريدًا إلكترونيًا وسنرد عليك في أقرب وقت ممكن"
            />
          </div>

          <div className="p-6 mb-12 bg-white rounded-lg shadow-xl">
            <h2 className="mb-6 text-2xl font-semibold text-center text-gray-900">
              روبوت الدردشة
            </h2>
            <ChatBot />
          </div>

          <div className="p-6 bg-white rounded-lg shadow-xl">
            <h2 className="mb-6 text-2xl font-semibold text-center text-gray-900">
              تواصل مع الدعم المباشر
            </h2>
            <p className="mb-4 text-center text-gray-600">
              إذا كنت بحاجة إلى مساعدة إضافية، يمكنك التواصل مع فريق الدعم
              المباشر لدينا.
            </p>
            <div className="flex justify-center"></div>
          </div>
        </div>

        <ChatPopup />
      </div>
      <Footer />
    </>
  );
};

const SupportCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 transition duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
      <div className="flex flex-col items-center text-center">
        {icon}
        <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default SupportPage;
