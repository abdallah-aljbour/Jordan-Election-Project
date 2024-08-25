import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import footer from "../../assets/images/footer.png";

function DebateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // This will hold the file
  const [isChecked, setIsChecked] = useState(false);
  const [nationalID, setNationalID] = useState("");
  const [debatorName, setName] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleCheckboxChange = () => setIsChecked((prevState) => !prevState);

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem(
      "debate",
      JSON.stringify({
        debateTitle: title,
        debateDescription: description,
        secondDebatorID: nationalID,
        secondDebatorName: debatorName,
        dateOfDebate: date,
        isDebate: true,
      })
    );
    navigate("/CandidatePayment");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-amiri rtl">
      <div
        className="absolute inset-0 z-0 bg-repeat opacity-10"
        style={{ backgroundImage: `url('${footer}')` }}
      ></div>

      <main className="relative flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-4xl font-extrabold text-[#CE1126]">
              نموذج اعلان مناظرة
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              أملأ المعلومات التالية لانشاء مناظرة
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 bg-white shadow-2xl rounded-lg px-10 py-8 border-2 border-[#CE1126] text-end"
          >
            <div className="flex w-full flex-col gap-5">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  العنوان
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  id="title"
                  name="title"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#007A3D] focus:border-[#007A3D] focus:z-10 sm:text-sm text-end"
                  placeholder="ادخل العنوان"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  معلومات عن المناظرة
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  name="description"
                  rows="5"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#007A3D] focus:border-[#007A3D] focus:z-10 sm:text-sm text-end"
                  placeholder="اكتب رسالتك هنا"
                  required
                ></textarea>
              </div>
              <div className="w-full">
                <label className="text-[1.5rem]">معلومات المتناظر الثاني</label>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-gray-700 text-sm">الرقم الوطني</label>
                <input
                  value={nationalID}
                  onChange={(e) => setNationalID(e.target.value)}
                  type="text"
                  id="title"
                  name="title"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#007A3D] focus:border-[#007A3D] focus:z-10 sm:text-sm text-end"
                  placeholder="ادخل الرقم الوطني للمتناظر الثاني"
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-gray-700 text-sm">
                  اسم المتناظر الثاني
                </label>
                <input
                  value={debatorName}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="title"
                  name="title"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#007A3D] focus:border-[#007A3D] focus:z-10 sm:text-sm text-end"
                  placeholder="ادخل اسم المتناظر الثاني"
                  required
                />
              </div>
              <div className="w-full flex flex-col">
                <label className="text-gray-700 text-sm">موعد المناظرة</label>
                <input
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  id="date"
                  name="date"
                  type="date"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#007A3D] focus:border-[#007A3D] focus:z-10 sm:text-sm text-end"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-2 px-4 text-sm font-medium text-white bg-[#CE1126] border border-transparent rounded-md hover:bg-[#A50E1F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A50E1F]"
              >
                إرسال الطلب
              </button>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="checkbox"
                  name="checkbox"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-[#CE1126] border-gray-300 rounded focus:ring-[#CE1126]"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="checkbox" className="font-medium text-gray-700">
                  أوافق على الشروط والأحكام
                </label>
                <Link to="/Privacy">
                  <div className="mt-4 text-start">
                    <label
                      htmlFor="checkbox"
                      className="font-medium text-blue-900 underline cursor-pointer"
                    >
                      الشروط والأحكام
                    </label>
                  </div>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default DebateForm;
