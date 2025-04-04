// import React ,{useEffect, useState} from 'react';
// import { Link } from 'react-router-dom';
// // import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
// import LogoDark from '../images/logo/logo-dark.svg';
// import Logo from '../images/logo/logo.svg';
// import img from "../images/mob.svg"
// import { signup } from '../slices/userSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import toast, { Toaster } from 'react-hot-toast';

// const SignUp= () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errors, setErrors] = useState({});
//   const dispatch = useDispatch();
//   const state = useSelector(state => state); 

//   const loading = useSelector(state => state.user.loading); 
//   const error = useSelector(state => state.user.error); 
//   const success = useSelector(state => state.user.success); 
//   console.log(state)
// useEffect(()=>{
//   if(success){
//     toast.error(error)
//   }
// },[success])
// useEffect(()=>{
//   if(error){
//     toast.error(error)
//   }
// },[error])
//   const validateForm = () => {
//     let errors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!name.trim()) {
//       errors.name = 'Name is required';
//     }

//     if (!email.trim()) {
//       errors.email = 'Email is required';
//     } else if (!emailRegex.test(email)) {
//       errors.email = 'Invalid email format';
//     }

//     if (!password.trim()) {
//       errors.password = 'Password is required';
//     } else if (password.length < 6) {
//       errors.password = 'Password must be at least 6 characters long';
//     } else if (!/[A-Z]/.test(password)) {
//       errors.password = 'Password must contain at least one capital letter';
//     }

//     if (password !== confirmPassword) {
//       errors.confirmPassword = 'Passwords do not match';
//     }

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     const isValid = validateForm();
  //  const data = {
  //   shopName: "Northbay",
  //   firstName: name,
  //   lastName: "G",
  //   emailAddress: email,
  //   password: password,
  //   phoneNumber: "+1 715 261 9709",
  //   additionalFields: {
  //       aadharNo: "9876 1234 5679",
  //       gstNo: "77ABCDE1234L1Z9",
  //       panNo: "MNOPQ1234P",
  //       addressLine1: "111 S 1st Avm",
  //       addressLine2: "Suite 509",
  //       city: "Wausaus",
  //       organization: "Northbay, Inc.",
  //       postalCode: "54401",
  //       province: "Wisconsin",
  //       countryCode: "US",
  //       googleMapLink: "https://maps.google.com/?q=111+S+1st+Ave+Wausau+WI+54401"
  //   }
// }

//     if (isValid) {
//       // Submit the form
      
//        dispatch(signup(data));

      
//       console.log('Form submitted:', { name, email, password, confirmPassword },data);
//     } else {
//       console.log('Form has errors:', errors);
//     }
   
//   };

//   return (
//     <>
// <Toaster
//   position="bottom-right"
//   reverseOrder={false}
// />
//       <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="relative flex justify-center ">
//         <div className="w-1/2 h-screen left-0 fixed  hidden  p-4  md:block ">
//             <div className=" px-26 text-center">
//               <div className=" inline-block" >
//               <h2 className=" text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
//               Dealer Panel</h2>
                
//               </div>

//               {/* <p className=" my-4 2xl:px-20">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit
//                 suspendisse.
//               </p> */}

//               <span className="mt-15 inline-block">
//               <img src={img} alt="mobile" loading="lazy" />

               
//               </span>
//             </div>
//           </div>

//           <div className="w-full md:w-1/2 md:ml-[50%] overflow-y-auto   border-stroke p-4 dark:border-strokedark  xl:border-l-2">
//             <div className="w-full px-4 sm:px-12.5 xl:px-17.5">
//               {/* <span className="mb-2 block font-medium">Start for free</span> */}
//               <h2 className="mb-4 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
//                 Sign Up 
//               </h2>

//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <label className="mb-2.5 block font-medium text-black dark:text-white">
//                     Name
//                   </label>
//                   <div className="relative">
//                   <input
//                       type="text"
//                       placeholder="Enter your full name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
//                     />
//                     {errors.name && (
//                       <p className="text-red-500 text-xs mt-1">{errors.name}</p>
//                     )}

