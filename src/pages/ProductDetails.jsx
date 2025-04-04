import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import { GrImage } from 'react-icons/gr';
import Modal from '../components/Modal';
import { useDispatch } from 'react-redux';
import { deleteProductItem, fetchSingleProduct, updateProductById, uploadAssets } from '../slices/productSlice';
import Loader from '../components/Loader';
import { RiH1 } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import ConfirmDeleteModal from './DeleteModal';
const rupees = process.env.REACT_APP_CURRENCY_SIGN;


const ProductDetails = () => {
  const [originalProduct, setOriginalProduct] = useState({})
  const dispatch = useDispatch()
  const [product, setProduct] = useState({
    name: '',
    slug: '',
    description: '',
    assets: [],
    enable: false
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const { id } = useParams()
  const [isLoader, setIsLoader] = useState(false)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [enable, setEnable] = useState(true)
  const [assets, setAssets] = useState([])
  const [filesToUpload, setFilesToUpload] = useState([]);

  // console.log(assetIds) array form
  // useEffect(()=>{

  //   const assetIds = product.assets.map(asset => asset.id);
  //   setProduct((prevState) => ({
  //     ...prevState,
  //     assetIds: [...(prevState.assetIds || []), ...assetIds],
  //   }));
  // },[filesToUpload])



console.log(product)


  const handleInputChange = (field, value) => {
    const updatedProduct = { ...product, [field]: value };

    // If the field being changed is the "name" field, generate the slug
    if (field === "name") {
      const slugValue = value
        .trim() // Remove leading/trailing spaces
        .toLowerCase() // Convert to lowercase
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, ''); // Remove all non-alphanumeric characters except hyphens

      // Update both the name and slug in the updatedProduct object
      updatedProduct.slug = slugValue;
    }

    // Update the product state with the new values
    setProduct(updatedProduct);

    // Normalize text comparison for description
    const normalizeHtml = (html) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      return tempDiv.textContent || tempDiv.innerText || '';
    };

    const normalizedOriginalDescription = normalizeHtml(originalProduct.description || '');
    const normalizedUpdatedDescription = normalizeHtml(updatedProduct.description || '');

    // Check if any of the fields have been modified
    const isModified =
      updatedProduct.name !== originalProduct.name ||
      updatedProduct.slug !== originalProduct.slug ||
      normalizedUpdatedDescription !== normalizedOriginalDescription ||
    

    // Update the isDisabled state based on whether there are modifications
    setIsDisabled(isModified);
  };

 
  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      const data = await dispatch(fetchSingleProduct(id));
      const fetchedProduct = data.payload.product;

      // Extract only the required fields
      const productData = {
        name: fetchedProduct?.name,
        slug: fetchedProduct?.slug,
        description: fetchedProduct?.description,
        enabled: fetchedProduct?.enabled,
        assets: fetchedProduct?.assets,
      };
      setEnable(productData.enabled)
      // Set the extracted data into the state
      setOriginalProduct(fetchedProduct); // Set the full product as the original product
      setProduct(productData); // Set only the specific fields
      setIsLoader(false);
    };

    fetchData();
  }, [id, dispatch]);


  // date correction in good formate
  function formatDate(dateString) {
    const dateObj = new Date(dateString);

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = dateObj.getFullYear();

    return `${day}-${month}-${year}`;
  }

  function formatPrice(price) {
    return price.toLocaleString('en-IN');
  }

  const handleDelete = () => {
    setIsOpen(true)
  }
  const confirmDeletion = async () => {

    // Dispatch delete action
    dispatch(deleteProductItem(originalProduct.id));


    toast.success('Product Deleted Successfully!');
    setTimeout(() => {

      navigate('/products');
    }, 1000)


    setIsOpen(false);

  };



  const handleUpdateData = async() => {
    const newData = {};

    // Check for differences and include only modified fields in newData
    if (product.name !== originalProduct.name) newData.name = product.name;
    if (product.slug !== originalProduct.slug) newData.slug = product.slug;
    if (product.description !== originalProduct.description) newData.description = product.description;
    if (enable !== originalProduct.enable) newData.enabled = enable;
    
    if(filesToUpload.length) {
      const assetIds = product.assets.map(asset => asset.id);
     
      const formData = new FormData();
    
      
        // Append each file to FormData
        filesToUpload.forEach((file, index) => {
          formData.append(`files[${index}]`, file);
        })

      const response = await dispatch(uploadAssets(formData));
     console.log(response)
      const assetuploadIds =  response.payload.data.createAssets.map(asset => asset.id);
      const productAssets =  product.assets.map(asset => asset.id);
      newData.assetIds = [...productAssets , ...assetuploadIds];

      if (Object.keys(newData).length > 0) {
        const data = {
          id: originalProduct.id,
          product: newData // Only include the modified fields
        };
  
        dispatch(updateProductById(data));
        toast.success("Updated Product");
      }
    }



    // If newData contains any modified fields, dispatch the update
    else {
      toast.info("No changes detected, product not updated");
    }
  };

 


  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);

    // Generate object URLs for local preview
    const updatedAssets = newFiles.map((file) => {
      const url = URL.createObjectURL(file);
      console.log('Object URL:', url); // Log the generated URLs
      return { file, url };
    });

    // Update state to include the new files and URLs
    setAssets((prevAssets) => [...prevAssets, ...updatedAssets]);
    setFilesToUpload((prevFiles) => [...prevFiles, ...newFiles]);
   
  };
 
  useEffect(()=>{
   if(filesToUpload.length>0) setIsDisabled(true)
  },[])
  

  if (isLoader) {
    return <Loader />
  }
  
  return (
    <>
      <Toaster />
      <Modal isDisabled={isDisabled} />
      {isOpen && <ConfirmDeleteModal isOpen={isOpen} setIsOpen={setIsOpen} confirmDeletion={confirmDeletion} />}
      <div className="mb-6">
        <span className="text-l inline-flex items-center dark:bg-customBlue bg-white p-2 pl-5 pr-5 rounded-full shadow-md">
          <Link to="/dashboard" className="items-center inline-flex hover:text-btnBlue transition duration-200">
            Dashboard<MdArrowForwardIos className="ml-2 mr-2" />
          </Link>
          <Link to="/products" className="items-center inline-flex hover:text-btnBlue transition duration-200">
            Products<MdArrowForwardIos className="ml-2 mr-2" />
          </Link>
          <Link className="items-center pointer-events-none inline-flex text-blue-800 hover:text-btnBlue transition duration-200">
            {originalProduct?.name}
          </Link>
        </span>
      </div>
      <div className="overflow-x-auto bg-white dark:bg-customBlue p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-3">
          <div><h4 className="font-bold text-xl">{originalProduct?.name}</h4></div>
          <div className='flex'>
            <button onClick={handleDelete} className="bg-red-500 flex items-center hover:bg-red-700 rounded-lg text-white pl-3 pr-3 pt-2 pb-2 mr-5">
              Delete
            </button>
            {isDisabled && <button
              onClick={handleUpdateData}
              className={`flex items-center bg-btnBlue hover:bg-blue-700 rounded-lg text-white pl-3 pr-3 pt-2 pb-2`}
            >
              Update
            </button>}


          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-100 gap-5">
          <div className="col-span-70">
            <div className="rounded-lg border p-5 dark:bg-slate-700">
              <div className="flex justify-between gap-5">
                <div className="w-full mb-5">
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                    Product name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={product?.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1 block w-full text-slate-900 text-lg dark:bg-customBlue dark:text-white   *: border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    placeholder="Enter product name"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                    Slug
                  </label>
                  <input
                    type="text"
                    id="slug"
                    value={product?.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className="mt-1 block w-full border text-slate-900 text-lg dark:bg-customBlue dark:text-white  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    placeholder="Enter slug"
                  />
                </div>
              </div>
              <div className="w-full mb-12 rounded-lg">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <ReactQuill
                  className="dark:bg-customBlue dark:text-gray-700"
                  theme="snow"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ['bold', 'italic', 'underline'],
                      ['image', 'code-block'],
                      ['insert',]
                    ],
                  }}
                  style={{ height: '100px' }}
                  placeholder="Compose an epic..."
                  onChange={(value) => handleInputChange('description', value)}
                  value={product.description}
                />
              </div>
            </div>

            <div className="p-4 border mt-5 rounded-lg dark:bg-slate-700 bg-white shadow-md max-w-4xl mx-auto">
              {/* Original Assets Section */}
              <h2 className="text-xl font-semibold mb-4">Assets</h2>
              <div className="grid grid-cols-8 gap-4">
                {originalProduct?.assets?.map((el, index) => (
                  <img
                    key={index}
                    src={el?.preview}
                    alt={`Asset ${index}`}
                    className="w-full h-full object-cover border border-gray-300 rounded-lg"
                  />
                ))}
              </div>

              {/* Add New Assets Section */}
              <hr className='mt-4' />
              <h2 className="text-xl font-semibold mt-4">Add New Assets</h2>

              {/* Integrated UI for adding new assets */}
              <div className="p-4 border mt-5 rounded-lg dark:bg-slate-700 bg-white shadow-md max-w-4xl mx-auto flex relative">
                {/* Left Section: Main Image */}
                <div className="w-1/4 flex-shrink-0 h-40 dark:bg-customBlue border border-gray-300 rounded-lg bg-gray-100 flex items-center justify-center">
                  {assets.length === 0 ? (
                    <div className="text-center p-8">
                      <GrImage size={"100%"} />
                    </div>
                  ) : (
                    <img
                      src={assets[0].url} // Display the first uploaded image as the featured asset
                      alt="Featured asset"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>

                {/* Right Section: Other Images and Add Asset */}
                <div className="w-3/4 ml-4 flex flex-col">
                  {/* Other Images */}
                  <div className="flex-1 grid grid-cols-4 gap-2 mb-4">
                    {assets.slice(1).map((asset, index) => (
                      <div key={index} className="w-full h-24 border border-gray-300 rounded-lg overflow-hidden">
                        <img
                          src={asset.url}
                          alt={`Asset ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Add Asset Button */}
                  <label className="mt-auto w-40 dark:bg-btnBlue px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer">
                    <svg
                      className="w-5 h-5 inline-block mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add asset
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>
            </div>


            <div className="p-4 mt-5 border rounded-lg bg-white dark:bg-slate-700 shadow-md max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">Product Variants</h2>
              {(!originalProduct?.variants?.length) ? <h1>No Variants</h1> :
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 dark:bg-slate-600">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">SKU</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Options</th>
                      </tr>
                    </thead>

                    <tbody className="bg-white dark:bg-slate-700 divide-y divide-gray-200">
                      {originalProduct?.variants?.map((variant, index) => (
                        <tr onClick={() => navigate(`/product/${originalProduct?.id}/varients/${variant?.id}`)} key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{variant?.sku}</td>
                          <td className="py-4 px-6 whitespace-nowrap text-zinc-700 dark:text-zinc-300">
                            {rupees} {formatPrice(Number(variant?.price) || 0)}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{variant.stockOnHand}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {variant.options.map((option, optIndex) => (
                              <span key={optIndex} className="block">
                                {option.name}
                              </span>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              }
            </div>

          </div>
          <div className="col-span-30">
            <div className="items-center">
              <div className="border  p-3 rounded-lg dark:bg-slate-700">
                <div className="flex  text-sm font-medium">
                  <p className='text-gray-700'>ID: <span className='text-black-2'>{originalProduct?.id}</span></p>
                </div>
                <div className="flex mt-1 text-sm font-medium">
                  <p className="text-gray-700">
                    Created at: <span className="text-black-2">{formatDate(originalProduct?.createdAt)}</span>
                  </p>
                </div>
                <div className="flex mt-1 text-sm font-medium">
                  <p className='text-gray-700'>Updated at: <span className='text-black-2'>{formatDate(originalProduct?.updatedAt)}</span></p>
                </div>
              </div>
              <div className="border mt-5 p-3 mb-4 rounded-lg dark:bg-slate-700">
                <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">
                  Visibility
                </label>
                <div className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    id="visibility"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    // defaultChecked
                    checked={enable}
                    onChange={(e) => setEnable((pre) => !pre)}

                  />
                  <span className="ml-2 text-sm text-gray-700">Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
