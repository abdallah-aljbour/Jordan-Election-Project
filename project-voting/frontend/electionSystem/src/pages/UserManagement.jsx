// import { useState, useEffect } from "react";
// import axios from "axios";

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [editingUser, setEditingUser] = useState(null);
//   const [newEmail, setNewEmail] = useState("");

//   useEffect(() => {
//     // جلب بيانات المستخدمين عند تحميل الصفحة
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4026/api/users/data"
//         );
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleEditClick = (user) => {
//     setEditingUser(user.nationalID);
//     setNewEmail(user.email);
//   };

//   const handleSaveClick = async (nationalID) => {
//     try {
//       await axios.put(`http://localhost:4026/test/api/users/${nationalID}`, {
//         email: newEmail,
//       });
//       setEditingUser(null);
//       setNewEmail("");

//       // تحديث البيانات بعد الحفظ
//       const updatedUsers = users.map((user) =>
//         user.nationalID === nationalID ? { ...user, email: newEmail } : user
//       );
//       setUsers(updatedUsers);
//     } catch (error) {
//       console.error("Error updating email:", error);
//     }
//   };

//   return (
//     <div className="space-y-4 p-24">
//       <h2 className="text-5xl font-bold text-[#201D1E] font-amiri text-center mb-6 mt-6">
//         إدارة المستخدمين
//       </h2>
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 الإجراء
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 مرشح{" "}
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 صوت للمحلية
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 صوت للحزبية
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 البريد الإلكتروني
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 الاسم
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {users.map((user) => (
//               <tr key={user.nationalID}>
//                 <td className="px-6 py-4 whitespace-nowrap text-right">
//                   {editingUser === user.nationalID ? (
//                     <div>
//                       <input
//                         type="email"
//                         value={newEmail}
//                         onChange={(e) => setNewEmail(e.target.value)}
//                         className="border border-gray-300 rounded-md py-1 px-2"
//                       />
//                       <button
//                         onClick={() => handleSaveClick(user.nationalID)}
//                         className="bg-green-500 text-white font-semibold py-1 px-2 rounded ml-2 hover:bg-blue-600"
//                       >
//                         حفظ
//                       </button>
//                       <button
//                         onClick={() => setEditingUser(null)}
//                         className="bg-red-500 text-white font-semibold py-1 px-2 rounded hover:bg-red-600"
//                       >
//                         إلغاء
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => handleEditClick(user)}
//                       className="bg-green-500 text-black font-semibold py-2 px-4 rounded hover:bg-green-600"
//                     >
//                       تعديل
//                     </button>
//                   )}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right">
//                   {user.isCandidate}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right">
//                   {user.didVoteLocal ? "نعم" : "لا"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right">
//                   {user.didVoteParty ? "نعم" : "لا"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right">
//                   {user.email}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right">
//                   {user.name}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;

import { useState, useEffect } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4026/api/users/data"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user.nationalID);
    setNewEmail(user.email);
  };

  const handleSaveClick = async (nationalID) => {
    try {
      await axios.put(`http://localhost:4026/test/api/users/${nationalID}`, {
        email: newEmail,
      });
      setEditingUser(null);
      setNewEmail("");

      const updatedUsers = users.map((user) =>
        user.nationalID === nationalID ? { ...user, email: newEmail } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  return (
    <div className="">
      <h2 className="text-3xl md:text-5xl font-bold text-[#201D1E] font-amiri text-center mb-6 mt-6">
        إدارة المستخدمين
      </h2>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الإجراء
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                مرشح
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                صوت للمحلية
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                صوت للحزبية
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                البريد الإلكتروني
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الاسم
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.nationalID}>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {editingUser === user.nationalID ? (
                    <div>
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="border border-gray-300 rounded-md py-1 px-2"
                      />
                      <button
                        onClick={() => handleSaveClick(user.nationalID)}
                        className="bg-green-500 text-white font-semibold py-1 px-2 rounded ml-2 hover:bg-blue-600"
                      >
                        حفظ
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="bg-red-500 text-white font-semibold py-1 px-2 rounded hover:bg-red-600"
                      >
                        إلغاء
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-green-500 text-black font-semibold py-2 px-4 rounded hover:bg-green-600"
                    >
                      تعديل
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {user.isCandidate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {user.didVoteLocal ? "نعم" : "لا"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {user.didVoteParty ? "نعم" : "لا"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {user.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
