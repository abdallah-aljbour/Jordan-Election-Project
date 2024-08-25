import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

function AddLocalList() {
  const [Name, setListName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false); // حالة لتتبع ما إذا تم إدخال الاسم
  const [nationalID, setNationalId] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(true);
  const [candidacyCourse, setCandidacyCourse] = useState("");
  const [gender, setGender] = useState("");
  const [localListingID, setLocalListID] = useState("");
  const [members, setMembers] = useState([]); // حالة لتخزين جميع الأعضاء
  const [counts, setCounts] = useState({
    Muslim: 0,
    Christian: 0,
    Chechen: 0,
    Female: 0,
  });
  const [totalNumber, setTotalNumber] = useState(0);
  /******************************** */
  // Function to handle form submission create Local Listing
  const handleAddLocalList = async (e) => {
    e.preventDefault();

    if (!Name) {
      alert("يرجى تعبئة جميع الحقول.");
      return;
    }
    console.log("aaaaaaaaaaaaaaaaa", Name);
    try {
      const response = await axios.post(
        "http://localhost:4026/api/LocalList/createLocalList",
        { Name }
      );
      console.log("kkkkkkkkkkkkkkkkkkkkk", response);
      const localListId = response.data.localListId;
      setLocalListID(localListId);

      // Fetch the name of the local listing
      await fetchLocalListingName(localListId);
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
  const handleAddlocalListingInformation = async (e) => {
    e.preventDefault();
    if (!nationalID || !gender || !candidacyCourse) {
      alert("يرجى تعبئة جميع الحقول.");
      return;
    }

    // شرط للكوتا النسائية أن يكون الجندر أنثى
    if (candidacyCourse === "Female" && gender !== "Female") {
      alert("لا يمكن إضافة غير الإناث إلى الكوتا النسائية.");
      return;
    }

    if (totalNumber >= 10) {
      alert("عدد أعضاء القائمة اكتمل");
      return;
    } else if (candidacyCourse === "Female" && counts.Female >= 1) {
      alert("عدد الأعضاء المنتسبين إلى الكوتة النسائية اكتمل");
      return;
    } else if (candidacyCourse === "Chechen" && counts.Chechen >= 1) {
      alert("عدد الأعضاء المنتسبين إلى المقعد الشيشاني او الشركس اكتمل");
      return;
    } else if (candidacyCourse === "Christian" && counts.Christian >= 1) {
      alert("عدد الأعضاء المنتسبين إلى المقعد المسيحي اكتمل");
      return;
    } else if (candidacyCourse === "Muslim" && counts.Muslim > 7) {
      alert("عدد الأعضاء المنتسبين إلى مقاعد المسلمين اكتمل");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4026/api/LocalList/localListingInformation",
        {
          nationalID,
          gender,
          candidacyCourse,
          localListingID,
        }
      );

      if (response.status === 201) {
        alert("تمت إضافة المعلومات بنجاح.");
        setNationalId("");
        setGender("");
        setCandidacyCourse("");
        // بعد إضافة المعلومات بنجاح، استدعاء getCitizen لإضافة العضو إلى القائمة
        await getCitizen(nationalID);
        await getlocalListingInformation(localListingID);
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
  /********** get local Listing Information *******/
  const getlocalListingInformation = async (localListingID) => {
    try {
      const response = await axios.get(
        `http://localhost:4026/api/LocalList/getlocalListingInformation/${localListingID}`
      );
      const data = response.data;

      setCounts({
        Muslim: data.counts.Muslim || 0,
        Christian: data.counts.Christian || 0,
        Chechen: data.counts.Chechen || 0,
        Female: data.counts.Female || 0,
      });
      setTotalNumber(data.localListingCount);
    } catch (error) {
      console.error("Error fetching get Local Listing information", error);
    }
  };

  /*********end get local Listing Information**** */
  /**********get name local list *******/
  const fetchLocalListingName = async (listingID) => {
    try {
      const response = await axios.get(
        `http://localhost:4026/api/LocalList/getLocalListing/${listingID}`
      );
      console.log("nameLocal", response.data.localList.Name);

      if (response.data.localList) {
        setListName(response.data.localList.Name); // تحديث حالة اسم القائمة
      }
    } catch (error) {
      console.error("Error fetching get Local Listing information", error);
    }
  };

  /*********end get name local list**** */
  /**********delete citizen from local list information*******/
  const deleteCitizenLocaList = async (nationalID) => {
    // عرض رسالة تأكيد قبل إجراء عملية الحذف
    const confirmed = window.confirm("هل أنت متأكد أنك تريد حذف هذا العضو؟");

    if (!confirmed) {
      // إذا اختار المستخدم إلغاء العملية، لا تفعل شيئًا
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:4026/api/LocalList/deleteCitizenLocaList/${nationalID}`
      );

      if (response.status === 200) {
        // عملية الحذف نجحت
        alert("تم حذف العضو بنجاح");
        // تحديث الحالة لإزالة العضو المحذوف من قائمة الأعضاء
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.nationalID !== nationalID)
        );
        await getlocalListingInformation(localListingID);
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
        `http://localhost:4026/api/LocalList/getCitizen/${nationalID}`
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
        `http://localhost:4026/api/LocalList/editCitizen/${nationalID}`
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
    setCandidacyCourse("");
    setGender("");
    setNationalId("");
    setShowMessage(false);
  };
  /******************************* */
  useEffect(() => {
    // Fetch name when localListingID changes
    if (localListingID) {
      fetchLocalListingName(localListingID);
      getlocalListingInformation(localListingID);
    }
  }, [localListingID]);

  return (
    <div className="min-h-screen px-4 py-12 bg-white sm:px-6 lg:px-8 font-amiri">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-extrabold text-gray-900">
            إدارة القائمة المحلية
          </h1>
        </div>

        <div className="mb-8 overflow-hidden bg-white shadow-xl ">
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
              <form onSubmit={handleAddLocalList}>
                <input
                  type="text"
                  value={Name}
                  onChange={(e) => setListName(e.target.value)}
                  placeholder="اسم القائمة"
                  className="w-full p-3 transition duration-200 border-2 border-gray-300 outline-none focus:border-red-500 focus:ring focus:ring-red-200 "
                />
                <div className="flex  gap-4 mt-2">
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
                <form onSubmit={handleAddlocalListingInformation}>
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
                  <div className="mt-4">
                    <label
                      htmlFor="candidacyCourse"
                      className="block text-sm font-medium text-gray-700"
                    >
                      الدور
                    </label>
                    <select
                      id="candidacyCourse"
                      value={candidacyCourse}
                      onChange={(e) => setCandidacyCourse(e.target.value)}
                      className="block w-full p-3 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                    >
                      <option value="">اختر الدور</option>
                      <option value="Muslim">مسلم</option>
                      <option value="Chechen">شيشاني</option>
                      <option value="Christian">مسيحي</option>
                      <option value="Female">كوتة نسائية</option>
                    </select>
                  </div>
                  {}
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

                {totalNumber === 10 ? (
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

                <h1 className="mt-3 text-lg font-bold text-center">الاعضاء</h1>

                <div className="flex flex-wrap justify-center mt-5 space-x-14 gap-3">
                  <h2>عدد المسلمين {counts.Muslim}</h2>
                  <h2>عدد الشركس او الشيشان {counts.Chechen}</h2>
                  <h2>عدد الكوتة النسائية {counts.Female}</h2>
                  <h2>عدد المسيحيين {counts.Christian}</h2>
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
                          {member.nationalID || "الرقم الوطني غير متاح"} :الرقم
                          الوطني
                        </p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {member.email || "الايميل غير متاح"}
                        </p>
                        <div className="flex justify-end gap-5 cursor-pointer">
                          <MdDelete
                            onClick={() =>
                              deleteCitizenLocaList(member.nationalID)
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
  );
}

export default AddLocalList;
