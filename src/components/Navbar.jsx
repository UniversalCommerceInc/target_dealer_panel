import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FaSun, FaMoon } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { TbMessageCircle2 } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import userFour from '../images/user/user-0.png'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { invokeFoundryToken } from '../slices/userSlice';  // Import the async thunk


const Navbar = ({sidebarOpen,setSidebarOpen}) => {
  const Navigate = useNavigate()
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false)
  // const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false)
  
  // Function to fetch the Foundry Token
  const fetchFoundryToken = () => {
    dispatch(invokeFoundryToken());
  };

  // Fetch token on mount and every 5 minutes
  useEffect(() => {
    fetchFoundryToken(); // Initial fetch

    const interval = setInterval(() => {
      fetchFoundryToken(); // Refresh token every 5 minutes
    }, 5 * 60 * 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout =()=>{
    localStorage.clear()

    Navigate("/auth/sign-in")
}

const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
};
  return (
    // <div className="flex items-center justify-between p-4 bg-card text-card-foreground">
    <div style={{zIndex:100}} className="sticky dark:bg-customBlue shadow-xl dark:text-gray-400 top-0 z-999 p-6 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none justify-between">
      <div className="flex lg:hidden items-center space-x-4">
        <button className="p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <GiHamburgerMenu className='text-3xl' />
        </button>
        {/* <img aria-hidden="true" alt="logo" src="" /> */}
      </div>
      <div className="flex items-center hidden space-x-4 flex-grow mx-4 sm:block">
        <div className="relative flex items-center w-full">
          <span className="absolute left-3 text-muted-foreground">
            <BsSearch className='text-2xl' />
          </span>
          <input
            type="text"
            placeholder="Type to search..."
            className="w-full dark:bg-transparent  pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4 ">
        <button
          className="relative p-2 rounded-full text-secondary-foreground hover:text-btnBlue"
          onClick={toggleTheme}
        >
          {isDarkMode ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
        </button>
        <button className="relative p-2 rounded-full  text-secondary-foreground hover:text-btnBlue">
          <HiOutlineBellAlert className='text-2xl' />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-destructive"></span>
        </button>
        <button className="relative p-2 rounded-full text-secondary-foreground hover:text-btnBlue">
          <TbMessageCircle2 className='text-2xl' />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-destructive"></span>
        </button>
        <div className="flex items-center space-x-2">
          <div className='flex'>
            <span></span>
            <span></span>
          </div>
          <img aria-hidden="true" alt="user-avatar " width={'40px'}  src={userFour}             className={`rounded-full ${isDarkMode ? 'invert' : ''}`}
 />
          <button className="p-2 hover:text-btnBlue" onClick={()=>setUserDropdownOpen((pre)=>!pre)}>
            <IoIosArrowDown className='text-2xl' />
          </button>
          {isUserDropdownOpen&&<div className="absolute right-5 top-14 mt-4 flex w-64 flex-col rounded-sm shadow:xl bg-white shadow-default dark:bg-secondryDark  ">
            <Link to='/profile' className="px-4 py-2 hover:bg-gray-100 dark:hover:text-btnBlue hover:text-btnBlue cursor-pointer">My Profile</Link>
            <Link className="px-4 py-2 hover:bg-gray-100 dark:hover:text-btnBlue hover:text-btnBlue cursor-pointer">My Contacts</Link>
            <Link className="px-4 py-2 hover:bg-gray-100 dark:hover:text-btnBlue hover:text-btnBlue cursor-pointer">Account Settings</Link>
            <hr className="border-t border-stroke dark:border-strokedark" />
            <div onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 dark:hover:text-btnBlue hover:text-btnBlue cursor-pointer">Logout</div>
          </div>
}
        </div>

      </div>
    </div>
  );
};

export default Navbar;