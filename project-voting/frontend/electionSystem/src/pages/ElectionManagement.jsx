import { useState, useEffect } from "react";
import axios from "../components/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faUser,
  faVoteYea,
  faCheckCircle,
  faTimesCircle,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const ElectionManagement = () => {
  const [localListings, setLocalListings] = useState([]);
  const [partyListings, setPartyListings] = useState([]);
  const [activeTab, setActiveTab] = useState("local");
  const [expandedListing, setExpandedListing] = useState(null);

  const fetchListings = async () => {
    try {
      const localResponse = await axios.get("/api/admin/local-listings");
      setLocalListings(localResponse.data);

      const partyResponse = await axios.get("/api/admin/party-listings");
      setPartyListings(partyResponse.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const removeCandidate = async (candidateID, listingType) => {
    try {
      await axios.post("/api/admin/remove-candidate", {
        candidateID,
        listingType,
        idField:
          listingType === "local"
            ? "listingInformationID"
            : "partyInformationID",
      });
      fetchListings();
    } catch (error) {
      console.error("Error removing candidate:", error);
    }
  };

  const ListingCard = ({ listing, type }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() =>
          setExpandedListing(
            expandedListing === listing.listingID ? null : listing.listingID
          )
        }
      >
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-gray-500 transition-transform duration-300 ${
            expandedListing === listing.listingID ? "transform rotate-180" : ""
          }`}
        />
        <h2 className="text-xl font-semibold text-gray-800">{listing.Name}</h2>
      </div>
      {expandedListing === listing.listingID && (
        <div className="p-4 bg-gray-50">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-700 flex items-center">
              <span className="font-semibold ml-1">{listing.votingCount}</span>
              <span className="mx-1">:عدد الاصوات</span>
              <FontAwesomeIcon
                icon={faVoteYea}
                className="ml-2 text-indigo-500"
              />
            </p>
            <p className="text-gray-700 flex items-center">
              <FontAwesomeIcon
                icon={listing.didPass ? faCheckCircle : faTimesCircle}
                className="ml-1"
              />
              <span
                className={`font-semibold ml-1 ${
                  listing.didPass ? "text-green-500" : "text-red-500"
                }`}
              >
                {listing.didPass ? " Passed" : " Not Passed"}
              </span>
              <span className="mx-1">:الحالة</span>
            </p>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-indigo-600 flex items-center justify-end">
            المرشحين:
            <FontAwesomeIcon icon={faUser} className="ml-2" />
          </h3>
          <ul className="space-y-2">
            {(type === "local"
              ? listing.localListingInformations
              : listing.PartyListingInformations
            )?.map((candidate) => (
              <li
                key={
                  candidate.listingInformationID || candidate.partyInformationID
                }
                className="bg-white p-3 rounded-md shadow-sm hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <button
                    onClick={() =>
                      removeCandidate(
                        candidate.listingInformationID ||
                          candidate.partyInformationID,
                        type
                      )
                    }
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors duration-200"
                  >
                    ازالة
                  </button>
                  <p className="font-medium text-lg text-gray-800">
                    {candidate.Citizen?.name || "Name not available"}
                  </p>
                </div>
                <p className="text-sm text-gray-600 text-right">
                  ID:{" "}
                  {candidate.listingInformationID ||
                    candidate.partyInformationID}
                </p>
                <p className="text-indigo-600 text-right">
                  الجنس: {candidate.gender}
                </p>
                <p className="text-indigo-600 text-right">
                  المسار: {candidate.candidacyCourse}
                </p>
                {type === "local" && (
                  <p className="text-indigo-600 text-right">
                    الاصوات: {candidate.votingCount}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const TabButton = ({ label, isActive, onClick }) => (
    <button
      className={`px-4 py-2 font-semibold rounded-t-lg transition-colors duration-200 ${
        isActive
          ? "bg-white text-black"
          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  const handleAccept = async (listingID) => {
    try {
      await axios.post("/api/admin/approve-listing", {
        listingID,
        isApproved: true,
      });
      fetchListings();
    } catch (error) {
      console.error("Error approving listing:", error);
    }
  };

  const handleRemove = async (listingID) => {
    try {
      await axios.post("/api/admin/approve-listing", {
        listingID,
        isApproved: false,
      });
      fetchListings();
    } catch (error) {
      console.error("Error removing listing:", error);
    }
  };

  return (
    <div className="container mx-auto  bg-white min-h-screen" dir="rtl">
      <h1 className="text-5xl font-bold text-[#201D1E] font-amiri text-center mb-6 ">
        ادارة القوائم
      </h1>
      <div className="mb-6 flex justify-center space-x-2">
        <TabButton
          label="القوائم المحلية"
          isActive={activeTab === "local"}
          onClick={() => setActiveTab("local")}
        />
        <TabButton
          label="القوائم الحزبية"
          isActive={activeTab === "party"}
          onClick={() => setActiveTab("party")}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-8">
        <table className="min-w-full table-auto bg-gray-50">
          <thead className=" text-black">
            <tr>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">
                الاسم
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">
                الاصوات
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">
                الحالة
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">
                القبول
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(activeTab === "local" ? localListings : partyListings).map(
              (listing) => (
                <tr
                  key={listing.listingID || listing.partyID}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    {listing.Name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    {listing.votingCount}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        listing.didPass
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {listing.didPass ? "Passed" : "Not Passed"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    {listing.isApproved ? (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-green-500"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="text-red-500"
                      />
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-right">
                    <button
                      onClick={() =>
                        handleAccept(listing.listingID || listing.partyID)
                      }
                      className="text-black  ml-2 transition-colors duration-200"
                    >
                      قبول
                    </button>
                    <button
                      onClick={() =>
                        handleRemove(listing.listingID || listing.partyID)
                      }
                      className="text-red-600 hover:text-red-900 transition-colors duration-200"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeTab === "local" ? localListings : partyListings).map(
          (listing) => (
            <ListingCard
              key={listing.listingID || listing.partyID}
              listing={listing}
              type={activeTab}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ElectionManagement;
