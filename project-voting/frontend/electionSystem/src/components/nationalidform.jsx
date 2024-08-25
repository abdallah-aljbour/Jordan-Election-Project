import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../components/axios';

const NationalIdForm = () => {
  const [nationalID, setNationalId] = useState('');
  const [verificationType, setVerificationType] = useState('email');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      console.log('Submitting national ID:', nationalID);
      const response = await axios.post('/api/auth/check-id', { nationalID, verificationType });
      console.log('Response:', response.data);
      if (response.data.success) {
        navigate('/otp', { state: { nationalID, verificationType } });
      } else if (response.data.alreadySignedUp) {
        alert('لقد قمت بالتسجيل مسبقاً. سيتم تحويلك إلى صفحة تسجيل الدخول.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.formContainer}>
        <h2 className={sharedStyles.title}>أدخل رقمك الوطني</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nationalID}
            onChange={(e) => setNationalId(e.target.value)}
            placeholder="أدخل رقم الهوية الوطنية الخاص بك"
            className={sharedStyles.input}
            required
          />
          <div className="mb-4">
            <label className="block mb-2">طريقة التحقق:</label>
            <select
              value={verificationType}
              onChange={(e) => setVerificationType(e.target.value)}
              className={sharedStyles.input}
            >
              <option value="email">البريد الإلكتروني</option>
              <option value="phone">رقم الهاتف</option>
            </select>
          </div>
          <button type="submit" className={sharedStyles.button}>
            إرسال
          </button>
          {error && <p className={sharedStyles.errorText}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default NationalIdForm;