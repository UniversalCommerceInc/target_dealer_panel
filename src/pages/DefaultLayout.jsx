import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuth,setIsAuth]=useState(localStorage.getItem("auth"));
  const naviagate=useNavigate();
  const Location=useLocation();

  useEffect(()=>{
    setIsAuth(localStorage.getItem("auth"));
  },[Location.pathname]);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [Location.pathname]);
if(!isAuth){
  naviagate("/auth/sign-in")
}
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* ===== Page Wrapper Start ===== */}
      <div className="flex h-screen overflow-hidden">
        {/* ===== Sidebar Start ===== */}
       {isAuth && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        {/* ===== Sidebar End ===== */}

        {/* ===== Content Area Start ===== */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* ===== Header Start ===== */}
         {isAuth && <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
          {/* ===== Header End ===== */}

          {/* ===== Main Content Start ===== */}
          <main>
            <div className="mx-auto animate-fadeIn bg-white dark:bg-black  dark:text-bodydark max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {isAuth && <> {loading ? <Loader /> : children}</>}
            </div>
          </main>
          {/* ===== Main Content End ===== */}
        </div>
        {/* ===== Content Area End ===== */}
      </div>
      {/* ===== Page Wrapper End ===== */}
    </div>
  );
};

export default DefaultLayout;
