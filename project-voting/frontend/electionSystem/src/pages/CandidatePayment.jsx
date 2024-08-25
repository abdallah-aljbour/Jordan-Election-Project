import { useState } from "react";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51Pnz1SATqmsNuw1AvRAKcoH0tJTDb09gyeEYPJw2ZCR0yv2PqghcohnNKjqN7kRrtVi9mHIeqAKACEa3CmW18cYh00XeHXafj2');

function CandidatePayment() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const location = useLocation();
  const { advertismentID } = location.state || {}; 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    try {
      // إرسال طلب الدفع إلى السيرفر
      await axios.post('http://localhost:4026/api/payment', {
        amount: 1000, // المبلغ بالسنتات
        currency: 'usd',
        paymentMethodId: paymentMethod.id,
      });

      // تحديث الإعلان ليصبح `isPaid: true`
      await axios.put(`http://localhost:4026/api/updateAdvertisment/${advertismentID}`, {
        isPaid: true,
      });

      setSuccessMessage('تمت العملية بنجاح وتمت الموافقة على الإعلان!');
      setError(null);
    } catch (err) {
      setError('فشلت العملية');
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="p-4 mt-8 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
        <h1 className='text-5xl font-bold text-center text-[#CE1126] mb-12'>عملية الدفع</h1>
    
       {/* معلومات الدفع الآمن */}
       <div className="p-8 mb-12 bg-white rounded-lg shadow-lg">
         <div className="flex items-center justify-center mb-6">
             <svg className="text-[#007A3D] w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
           </div>
          <h3 className="text-2xl font-semibold text-center text-[#007A3D] mb-4">دفع آمن للإعلانات</h3>
        <p className="text-center text-gray-600">
          نقدم عملية دفع آمنة لضمان حماية بياناتك أثناء دفع رسوم الإعلان. 
          يتم استخدام التشفير من البداية إلى النهاية لضمان أمان المعلومات الشخصية وبيانات الدفع.
        </p>
     </div>
      <div className="my-6 sm:mt-8">
        <form onSubmit={handleSubmit} className="w-full p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm lg:max-w-xl lg:p-8">
          <div className="mb-6 text-center">
            <span className="text-xl font-semibold text-[#CE1126]">50 JD</span>
            <span className="text-xl font-semibold"> :المجموع الكلي</span>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">تفاصيل البطاقة</label>
            <CardElement className="p-2 border rounded" />
          </div>
          <div className="flex justify-between">
            <button
              disabled={!stripe || loading}
              type="submit"
              className="w-full rounded-lg bg-[#CE1126] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#A50E1F] focus:outline-none focus:ring-4 focus:ring-[#A50E1F]"
            >
              {loading ? 'جاري المعالجة...' : 'دفع'}
            </button>
            <button
              type="button"
              className="w-full ml-4 rounded-lg bg-gray-300 px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-400"
            >
              إلغاء
            </button>
          </div>
        </form>
        <div className="flex justify-center">
        {error && <div className="my-2 text-red-500">{error}</div>}
        {successMessage && <div className="my-2 text-green-500">{successMessage}</div>}
          
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CandidatePayment />
    </Elements>
  );
}










// import { useState } from 'react';
// import jordan from "../assets/images/jordanianlogo.png";
// function CandidatePayment(){

//   // card
//   const [cardholder, setCardholder] = useState('');
//   const [cardNumber, setCardNumber] = useState('');
//   const [expired, setExpired] = useState({ month: '', year: '' });
//   const [securityCode, setSecurityCode] = useState('');
//   // const [card, setCard] = useState('front');

//   const formatCardNumber = (value) => {
//     return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim();
//   };

// //   const isValid = () => {
// //     return cardholder.length >= 5 &&
// //       cardNumber !== '' &&
// //       expired.month !== '' &&
// //       expired.year !== '' &&
// //       securityCode.length === 3;
// //   };

// //   const handleSubmit = () => {
// //     alert(`You did it ${cardholder}.`);
// //   };
// //end card
// //from and card


