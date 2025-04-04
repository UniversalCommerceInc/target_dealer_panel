import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { FaBorderStyle } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
import { TbLineScan } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { logout } from '../slices/userSlice';
const Sidebar = ({sidebarOpen,setSidebarOpen}) => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [activeLink, setActiveLink] = useState(null);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    // const [sidebarOpen , setSidebarOpen] = useState(true)
//  console.log(window.location.pathname)

const handleLogout =()=>{
    dispatch(logout());
    localStorage.clear()

    navigate("/auth/sign-in")
}
    const toggleAccordion = (accordionName) => {
        setActiveAccordion(activeAccordion === accordionName ? null : accordionName);
    };

    const location = useLocation();

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    return (

        // <div className=  {`bg-zinc-900 text-zinc-200 w-60 h-screen hidden p-4 lg:block`}>
        <div  style={{zIndex:100,width:'280px'}}
        className={`absolute left-0 p-8 top-0 z-9999 flex h-screen shadow-xl w-96.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:text-textColor dark:bg-customBlue lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
            {sidebarOpen&&<div onClick={()=>setSidebarOpen(!sidebarOpen)}><RxCross2 className='text-3xl text-zinc-200'/></div>}
            {/* <div className="flex items-center mb-8">
                <img
                    src="https://purepng.com/public/uploads/large/purepng.com-target-icon-logologobrand-logoiconslogos-25151993959349wkf.png"
                    alt="logo"
                    className="mr-2 h-10"
                />
                <span className="text-3xl font-semibold whitespace-nowrap">  Target Retail Hub </span>
            </div> */}
            <div className="flex items-center gap-4 mb-8 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
    <img
        src="https://purepng.com/public/uploads/large/purepng.com-target-icon-logologobrand-logoiconslogos-25151993959349wkf.png"
        alt="Target Logo"
        className="h-14 w-14 object-contain rounded-full shadow-xl transition-transform duration-300 hover:scale-110 hover:shadow-red-500/50"
    />
    <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 tracking-wide animate-pulse">
    Target StoreOps
    </span>
</div>

            <nav className='mt-5 TEXT-xl'>
                <div className="mb-4">
                    <Link 
                        to="/dashboard"
                        className={`flex items-center text-xl mb-4  p-2 rounded-lg ${(activeLink === '/dashboard'||activeLink=='/'||activeLink==null) ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${(activeLink === '/dashboard'||activeLink=='/'||activeLink==null) ? 'text-white' : 'hover:text-white'} `}
                        
                    >
                        <LuLayoutDashboard className='' />
                        <span className="ml-3 ">Dashboard</span>
                    </Link>
                    <div>
                        <Link
                            to="#"
                            className={`flex justify-between items-center mb-4 text-xl p-2 rounded-lg cursor-pointer ${activeLink === 'orders' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === 'orders' ? 'text-white' : 'hover:text-white'}`}
                            onClick={() => toggleAccordion('orders')}
                        >
                            <div className="flex items-center">
                                <FaBorderStyle className="" />
                                <span className="ml-3 ">Orders</span>
                            </div>
                            <div>{(activeAccordion === 'orders'||activeLink=='/all-orders'||activeLink=='/orders/pending'||activeLink=='/orders/completed') ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
                        </Link>
                        {(activeAccordion === 'orders'||activeLink=='/all-orders'||activeLink=='/orders/pending'||activeLink=='/orders/completed' || activeLink=="/orders/cancel") && (
                            <div className="ml-10 text-l">
                                <Link 
                                    to="/all-orders"
                                    className={`block mb-2 text-l p-2 rounded-lg ${activeLink === '/all-orders' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === '/all-orders' ? 'text-white' : 'hover:text-white'}`}
                                   
                                >
                                    All Orders
                                </Link>
                                <Link 
                                    to="/orders/completed"
                                    className={`block mb-2 text-l p-2 rounded-lg ${activeLink === '/orders/completed' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === '/orders/completed' ? 'text-white' : 'hover:text-white'}`}
                                    
                                >
                                    Completed Orders
                                </Link>
                                <Link 
                                    to="/orders/pending"
                                    className={`block mb-2 text-l p-2 rounded-lg ${activeLink === '/orders/pending' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === '/orders/pending' ? 'text-white' : 'hover:text-white'}`}
                                   
                                >
                                    Pending Orders
                                </Link>
                                <Link 
                                    to="/orders/cancel"
                                    className={`block mb-2 text-l p-2 rounded-lg ${activeLink === '/orders/cancel' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === '/orders/cancel' ? 'text-white' : 'hover:text-white'}`}
                                    
                                >
                                    Cancelled Orders
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className='text-xl'>
                        <Link
                            to="#"
                            className={`flex justify-between items-center mb-4 text-l p-2 rounded-lg cursor-pointer ${activeLink === '#' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === '#' ? 'text-white' : 'hover:text-white'}`}
                            onClick={() => toggleAccordion('vendorInfo')}
                        >
                            <div className="flex items-center">
                                <GrStatusInfo className='text-xl' />
                                <span className="ml-3 text-l">Dealer Info</span>
                            </div>
                            <div>{(activeAccordion === 'vendorInfo' || activeLink=='/profile') ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
                        </Link>
                        {(activeAccordion === 'vendorInfo'||activeLink=='/profile') && (
                            <div className="ml-10 text-l">
                                <Link 
                                    to="/profile"
                                    className={`block mb-2 text-l p-2 rounded-lg ${activeLink === '/profile' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === '/profile' ? 'text-white' : 'hover:text-white'}`}
                                    
                                >
                                    Profile
                                </Link>
                               
                            </div>
                        )}
                    </div>
                    <Link 
                        to="/products"
                        className={`flex items-center mb-4 text-xl p-2 rounded-lg ${activeLink === '/products' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === '/products' ? 'text-white' : 'hover:text-white'}`}
                        
                    >
                        <AiOutlineProduct className='text-xl' />
                        <span className="ml-3 text-l">Products</span>
                    </Link>
                    <Link 
                        to="/scan-order"
                        className={`flex items-center mb-4 text-xl p-2 rounded-lg ${activeLink === '/scan-order' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === '/scan-order' ? 'text-white' : 'hover:text-white'}`}
                        
                    >
                        <TbLineScan className='text-xl' />
                        <span className="ml-3 text-l">Scan Order</span>
                    </Link>
                    <div
                        className={`flex items-center cursor-pointer mb-4 text-xl p-2 rounded-lg ${activeLink === 'logout' ? 'bg-btnBlue' : 'hover:bg-btnBlue'} ${activeLink === 'logout' ? 'text-white' : 'hover:text-white'}`}
                        onClick={() => handleLogout()}
                    >
                        <MdLogout className='text-xl' />
                        <span className="ml-3 text-l">Logout</span>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
