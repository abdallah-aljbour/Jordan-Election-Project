// import  { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// function AddPartyList() {
//   const { listType } = useParams();
//   const navigate = useNavigate();
//   const [listName, setListName] = useState('');
//   const [nationalId, setNationalId] = useState('');
//   const [members, setMembers] = useState([]);

//   const addMember = () => {
//     if (nationalId.trim()) {
//       setMembers([...members, { id: Date.now(), nationalId }]);
//       setNationalId('');
//     }
//   };

//   const removeMember = (id) => {
//     setMembers(members.filter(member => member.id !== id));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // هنا يمكنك إضافة المنطق لحفظ القائمة في قاعدة البيانات
//     console.log('تم حفظ القائمة:', { listName, members, type: listType });
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-100 to-green-100 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto overflow-hidden bg-white shadow-md rounded-xl">
//         <div className="p-8">
//           <h2 className="mb-6 text-2xl font-bold text-center">
//             {listType === 'party' ? 'إضافة قائمة حزبية' : 'إضافة قائمة محلية'}
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="listName" className="block text-sm font-medium text-gray-700">اسم القائمة</label>
//               <input
//                 type="text"
//                 id="listName"
//                 value={listName}
//                 onChange={(e) => setListName(e.target.value)}
//                 className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700">الرقم الوطني للعضو</label>
//               <div className="flex mt-1 rounded-md shadow-sm">
//                 <input
//                   type="text"
//                   id="nationalId"
//                   value={nationalId}
//                   onChange={(e) => setNationalId(e.target.value)}
//                   className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-none rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//                 <button
//                   type="button"
//                   onClick={addMember}
//                   className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-l-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   إضافة
//                 </button>
//               </div>
//             </div>
//             <ul className="divide-y divide-gray-200">
//               {members.map((member) => (
//                 <li key={member.id} className="flex items-center justify-between py-4">
//                   <span>{member.nationalId}</span>
//                   <button
//                     type="button"
//                     onClick={() => removeMember(member.id)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     حذف
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <div>
//               <button
//                 type="submit"
//                 className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 حفظ القائمة
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddPartyList;
//---------------------------------------------------------------------------
// import { MdDelete } from "react-icons/md";
// import { useState } from "react";
// import axios from "axios";

// function AddPartyList() {
//   const [gender, setGender] = useState("");
//   const [nationalID, setNationalId] = useState("");
//   const [Name, setListName] = useState("");
//   // const [partyListingID, setPartyID] = useState('');
//   const [members, setMembers] = useState([]);
//   // const [candidacyCourse, setCandidacyCourse] = useState('');

//   // Function to fetch citizen information
//   const getCitizen = async (nationalID) => {
//     try {
//       const response3 = await axios.get(
//         `http://localhost:4026/api/LocalList/getCitizen/${nationalID}`
//       );
//       console.log("citizen", response3.data);

//       // Add citizen to members list
//       setMembers((prevMembers) => [...prevMembers, response3.data.citizen]);
//     } catch (error) {
//       console.error("Error fetching citizen information", error);
//     }
//   };

//   // Function to handle form submission and add party listing
//   const handleAddPartyList = async (e) => {
//     e.preventDefault();
//     if (!Name || !gender || !nationalID) {
//       alert("يرجى تعبئة جميع الحقول.");
//       return;
//     }

//     try {
//       // Correct the URL for the API request
//       const response1 = await axios.post(
//         "http://localhost:4026/api/PartyListing/createPartyListing",
//         {
//           Name,
//         }
//       );
//       console.log("PartyListingID", response1.data.partyID);
//       const partyListId = response1.data.partyID;
//       // setPartyID(partyListId);

//       // Ensure partyListingID is valid
//       if (!partyListId) {
//         alert("الرقم التعريفي للقائمة غير صحيح.");
//         return;
//       }

//       const response2 = await axios.post(
//         "http://localhost:4026/api/PartyListing/partyListingInformation",
//         {
//           nationalID,
//           gender,
//         }
//       );
//       console.log("partyListingInformation", response2);

