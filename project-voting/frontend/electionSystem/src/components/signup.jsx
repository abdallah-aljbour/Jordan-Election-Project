// import React, { useState } from 'react';
// import axios from '../components/axios';
// import { Link, useNavigate } from 'react-router-dom';

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     first_name: '',
//     last_name: '',
//     email: ''
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:4026/api/users/signup', formData);
//       navigate('/login');
//     } catch (error) {
//       console.error('Error during sign up:', error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded"
//           />
//           <input
//             type="text"
//             name="first_name"
//             placeholder="First Name"
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded"
//           />
//           <input
//             type="text"
//             name="last_name"
//             placeholder="Last Name"
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             required
//             className="w-full p-2 mb-4 border rounded"
//           />
//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
//             Sign Up
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <p>Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log In</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;