// //end form and card
//   return (
// <div className="min-h-screen px-4 py-12 bg-gradient-to-b from-red-100 to-blue-100 font-amiri sm:px-6 lg:px-8 text-end">
//   <div className="max-w-4xl mx-auto">
//     <h1 className='text-5xl font-bold text-center text-[#CE1126] mb-12'>عملية الدفع</h1>
    
//     {/* معلومات الدفع الآمن */}
//     <div className="p-8 mb-12 bg-white rounded-lg shadow-lg">
//       <div className="flex items-center justify-center mb-6">
//         <svg className="text-[#007A3D] w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//         </svg>
//       </div>
//       <h3 className="text-2xl font-semibold text-center text-[#007A3D] mb-4">دفع آمن للإعلانات</h3>
//       <p className="text-center text-gray-600">
//         نقدم عملية دفع آمنة لضمان حماية بياناتك أثناء دفع رسوم الإعلان. 
//         يتم استخدام التشفير من البداية إلى النهاية لضمان أمان المعلومات الشخصية وبيانات الدفع.
//       </p>
//     </div>

//     {/* نموذج الدفع */}
//     <div className="overflow-hidden bg-white rounded-lg shadow-lg">
//       <div className="p-8">
//         <div className="flex justify-center mb-8">
//           <img src={jordan} alt="الشعار الأردني" className="w-24 h-24" />
//         </div>
        
//         <form className="space-y-6">
//           <div>
//             <label htmlFor="cardHolder" className="block mb-1 text-sm font-medium text-gray-700">اسم حامل البطاقة</label>
//             <input
//               type="text"
//               id="cardHolder"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007A3D] text-right"
//               placeholder="أدخل اسم حامل البطاقة"
//               value={cardholder}
//               onChange={(e) => setCardholder(e.target.value)}
//             />
//           </div>
          
//           <div>
//             <label htmlFor="cardNumber" className="block mb-1 text-sm font-medium text-gray-700">رقم البطاقة</label>
//             <input
//               type="text"
//               id="cardNumber"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007A3D] text-right"
//               placeholder="أدخل رقم البطاقة"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
//             />
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="expiry" className="block mb-1 text-sm font-medium text-gray-700">تاريخ الانتهاء</label>
//               <div className="grid grid-cols-2 gap-2">
//                 <select
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007A3D]"
//                   value={expired.month}
//                   onChange={(e) => setExpired({ ...expired, month: e.target.value })}
//                 >
//                   <option value="">الشهر</option>
//                   {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
//                     <option key={month} value={month.toString().padStart(2, '0')}>
//                       {month.toString().padStart(2, '0')}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007A3D]"
//                   value={expired.year}
//                   onChange={(e) => setExpired({ ...expired, year: e.target.value })}
//                 >
//                   <option value="">السنة</option>
//                   {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div>
//               <label htmlFor="cvv" className="block mb-1 text-sm font-medium text-gray-700">رمز الأمان</label>
//               <input
//                 type="text"
//                 id="cvv"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007A3D] text-right"
//                 placeholder="CVV"
//                 maxLength="3"
//                 value={securityCode}
//                 onChange={(e) => setSecurityCode(e.target.value)}
//               />
//             </div>
//           </div>
          
//           <div>
//             <button
//               type="submit"
//               className="w-full px-4 py-3 text-white bg-[#CE1126] rounded-md hover:bg-[#A50E1F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CE1126] transition-colors duration-300"
//             >
//               إتمام الدفع
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>

//     {/* شعارات الأمان */}
//     <div className="flex items-center justify-center mt-8 space-x-4">
//       <img src="/path-to-secure-payment-icon.png" alt="الدفع الآمن" className="h-12" />
//       <img src="/path-to-visa-icon.png" alt="Visa" className="h-8" />
//       <img src="/path-to-mastercard-icon.png" alt="Mastercard" className="h-8" />
//     </div>
//   </div>
// </div>
//   );

// }

// export default CandidatePayment;