//       if (response1.status === 201 && response2.status === 201) {
//         alert("تمت إضافة المعلومات بنجاح.");
//         setNationalId("");
//         setGender("");
//         setListName("");
//         await getCitizen(nationalID);
//       }
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.status === 400 &&
//         error.response.data.error ===
//           "Citizen with this nationalID does not exist"
//       ) {
//         alert("هذا المواطن مرشح بالفعل أو الرقم الوطني غير موجود.");
//       } else {
//         console.error("حدث خطأ أثناء إضافة المعلومات:", error);
//         alert("حدث خطأ، يرجى المحاولة مرة أخرى.");
//       }
//     }
//   };

//   // Function to delete a citizen from the local list
//   const deleteCitizenLocaList = async (nationalID) => {
//     const confirmed = window.confirm("هل أنت متأكد أنك تريد حذف هذا العضو؟");

//     if (!confirmed) {
//       return;
//     }

//     try {
//       const response = await axios.delete(
//         `http://localhost:4026/api/PartyListing/deleteCitizenPartyList/${nationalID}`
//       );

//       if (response.status === 200) {
//         alert("تم حذف العضو بنجاح");
//         setMembers((prevMembers) =>
//           prevMembers.filter((member) => member.nationalID !== nationalID)
//         );
//       } else {
//         alert("حدث خطأ غير متوقع. حالة الاستجابة:", response.status);
//       }
//     } catch (error) {
//       console.error("Error deleting citizen from local list:", error);
//       alert("حدث خطأ أثناء حذف العضو.");
//     }
//   };

//   return (
//     <div className="min-h-screen px-4 py-12 bg-white sm:px-6 lg:px-8 font-amiri">
//       <div className="max-w-3xl mx-auto">
//         <div className="mb-12 text-center">
//           <h1 className="mb-2 text-4xl font-extrabold text-gray-900">
//             إدارة القائمة الحزبية
//           </h1>
//         </div>

//         <div className="mb-8 overflow-hidden bg-white shadow-xl text-end">
//           <div className="p-6 space-y-4">
//             <form onSubmit={handleAddPartyList}>
//               <input
//                 type="text"
//                 value={Name}
//                 onChange={(e) => setListName(e.target.value)}
//                 placeholder="اسم القائمة"
//                 className="w-full p-3 transition duration-200 border-2 border-gray-300 outline-none focus:border-red-500 focus:ring focus:ring-red-200 text-end"
//               />

//               <input
//                 type="text"
//                 value={nationalID}
//                 onChange={(e) => setNationalId(e.target.value)}
//                 placeholder="الرقم الوطني للعضو"
//                 className="w-full p-3 mt-4 transition duration-200 border-2 border-gray-300 outline-none focus:border-red-500 focus:ring focus:ring-red-200"
//               />
//               <div className="mt-4">
//                 <label
//                   htmlFor="gender"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   الجنس
//                 </label>
//                 <select
//                   id="gender"
//                   value={gender}
//                   onChange={(e) => setGender(e.target.value)}
//                   className="block w-full p-3 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
//                 >
//                   <option value="">اختر الجنس</option>
//                   <option value="Male">ذكر</option>
//                   <option value="Female">أنثى</option>
//                 </select>
//               </div>

//               <div className="flex justify-end gap-4 mt-2">
//                 <button
//                   type="submit"
//                   className="inline-block bg-[#166534] text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 hover:bg-[#15803d]"
//                 >
//                   اضافة
//                 </button>
//                 <button
//                   type="button"
//                   className="inline-block bg-[#CE1126] text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 hover:bg-[#A50E1F]"
//                 >
//                   إلغاء
//                 </button>
//               </div>
//             </form>

//             <div className="flex justify-center my-6">
//               <button className="inline-block bg-[#166534] text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 hover:bg-[#15803d] w-44">
//                 اعتماد القائمة
//               </button>
//             </div>

//             <h1 className="mt-3 text-lg font-bold text-center">الأعضاء</h1>

