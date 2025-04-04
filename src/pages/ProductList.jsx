import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { LuView } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { fetchAllProducts } from '../slices/productSlice';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';

const rupees = process.env.REACT_APP_CURRENCY_SIGN;
const ProductList = () => {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [isLoader, setIsLoader] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true)
      const data = await dispatch(fetchAllProducts());
      setProducts(data?.payload?.products?.items)
      setIsLoader(false)
    };

    fetchData();

  }, []);

  function formatPrice(price, decimalPlaces = 2) {
    return price.toLocaleString('en-IN', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces
    });
  }

  if (isLoader) {
    return <Loader />
  }

  return (
    <>

      <div className=" h-full bg-white dark:bg-customBlue p-6 rounded-lg shadow-lg">
        <div className='flex justify-end mb-3'>
          <Link to='/products/create' className='bg-btnBlue  flex items-center hover:bg-blue-700 rounded-lg text-white pl-3 pr-3 pt-2 pb-2'>
            <FaPlus className='mr-2' /> New Product
          </Link>
        </div>
        <table className="min-w-full bg-white dark:bg-customBlue rounded-lg overflow-hidden">
          <thead className='border-b '>
            <tr className="bg-zinc-100 dark:bg-customBlue">
              <th className="py-4 px-6 text-left text-l font-medium text-zinc-700 dark:text-zinc-300">Product Name</th>
              <th className="py-4 px-6 text-left  text-l font-medium text-zinc-700 dark:text-zinc-300">Category</th>
              <th className="py-4 px-6 text-left text-l font-medium text-zinc-700 dark:text-zinc-300">Price</th>
              <th className="py-4 px-6 text-left text-l font-medium text-zinc-700 dark:text-zinc-300"></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={index} onClick={() => navigate(`/product/${product.id}`)} className="border-b border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-slate-800 transition duration-300">
                <td className="py-4 px-6 flex items-center">
                  <img src={product?.featuredAsset?.preview} alt={product.name} className="w-20 h-20 object-cover mr-4 rounded-sm shadow-md" />
                  <span className="text-zinc-900 dark:text-zinc-100">{product.name}</span>
                </td>
                <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300">{product?.category || 'N/A'}</td>
                <td className="py-4 px-6 whitespace-nowrap text-zinc-700 dark:text-zinc-300">
                  {rupees} {formatPrice(Number(product?.variantList?.items?.[0]?.price) || 0)}
                </td>

                <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300 relative">
                  <div className="flex space-x-4">
                    {/* <button
                      className="flex items-center text-blue-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 focus:outline-none transition-colors duration-200"
                      title="Edit"
                      about='Edit'
                    >
                      <FaRegEdit />
                    </button> */}
                    {/* <button
                      className="flex items-center text-red-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 focus:outline-none transition-colors duration-200"
                      title="Delete"
                      about='Delete'
                    >
                      <AiOutlineDelete />
                    </button> */}
                    <Link
                      className="flex items-center text-teal-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 focus:outline-none transition-colors duration-200"
                      title="View"
                      to={`/product/${product.id}`}
                      about='View'
                    >
                      <LuView />
                    </Link>
                  </div>
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;
