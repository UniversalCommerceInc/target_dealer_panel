import React from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';

const Breadcrumb = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);

  const handleGoBack = () => {
    if (location.state === "scan-order") {
      console.log("done")
      navigate("/all-orders");
      navigate(-1);

      
    } else {
      navigate(-1);
    }
  };

  return (
    <span className='text-l inline-flex items-center dark:bg-customBlue bg-white p-2 pl-5 pr-5 rounded-full shadow-md'>
      <Link to='#' onClick={handleGoBack} className='items-center inline-flex hover:text-btnBlue transition duration-200'>
        Orders<MdArrowForwardIos className='ml-2 mr-2' />
      </Link>
      <span className='items-center pointer-events-none inline-flex hover:text-btnBlue transition duration-200'>
        Order Details
      </span>
    </span>
  );
};

export default Breadcrumb;