//                     <span className="absolute right-4 top-4">
//                       <svg
//                         className="fill-current"
//                         width="22"
//                         height="22"
//                         viewBox="0 0 22 22"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <g opacity="0.5">
//                           <path
//                             d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
//                             fill=""
//                           />
//                           <path
//                             d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
//                             fill=""
//                           />
//                         </g>
//                       </svg>
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label className="mb-2.5 block font-medium text-black dark:text-white">
//                     Email
//                   </label>
//                   <div className="relative">
//                   <input
//                       type="email"
//                       placeholder="Enter your email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className={`w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
//                     />
//                     {errors.email && (
//                       <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//                     )}

//                     <span className="absolute right-4 top-4">
//                       <svg
//                         className="fill-current"
//                         width="22"
//                         height="22"
//                         viewBox="0 0 22 22"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <g opacity="0.5">
//                           <path
//                             d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
//                             fill=""
//                           />
//                         </g>
//                       </svg>
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label className="mb-2.5 block font-medium text-black dark:text-white">
//                     Password
//                   </label>
//                   <div className="relative">
//                   <input
//                       type="password"
//                       placeholder="6+ Characters, 1 Capital letter"
//                       value={password}
                      
//                       onChange={(e) => setPassword(e.target.value)}
//                       className={`w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
//                     />
//                     {errors.password && (
//                       <p className="text-red-500 text-xs mt-1">{errors.password}</p>
//                     )}

//                     <span className="absolute right-4 top-4">
//                       <svg
//                         className="fill-current"
//                         width="22"
//                         height="22"
//                         viewBox="0 0 22 22"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <g opacity="0.5">
//                           <path
//                             d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
//                             fill=""
//                           />
//                           <path
//                             d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
//                             fill=""
//                           />
//                         </g>
//                       </svg>
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mb-6">
//                   <label className="mb-2.5 block font-medium text-black dark:text-white">
//                     Re-type Password
//                   </label>
//                   <div className="relative">
//                   <input
//                       type="password"
//                       placeholder="Re-enter your password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       className={`w-full rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
//                     />
//                     {errors.confirmPassword && (
//                       <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
//                     )}

//                     <span className="absolute right-4 top-4">
//                       <svg
//                         className="fill-current"
//                         width="22"
//                         height="22"
//                         viewBox="0 0 22 22"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <g opacity="0.5">
//                           <path
//                             d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
//                             fill=""
//                           />
//                           <path
//                             d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
//                             fill=""
//                           />
//                         </g>
//                       </svg>
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mb-5">
//                 {loading?
//                   <button className=" relative w-full h-14 cursor-pointer rounded-lg border border-primary bg-blue-600 p-4 text-white transition hover:bg-opacity-90">
// <div className="absolute top-[40%] left-[50%] h-4 w-4 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
//                   </button>
//                 :
//                 <input
//                 type="submit"
//                 value="Create account"
//                 className="w-full cursor-pointer rounded-lg border border-primary bg-blue-600 p-4 text-white transition hover:bg-opacity-90"
//               />}
                 
//                 </div>

               

//                 <div className="mt-6 text-center">
//                   <p>
//                     Already have an account?{' '}
//                     <Link to="/auth/sign-in" className="text-primary">
//                       Sign in
//                     </Link>
//                   </p>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import img from "../images/mob.svg";
// import { signup } from '../slices/userSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import toast, { Toaster } from 'react-hot-toast';

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     shopName: 'Northbay',
//     firstName: '',
//     lastName: '',
//     emailAddress: '',
//     password: '',
//     confirmPassword: '',
//     phoneNumber: '',
//     aadharNo: '',
//     gstNo: '',
//     panNo: '',
//     addressLine1: '',
//     addressLine2: '',
//     city: '',
//     organization: '',
//     postalCode: '',
//     province: '',
//     countryCode: '',
//     googleMapLink: ''
//   });

//   const [errors, setErrors] = useState({});
//   const dispatch = useDispatch();

//   const loading = useSelector(state => state.user.loading); 
//   const error = useSelector(state => state.user.error); 
//   const success = useSelector(state => state.user.success); 

//   useEffect(() => {
//     if (success) {
//       toast.success('Signup successful!');
//     }
//   }, [success]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       window.location.reload(true);

//     }
//   }, [error]);

//   const validateForm = () => {
//     let errors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     Object.keys(formData).forEach(field => {
//       if (!formData[field].trim()) {
//         errors[field] = `${field} is required`;
//       }
//     });

//     if (formData.password.length < 6) {
//       errors.password = 'Password must be at least 6 characters long';
//     } else if (!/[A-Z]/.test(formData.password)) {
//       errors.password = 'Password must contain at least one capital letter';
//     }

