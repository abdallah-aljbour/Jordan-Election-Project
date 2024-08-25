import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import footer from "../assets/images/footer.png";
import AdvertisementPopup from "../sharedComponants/AdvertisementPopup";

function CheckOutCandidate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // This will hold the file
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate(); 

  const handleCheckboxChange = () => setIsChecked(prevState => !prevState);

  /***************image**** */
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file); // Store the file instead of URL
    }
  };
  /***************end image**** */

  const handleAddRequest = async (e) => {
    e.preventDefault();

    if (!title || !description || !selectedImage || !isChecked) {
      alert("يرجى تعبئة جميع الحقول والموافقة على الشروط والأحكام.");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('pictuer', selectedImage); // Append the actual file

    try {
      const response = await axios.post('http://localhost:4026/api/advertising/validate-token', { token });
      const advertisorID = response.data.advertisorID;
      formData.append('advertisorID', advertisorID);
      
      const adResponse = await axios.post('http://localhost:4026/api/advertising/RequestAdvertisement', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Important for handling files
        }
      });

      const advertismentID = adResponse.data.advertismentID;
      console.log('advertismentID:', advertismentID);

      // navigate to candidate payment
      navigate(`/CandidatePayment`, { state: { advertismentID } });

    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('انتهت صلاحية جلستك الرجاء تسجيل الدخول مرة اخرى');
      } else {
        console.error('Add Advertisement failed:', error);
        alert('فشل في إضافة الإعلان!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-amiri rtl">
      <div className="absolute inset-0 z-0 bg-repeat opacity-10" style={{ backgroundImage: `url('${footer}')` }}></div>

      <main className="relative flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-4xl font-extrabold text-[#CE1126]">طلب إعلان انتخابي</h2>
            <p className="mt-2 text-lg text-gray-600">
              املأ النموذج أدناه لتقديم طلب إعلان انتخابي. سيتم مراجعة طلبك وإعلامك بمجرد نشر الإعلان
            </p>
          </div>
<AdvertisementPopup/>
          <form className="mt-8 space-y-6 bg-white shadow-2xl rounded-lg px-10 py-8 border-2 border-[#CE1126] text-end" onSubmit={handleAddRequest}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-700">العنوان</label>
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
                  <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">ادعم صوتك</label>
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
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="file" className="block mb-1 text-sm font-medium text-gray-700">صورة الإعلان</label>
                  <input
                    onChange={handleImageChange}
                    id="file"
                    name="file"
                    type="file"
                    accept="image/*"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#007A3D] focus:border-[#007A3D] focus:z-10 sm:text-sm text-end"
                    required
                  />
                </div>
                {selectedImage && (
                  <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="h-32 mt-2 rounded-lg w-96" />
                )}
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
                <label htmlFor="checkbox" className="font-medium text-gray-700">أوافق على الشروط والأحكام</label>
                <Link to="/Privacy">
                  <div className="mt-4 text-start">
                    <label htmlFor="checkbox" className="font-medium text-blue-900 underline cursor-pointer">الشروط والأحكام</label>
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

export default CheckOutCandidate;








