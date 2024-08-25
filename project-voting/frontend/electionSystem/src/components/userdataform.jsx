import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../components/axios';

const UserDataForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;

  const sharedStyles = {
    pageContainer: "flex justify-center items-center min-h-screen bg-gray-100 p-4",
    formContainer: "bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200",
    title: "text-3xl font-bold mb-6 text-center text-gray-800",
    input: "w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300 mb-4",
    button: "w-full bg-[#DA2A29] text-white p-3 rounded-md hover:bg-red-600 transition duration-300 font-semibold text-lg shadow-md",
    errorText: "text-red-500 text-center mb-4",
    linkText: "mt-6 text-center text-gray-600",
    link: "text-[#DA2A29] hover:underline font-semibold"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/auth/set-password', {
        nationalID: user.nationalID,
        newPassword,
      });
      if (response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.formContainer}>
        <h2 className={sharedStyles.title}>بيانات المستخدم</h2>
        <div className="space-y-2 mb-4">
          <p><strong>الاسم:</strong> {user.name}</p>
          <p><strong>رقم الهوية الوطنية:</strong> {user.nationalID}</p>
         
          <p><strong>الحي:</strong> {user.district}</p>
          <p><strong>البريد الإلكتروني:</strong> {user.email}</p>
          <p><strong>تم التصويت محلياً:</strong> {user.didVoteLocal ? 'نعم' : 'لا'}</p>
          <p><strong>تم التصويت في المدينة:</strong> {user.didVoteParty ? 'نعم' : 'لا'}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="إعداد كلمة مرور جديدة"
            className={sharedStyles.input}
          />
          <button type="submit" className={sharedStyles.button}>
            إعداد كلمة المرور
          </button>
          {error && <p className={sharedStyles.errorText}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default UserDataForm;