//     if (formData.password !== formData.confirmPassword) {
//       errors.confirmPassword = 'Passwords do not match';
//     }

//     if (!emailRegex.test(formData.emailAddress)) {
//       errors.emailAddress = 'Invalid email format';
//     }

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const isValid = validateForm();
//     if (isValid) {
//       // Create the data object with nested additionalFields
//       const dataToSubmit = {
//         shopName: formData.shopName,
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         emailAddress: formData.emailAddress,
//         password: formData.password,
//         phoneNumber: formData.phoneNumber,
//         additionalFields: {
//           aadharNo: formData.aadharNo,
//           gstNo: formData.gstNo,
//           panNo: formData.panNo,
//           addressLine1: formData.addressLine1,
//           addressLine2: formData.addressLine2,
//           city: formData.city,
//           organization: formData.organization,
//           postalCode: formData.postalCode,
//           province: formData.province,
//           countryCode: formData.countryCode,
//           googleMapLink: formData.googleMapLink,
//         },
//       };
//       console.log(dataToSubmit)
//       dispatch(signup(dataToSubmit));
//       console.log('Form submitted:', dataToSubmit);
//     } else {
//       console.log('Form has errors:', errors);
//     }
//   };
  

//   return (
//     <>
//       <Toaster position="bottom-right" reverseOrder={false} />
//       <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="relative flex justify-center">
//           <div className="w-1/2 h-screen left-0 fixed hidden p-4 md:block ">
//             <div className="px-26 text-center">
//               <div className="inline-block">
//                 <h2 className="text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
//                   Dealer Panel
//                 </h2>
//               </div>
//               <span className="mt-15 inline-block">
//                 <img src={img} alt="mobile" loading="lazy" />
//               </span>
//             </div>
//           </div>

//           <div className="w-full md:w-1/2 md:ml-[50%] overflow-y-auto border-stroke p-4 dark:border-strokedark xl:border-l-2">
//             <div className="w-full px-4 sm:px-12.5 xl:px-17.5">
//               <h2 className="mb-4 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
//                 Sign Up 
//               </h2>

//               <form onSubmit={handleSubmit}>
//                 {Object.keys(formData).map((field) => (
//                   <div className="mb-4" key={field}>
//                     <label className="mb-2.5 block font-medium text-black dark:text-white capitalize">
//                       {field.replace(/([A-Z])/g, ' $1').trim()}
//                     </label>
//                     <input
//                       type={field === 'password' || field === 'confirmPassword' ? 'password' : 'text'}
//                       name={field}
//                       placeholder={`Enter your ${field}`}
//                       value={formData[field]}
//                       onChange={handleChange}
//                       className={`w-full rounded-lg border ${errors[field] ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
//                     />
//                     {errors[field] && (
//                       <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
//                     )}
//                   </div>
//                 ))}

//                 <div className="mb-6">
//                   {loading ? (
//                     <button className="relative w-full h-14 cursor-pointer rounded-lg border border-primary bg-blue-600 p-4 text-white transition hover:bg-opacity-90">
//                       <div className="absolute top-[40%] left-[50%] h-4 w-4 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
//                     </button>
//                   ) : (
//                     <input
//                       type="submit"
//                       value="Create account"
//                       className="w-full cursor-pointer rounded-lg border border-primary bg-blue-600 p-4 text-white transition hover:bg-opacity-90"
//                     />
//                   )}
//                 </div>

//                 <div className="mt-6 text-center">
//                   <p>
//                     Already have an account?{' '}
//                     <Link to="/auth/sign-in" className="text-primary">
//                       Sign in
//                     </Link>
//                   </p>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img from "../images/mob.svg";
import { signup } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { FiInfo } from 'react-icons/fi';