//             <div className="flex flex-wrap justify-center gap-4 mt-12">
//               {members.length > 0 ? (
//                 members.map((member, index) => (
//                   <div
//                     key={index}
//                     className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow w-80 dark:bg-gray-800 dark:border-gray-700"
//                   >
//                     <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                       {member.name || "اسم غير متاح"}
//                     </h5>
//                     <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                       {member.nationalID || "الرقم الوطني غير متاح"} :الرقم
//                       الوطني
//                     </p>
//                     <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                       {member.email || "الايميل غير متاح"}
//                     </p>
//                     <div className="flex justify-end gap-5 cursor-pointer">
//                       <MdDelete
//                         onClick={() => deleteCitizenLocaList(member.nationalID)}
//                       />
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p>لا يوجد أعضاء بعد.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddPartyList;

import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import HeaderM from "../components/HeaderM";

function AddPartyList() {
  const [Name, setListName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false); // حالة لتتبع ما إذا تم إدخال الاسم
  const [nationalID, setNationalId] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(true);
  const [gender, setGender] = useState("");
  const [partyListingID, setPartyListID] = useState("");
  const [members, setMembers] = useState([]); // حالة لتخزين جميع الأعضاء

  const [totalNumber, setTotalNumber] = useState(0);
  /******************************** */
  // Function to handle form submission create party Listing
  const handleAddPartyList = async (e) => {
    e.preventDefault();

    if (!Name) {
      alert("يرجى تعبئة جميع الحقول.");
      return;
    }
    console.log("name", Name);
    try {
      const response = await axios.post(
        "http://localhost:4026/api/PartyListing/createPartyListing",
        { Name }
      );
      console.log("response", response);
      const partyListId = response.data.partyID;

      setPartyListID(partyListId);

      // Fetch the name of the local listing
      await fetchPartyListingName(partyListId);
      setNameSubmitted(true); // تعيين حالة إدخال الاسم

      if (response.status === 201) {
        setMessage("تمت إضافة القائمة بنجاح.");
        setShowMessage(true);
        setListName("");
      }
    } catch (error) {
      if (error.response) {
        // التحقق من الأخطاء الخاصة بالخادم
        if (
          error.response.status === 400 &&
          error.response.data.error ===
            "A local listing with this name already exists."
        ) {
          alert("الاسم الذي أدخلته موجود بالفعل، يرجى اختيار اسم آخر.");
        } else if (error.response.status === 500) {
          alert("حدث خطأ في الخادم، يرجى المحاولة مرة أخرى لاحقًا.");
        } else {
          alert("حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.");
        }
      } else {
        console.error("حدث خطأ أثناء إضافة القائمة:", error);
        alert("حدث خطأ، يرجى المحاولة مرة أخرى.");
      }
    }
  };

  /******************************** */
  // Function to handle form submission create local Listing Information
  const handleAddPartyListingInformation = async (e) => {
    e.preventDefault();
    if (!nationalID || !gender) {
      alert("يرجى تعبئة جميع الحقول.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4026/api/PartyListing/partyListingInformation",
        {
          nationalID,
          gender,
          partyListingID,
        }
      );

      if (response.status === 201) {
        alert("تمت إضافة المعلومات بنجاح.");
        setNationalId("");
        setGender("");
        // بعد إضافة المعلومات بنجاح، استدعاء getCitizen لإضافة العضو إلى القائمة
        await getCitizen(nationalID);
        await getpartyListingInformation(partyListingID);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error ===
          "Citizen with this nationalID does not exist"
      ) {
        alert("هاذا المواطن مرشح بالفعل او الرقم الوطني غير موجود");
      } else {
        console.error("حدث خطأ أثناء إضافة المعلومات:", error);
        alert("حدث خطأ، يرجى المحاولة مرة أخرى.");
      }
    }
  };

  /****************************** */
  /********** get party Listing Information *******/
  const getpartyListingInformation = async (partyListingID) => {
    try {
      const response = await axios.get(
        `http://localhost:4026/api/PartyListing/getpartyListingInformation/${partyListingID}`
      );
      const data = response.data;

      setTotalNumber(data.partyListingCount);
    } catch (error) {
      console.error("Error fetching get party Listing information", error);
    }
  };

  /*********end get party Listing Information**** */
  /**********get name local list *******/
  const fetchPartyListingName = async (partyListingID) => {
    try {
      const response = await axios.get(
        `http://localhost:4026/api/PartyListing/getPartyListing/${partyListingID}`
      );
      console.log("nameParty", response.data.partyList.Name);

      if (response.data.partyList) {
        setListName(response.data.partyList.Name); // تحديث حالة اسم القائمة
      }
    } catch (error) {
      console.error("Error fetching get Local Listing information", error);
    }
  };

  /*********end get name local list**** */
  /**********delete citizen from local list information*******/
  const deleteCitizenPartyList = async (nationalID) => {
    // عرض رسالة تأكيد قبل إجراء عملية الحذف
    const confirmed = window.confirm("هل أنت متأكد أنك تريد حذف هذا العضو؟");

    if (!confirmed) {
      // إذا اختار المستخدم إلغاء العملية، لا تفعل شيئًا
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:4026/api/PartyListing/deleteCitizenPartyList/${nationalID}`
      );

      if (response.status === 200) {
        // عملية الحذف نجحت
        alert("تم حذف العضو بنجاح");
        // تحديث الحالة لإزالة العضو المحذوف من قائمة الأعضاء
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.nationalID !== nationalID)
        );
        await getpartyListingInformation(partyListingID);
      } else {
        // معالجة الأخطاء غير المتوقعة
        alert("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting citizen from local list:", error);
    }
  };
  /*********end delete citizen from local list information**** */

  /**********get citizen*******/
  const getCitizen = async (nationalID) => {
    try {
      const response = await axios.get(
        `http://localhost:4026/api/PartyListing/getCitizen/${nationalID}`
      );
      console.log("citizen", response.data);

      // إضافة المواطن إلى قائمة الأعضاء
      setMembers((prevMembers) => [...prevMembers, response.data.citizen]);
    } catch (error) {
      console.error("Error fetching citizen information", error);
    }
  };
  /*********end get citizen**** */
  /*************update Citizen************ */

  const updateCitizen = async (nationalID) => {
    try {
      await axios.put(
        `http://localhost:4026/api/PartyListing/editCitizen/${nationalID}`
      );
      console.log(
        `Citizen with nationalID: ${nationalID} updated successfully`
      );
    } catch (error) {
      console.error(
        `Error updating citizen with nationalID: ${nationalID}`,
        error
      );
    }
  };

  const updateAllCitizens = async () => {
    try {
      await Promise.all(
        members.map(async (member) => {
          await updateCitizen(member.nationalID);
        })
      );
      alert("تم اعتماد القائمة");
      window.location.reload();
    } catch (error) {
      console.error("Error updating citizens information", error);
    }
  };

  /*************end update Citizen************ */

  /******************************* */
  // Function to handle cancel button click
  const handleCancel = () => {
    setListName("");
    setNameSubmitted(false); // إعادة تعيين حالة إدخال الاسم
    setShowMessage(false);
  };
  const handleCancelmember = () => {
    setGender("");
    setNationalId("");
    setShowMessage(false);
  };
  /******************************* */
  useEffect(() => {
    // Fetch name when partypartyListingID changes
    if (partyListingID) {
      fetchPartyListingName(partyListingID);
      getpartyListingInformation(partyListingID);
    }
  }, [partyListingID]);

  return (
    <div>
      <HeaderM />
      <div className="min-h-screen px-4 py-12 bg-white sm:px-6 lg:px-8 font-amiri">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="mb-2 text-4xl font-extrabold text-gray-900">
              إدارة القائمة الحزبية
            </h1>
            <h3>
              بعد تعيين اسم الحزب وحفظه، يمكنك إدخال الأعضاء المنتسبين إلى هذا
              الحزب وربطهم به بشكل صحيح.
            </h3>
          </div>

          <div className="mb-8 overflow-hidden bg-white shadow-xl text-end">
            <div className="p-6 space-y-4">
              {showMessage && message && (
                <div className="relative p-3 mb-4 text-center text-white bg-green-500 rounded-md">
                  {message}
                  <button
                    onClick={() => setShowMessage(false)}
                    className="absolute text-2xl font-bold text-white top-1 right-2"
                  >
                    ×
                  </button>
                </div>
              )}

              {!nameSubmitted ? (
                <form onSubmit={handleAddPartyList}>
                  <input
                    type="text"
                    value={Name}
                    onChange={(e) => setListName(e.target.value)}
                    placeholder="اسم القائمة"
                    className="w-full p-3 transition duration-200 border-2 border-gray-300 outline-none focus:border-red-500 focus:ring focus:ring-red-200 text-end"
                  />
                  <div className="flex justify-end gap-4 mt-2">
                    <button
                      type="submit"
                      className="inline-block bg-[#166534] text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 hover:bg-[#15803d]"
                    >
                      تأكيد
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="inline-block bg-[#CE1126] text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 hover:bg-[#A50E1F]"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-center text-gray-700">
                    اسم القائمة: {Name}
                  </h3>
                  <form onSubmit={handleAddPartyListingInformation}>
                    <input
                      type="text"
                      value={nationalID}
                      onChange={(e) => setNationalId(e.target.value)}
                      placeholder="الرقم الوطني للعضو"
                      className="w-full p-3 mt-4 transition duration-200 border-2 border-gray-300 outline-none focus:border-red-500 focus:ring focus:ring-red-200"
                    />
                    <div className="mt-4">
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700"
                      >
                        الجنس
                      </label>
                      <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="block w-full p-3 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                      >
                        <option value="">اختر الجنس</option>
                        <option value="Male">ذكر</option>
                        <option value="Female">أنثى</option>
                      </select>
                    </div>

                    <div className="flex justify-end gap-4 mt-2">
                      <button
                        type="submit"
                        className="inline-block bg-[#166534] text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 hover:bg-[#15803d]"
                      >
                        اضافة
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelmember}
                        className="inline-block bg-[#CE1126] text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 hover:bg-[#A50E1F]"
                      >
                        إلغاء
                      </button>
                    </div>
                  </form>

                  {totalNumber >= 1 ? (
                    <div className="flex justify-center my-6">
                      <button
                        onClick={updateAllCitizens}
                        className="inline-block bg-[#166534] text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 hover:bg-[#15803d] w-44"
                      >
                        اعتماد القائمة
                      </button>
                    </div>
                  ) : (
                    <div className="justify-center hidden my-6 ">
                      <button className="inline-block bg-[#166534] text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 hover:bg-[#15803d] w-44">
                        اعتماد القائمة
                      </button>
                    </div>
                  )}

                  <h1 className="mt-3 text-lg font-bold text-center">
                    الاعضاء
                  </h1>

                  <div className="flex flex-wrap justify-center mt-5 space-x-14">
                    <h2>عددالاعضاء {totalNumber}</h2>
                  </div>

                  {/****************** الأعضاء ************* */}
                  <div className="flex flex-wrap justify-center gap-4 mt-12">
                    {members.length > 0 ? (
                      members.map((member, index) => (
                        <div
                          key={index}
                          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow w-80 dark:bg-gray-800 dark:border-gray-700"
                        >
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {member.name || "اسم غير متاح"}
                          </h5>
                          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {member.nationalID || "الرقم الوطني غير متاح"}{" "}
                            :الرقم الوطني
                          </p>
                          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {member.email || "الايميل غير متاح"}
                          </p>
                          <div className="flex justify-end gap-5 cursor-pointer">
                            <MdDelete
                              onClick={() =>
                                deleteCitizenPartyList(member.nationalID)
                              }
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>لا يوجد أعضاء بعد.</p>
                    )}
                  </div>
                  {/****************** نهاية الأعضاء ************* */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPartyList;
