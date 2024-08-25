import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import HeaderM from "../HeaderM";
import FooterM from "../Footer";

function LocalListing1() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState({});

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4026/api/local-listings1/struggling-members1"
      );
      setListings(response.data);
      setLoading(false);
    } catch (err) {
      setError("An error occurred while fetching data");
      setLoading(false);
      console.error("Error fetching listings:", err);
    }
  };

  const handleListingToggle = (listingName) => {
    setSelectedListing(listingName === selectedListing ? null : listingName);
  };

  const handleMemberToggle = (listingName, memberName) => {
    setSelectedMembers((prev) => ({
      ...prev,
      [`${listingName}-${memberName}`]: !prev[`${listingName}-${memberName}`],
    }));
  };

  const handleVote = async () => {
    if (!selectedListing) {
      toast.error("يرجى اختيار قائمة للتصويت.");
      return;
    }

    // Generate the list of selected members
    const selectedMembersList = Object.entries(selectedMembers)
      .filter(([key, value]) => value && key.startsWith(selectedListing))
      .map(([key]) => key.split("-")[1]);

    // if (selectedMembersList.length === 0) {
    //   toast.error("يرجى اختيار عضو واحد على الأقل للتصويت.");
    //   return;
    // }

    // Get the nationalID from local storage
    const nationalID = localStorage.getItem("nationalID");
    console.log("nationalID:", nationalID);

    try {
      // Check if the user has already voted
      const response = await axios.get(
        `http://localhost:4026/api/check-vote/${nationalID}`
      );
      if (response.data.hasVoted) {
        // User has already voted, show sweet alert
        await Swal.fire({
          title: "لقد قمت بالتصويت مسبقا",
          text: "لا يمكنك التصويت مرة أخرى!",
          icon: "warning",
          confirmButtonText: "موافق",
        });
        return;
      }

      const { value: confirmVote } = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "لن تتمكن من تغيير تصويتك بعد إرساله.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم، أرسل التصويت!",
        cancelButtonText: "إلغاء",
      });

      if (confirmVote) {
        try {
          const response = await axios.post(
            "http://localhost:4026/api/submit-vote",
            {
              selectedListing,
              selectedMembers: selectedMembersList,
            }
          );

          if (response.data.success) {
            // Update the user's voting status in the database
            await axios.post(
              `http://localhost:4026/api/update-vote-status/${nationalID}`
            );

            toast.success("تم إرسال تصويتك بنجاح!");
            // Reset selections
            setSelectedListing(null);
            setSelectedMembers({});
            // Refresh listings
            fetchListings();
          } else {
            toast.error("فشل في إرسال التصويت. يرجى المحاولة مرة أخرى.");
          }
        } catch (error) {
          console.error("Error submitting vote:", error);
          toast.error("حدث خطأ أثناء إرسال تصويتك. يرجى المحاولة مرة أخرى.");
        }
      }
    } catch (error) {
      console.error("Error checking vote status:", error);
      toast.error(
        "حدث خطأ أثناء التحقق من حالة التصويت. يرجى المحاولة مرة أخرى."
      );
    }
  };

  if (loading) return <div className="py-10 text-center">Loading...</div>;
  if (error)
    return <div className="py-10 text-center text-red-500">{error}</div>;

  return (
    <>
      <HeaderM />
      <div className="container p-4 mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center">صفحة التصويت </h1>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3, // Adjust the delay between card animations
              },
            },
          }}
        >
          {listings.map((listing, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} // Adjust the duration of the animation
            >
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id={`listing-${index}`}
                  checked={selectedListing === listing.listingName}
                  onChange={() => handleListingToggle(listing.listingName)}
                  className="mr-2"
                />
                <h2 className="text-xl font-semibold">{listing.listingName}</h2>
              </div>
              <h3 className="mb-2 text-lg font-medium">الاعضاء :</h3>
              <ul>
                {listing.strugglingMembers.map((member, memberIndex) => (
                  <li key={memberIndex} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`member-${index}-${memberIndex}`}
                      checked={
                        selectedMembers[`${listing.listingName}-${member}`] ||
                        false
                      }
                      onChange={() =>
                        handleMemberToggle(listing.listingName, member)
                      }
                      className="mr-2"
                      disabled={selectedListing !== listing.listingName}
                    />
                    <label htmlFor={`member-${index}-${memberIndex}`}>
                      {member}
                    </label>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 text-center">
          <button
            onClick={handleVote}
            className="px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-500"
          >
            تصويت
          </button>
        </div>
        <ToastContainer />
      </div>
      <FooterM />
    </>
  );
}

export default LocalListing1;