const SignUp = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    // Additional fields moved to a separate object for clarity
    aadharNo: '',
    gstNo: '',
    panNo: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    organization: '',
    postalCode: '',
    province: '',
    countryCode: '',
    googleMapLink: ''
  });

  const [errors, setErrors] = useState({});
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const dispatch = useDispatch();

  const loading = useSelector(state => state.user.loading);
  const error = useSelector(state => state.user.error);
  const success = useSelector(state => state.user.success);

  useEffect(() => {
    if (success) {
      toast.success('Signup successful!');
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      window.location.reload(true);
    }
  }, [error]);

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    Object.keys(formData).forEach(field => {
      if (!formData[field].trim() && (field !== 'aadharNo' && field !== 'gstNo' && field !== 'panNo')) {
        errors[field] = `${field} is required`;
      }
    });

    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'Password must contain at least one capital letter';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!emailRegex.test(formData.emailAddress)) {
      errors.emailAddress = 'Invalid email format';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // Create the data object with nested additionalFields
      const dataToSubmit = {
        shopName: formData.shopName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.emailAddress,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        additionalFields: {
          aadharNo: formData.aadharNo,
          gstNo: formData.gstNo,
          panNo: formData.panNo,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          organization: formData.organization,
          postalCode: formData.postalCode,
          province: formData.province,
          countryCode: formData.countryCode,
          googleMapLink: formData.googleMapLink,
        },
      };
      console.log(dataToSubmit);
      dispatch(signup(dataToSubmit));
      console.log('Form submitted:', dataToSubmit);
    } else {
      toast.error(`Form has errors:${errors} `);

      console.log('Form has errors:', errors);
    }
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative flex justify-center">
          <div className="w-1/2 h-screen left-0 fixed hidden p-4 md:block ">
            <div className="px-26 text-center">
              <div className="inline-block">
                <h2 className="text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Dealer Panel
                </h2>
              </div>
              <span className="mt-15 inline-block">
                <img src={img} alt="mobile" loading="lazy" />
              </span>
            </div>
          </div>

          <div className="w-full md:w-1/2 md:ml-[50%] overflow-y-auto border-stroke p-4 dark:border-strokedark xl:border-l-2">
            <div className="w-full px-4 sm:px-12.5 xl:px-17.5">
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up 
              </h2>

              <form onSubmit={handleSubmit}>
                {['shopName', 'firstName', 'lastName', 'emailAddress', 'password', 'confirmPassword', 'phoneNumber'].map((field) => (
                  <div className="mb-4" key={field}>
                    <label className="mb-2.5 block font-medium text-black dark:text-white capitalize">
                      {field.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                      type={field === 'password' || field === 'confirmPassword' ? 'password' : 'text'}
                      name={field}
                      placeholder={`Enter your ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                      className={`w-full rounded-lg border ${errors[field] ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                    )}
                  </div>
                ))}

                {/* Button to toggle visibility of additional fields */}
                <div className="mb-4">
                <button
                 type="button"
                 onClick={() => setShowAdditionalFields(!showAdditionalFields)}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
    >
      <FiInfo className="text-xl" />
      <span>                    {showAdditionalFields ? 'Hide Additional Fields' : 'Show Additional Fields'}
      </span>
    </button>
                  {/* <button
                    type="button"
                    onClick={() => setShowAdditionalFields(!showAdditionalFields)}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-blue-600 p-4 text-white transition hover:bg-opacity-90"
                  >
                    {showAdditionalFields ? 'Hide Additional Fields' : 'Show Additional Fields'}
                  </button> */}
                </div>

                {/* Additional fields only shown when toggle is true */}
                {showAdditionalFields && (
                  <>
                    {['aadharNo', 'gstNo', 'panNo', 'addressLine1', 'addressLine2', 'city', 'organization', 'postalCode', 'province', 'countryCode', 'googleMapLink'].map((field) => (
                      <div className="mb-4" key={field}>
                        <label className="mb-2.5 block font-medium text-black dark:text-white capitalize">
                          {field.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                          type="text"
                          name={field}
                          placeholder={`Enter your ${field}`}
                          value={formData[field]}
                          onChange={handleChange}
                          className={`w-full rounded-lg border ${errors[field] ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        />
                        {errors[field] && (
                          <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                        )}
                      </div>
                    ))}
                  </>
                )}

                <div className="mb-6">
                  {loading ? (
                    <button className="relative w-full h-14 cursor-pointer rounded-lg border border-primary bg-blue-600 p-4 text-white transition hover:bg-opacity-90">
                      <div className="absolute top-[40%] left-[50%] h-4 w-4 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
                    </button>
                  ) : (
                    <input
                      type="submit"
                      value="Create account"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-blue-600 p-4 text-white transition hover:bg-opacity-90"
                    />
                  )}
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{' '}
                    <Link to="/auth/sign-in" className="text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
