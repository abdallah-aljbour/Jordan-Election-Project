import { Link } from "react-router-dom";
import Cards from "../assets/images/cards.jpg";
// import debates from "../assets/image/debates.jpg";
// import flag from "../assets/images/footer.png";


function SpecifyRequest(){

    return(
      <div className="min-h-screen px-4 py-12 bg-gray-100 font-amiri sm:px-6 lg:px-8 text-end">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-center text-[#CE1126] mb-12">اختر نوع الطلب</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* بطاقة طلب المناظرة */}
          <Link to="#" className="group">
            <div className="overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105">
              <div className="relative h-64">
                <img src={Cards} alt="المناظرة" className="object-cover w-full h-full" />
                <div className="absolute inset-0 transition-opacity duration-300 bg-black bg-opacity-40 group-hover:bg-opacity-30"></div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-[#007A3D] mb-2">طلب المناظرة</h2>
                <p className="text-gray-600">قدم طلبك للمشاركة في المناظرات وعبر عن آرائك!</p>
                <div className="mt-4">
                  <span className="inline-block bg-[#CE1126] text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 hover:bg-[#A50E1F]">
                    تقديم الطلب
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* بطاقة طلب الإعلان */}
          <Link to="/CheckOutCandidate" className="group">
            <div className="overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105">
              <div className="relative h-64">
                <img src={Cards} alt="الإعلان" className="object-cover w-full h-full" />
                <div className="absolute inset-0 transition-opacity duration-300 bg-black bg-opacity-40 group-hover:bg-opacity-30"></div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-[#007A3D] mb-2">طلب الإعلان</h2>
                <p className="text-gray-600">قدم طلبك لنشر إعلانك وحقق أقصى استفادة من وصولك للجمهور!</p>
                <div className="mt-4">
                  <span className="inline-block bg-[#CE1126] text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 hover:bg-[#A50E1F]">
                    تقديم الطلب
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
    );

}

export default SpecifyRequest;