import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import HeaderM from "../HeaderM";
import FooterM from "../Footer";
function CategoriesListing() {
  const navigate = useNavigate();

  const handleLocalListingClick = async () => {
    try {
      // Get the national ID from somewhere (e.g., state, props, local storage)
      const nationalID = localStorage.getItem("nationalID");
      console.log("debug:", nationalID);
      if (!nationalID) {
        // Handle case where nationalID is not available
        console.error("National ID not found");
        return;
      }

      // Make an API request to check the district
      const response = await axios.post(
        "http://localhost:4026/api/district/check-id",
        {
          nationalID,
        }
      );
      console.log(response.data);
      const district = response.data.district;
      console.log(district);
      if (district === "ZA") {
        // If district is ZA, navigate to GovernorateAndDistrict
        navigate("/GovernorateAndDistrict");
      } else if (district === "A1") {
        // If district is A1, navigate to GovernorateAndDistrict1
        navigate("/GovernorateAndDistrict1");
      } else if (district === "A2") {
        // If district is A2, navigate to GovernorateAndDistrict2
        navigate("/GovernorateAndDistrict2");
      } else {
        // Handle case where district is neither ZA, A1, nor A2
        alert("You are not allowed to access this page.");
      }
    } catch (error) {
      console.error("Error checking district:", error);
    }
  };

  return (
    <>
      <HeaderM />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-102 transition-all duration-300">
          <div className="p-8 space-y-8">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
              قوائم التصويت
            </h1>
            <button
              onClick={handleLocalListingClick}
              className="w-full py-6 px-8 text-2xl font-bold text-green-600 bg-white rounded-full shadow-lg hover:bg-green-50 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border-4 border-green-600 relative overflow-hidden group"
            >
              <span className="relative z-10">القوائم المحلية</span>
              <span className="absolute inset-0 w-full h-full bg-green-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
            <Link to="/components/votingPages/partyListing" className="block">
              <button className="w-full py-6 px-8 text-2xl font-bold text-red-600 bg-white rounded-full shadow-lg hover:bg-red-50 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border-4 border-red-600 relative overflow-hidden group">
                <span className="relative z-10">القوائم الحزبية</span>
                <span className="absolute inset-0 w-full h-full bg-red-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <FooterM />
    </>
  );
}

export default CategoriesListing;
