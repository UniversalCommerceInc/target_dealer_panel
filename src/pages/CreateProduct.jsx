import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import { GrImage } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { createProductItem, uploadAssets } from '../slices/productSlice';
import toast, { Toaster } from 'react-hot-toast';

const rupees = process.env.REACT_APP_CURRENCY_SIGN;

const CreateProduct = ({ product }) => {
  const [assets, setAssets] = useState([])
  const [filesToUpload, setFilesToUpload] = useState([]);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [createItem, setCreateItem] = useState({
    name: "",
    slug: "",
    description: "",
    enable: false,
    assetIds: []
  })

  const [variantsData,setVariantsData] = useState({
    name:"",
    sku:"",
    price: 0,
    stock: 0,
  })

  const handleVariantsInput =(e)=>{
    const {name,value} = e.target;
    setVariantsData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  
  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
  
    // If the input field being changed is the "name" field
    if (name === "name") {
      // Generate the slug based on the name value
      const slugValue = value
        .trim() // Remove leading/trailing spaces
        .toLowerCase() // Convert to lowercase
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, ''); // Remove all non-alphanumeric characters except hyphens
  
      // Update both the name and slug fields in the state
      setCreateItem((prevState) => ({
        ...prevState,
        name: value,
        slug: slugValue,
      }));
    } else {
      // For other fields, handle the input change normally
      setCreateItem((prevState) => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };
  

  const handleDescriptionChange = (value) => {
    setCreateItem((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  const handleSubmit = async () => {
    const isNameEmpty = createItem.name.trim() === "" || createItem.slug.trim() === "";
  
    if (isNameEmpty) {
      toast.error("Name and Slug cannot be empty");
      return;
    }
  
    const formData = new FormData();
    
    if (filesToUpload.length > 0) {
      // Append each file to FormData
      filesToUpload.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
    
      try {
        // Await the upload assets dispatch to get the response
        const response = await dispatch(uploadAssets(formData)).unwrap();
    
        // Handle the successful response
       
        toast.success("Product Added successfully");
    
        // Extract asset IDs and update the createItem state
        const assetIds = response.data.createAssets.map(asset => asset.id);
        setCreateItem((prevState) => ({
          ...prevState,
          assetIds: [...(prevState.assetIds || []), ...assetIds],
        }));
    
        // Ensure createItem is updated with the latest asset IDs
        const updatedCreateItem = {
          ...createItem,
          assetIds: [...(createItem.assetIds || []), ...assetIds],
        };
        const data ={
         product: updatedCreateItem,variant:variantsData
        }
        // Dispatch createProductItem with the updated createItem including assetIds
        const submitResponse = await dispatch(createProductItem(data)).unwrap();
        toast.success("Product created successfully");
       
      } catch (error) {
       
        // toast.error(error.message || "An error occurred during asset upload");
      }
    } else {
      try {
        // No assets to upload, proceed with product creation directly
        const data ={
         product: createItem,variant:variantsData
        }
        const submitResponse = await dispatch(createProductItem(createItem)).unwrap();
        toast.success("Product created successfully");
        
      } catch (error) {
       
        toast.success("Product Added Successfully")
        // toast.error(error.message || "An error occurred during product creation");
      }
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

  

  return (
    <>
      <Toaster />
      <div className="mb-6">
        <span className="text-l inline-flex items-center dark:bg-customBlue bg-white p-2 pl-5 pr-5 rounded-full shadow-md">
          <Link to="/dashboard" className="items-center inline-flex hover:text-btnBlue transition duration-200">
            Dashboard<MdArrowForwardIos className="ml-2 mr-2" />
          </Link>
          <Link to="/products" className="items-center inline-flex hover:text-btnBlue transition duration-200">
            Products<MdArrowForwardIos className="ml-2 mr-2" />
          </Link>
          <Link className="items-center pointer-events-none inline-flex hover:text-btnBlue transition duration-200">
            Product Details
          </Link>
        </span>
      </div>
      <div className="overflow-x-auto bg-white dark:bg-customBlue p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-3">
          <div><h4 className="font-bold text-xl">New Product</h4></div>
          <div>
            <button onClick={handleSubmit} className="bg-blue-300 flex items-center hover:bg-blue-700 rounded-lg text-white pl-3 pr-3 pt-2 pb-2">
              Create
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-100 gap-5">
          <div className="col-span-70">
            <div className="rounded-lg  border p-5 dark:bg-slate-700">
              <div className="flex  justify-between gap-5">
                <div className="w-full mb-5">
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                    Product name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    onChange={handleInputChange}
                    name='name'
                    className="mt-1 block w-full dark:bg-customBlue border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
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
                    name='slug'
                    value={createItem.slug}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border dark:bg-customBlue border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    placeholder="Enter slug"
                  />
                </div>
              </div>
              <div className="w-full mb-12 rounded-lg">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <ReactQuill
                  className="dark:bg-customBlue  dark:text-gray-700"
                  theme="snow"
                  value={createItem.description}
                  onChange={handleDescriptionChange}
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
                />
              </div>
            </div>
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
                        alt={`Asset ${index + 2}`}
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

              {/* Conditionally Render Upload Button */}
              {/* {assets.length > 0 && (
                <div className="absolute bottom-4 right-4">
                  <button onClick={handleUploadAssets} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
                    Upload
                  </button>
                </div>
              )} */}
            </div>


            <div className="p-4 mt-5 border rounded-lg bg-white dark:bg-slate-700 shadow-md max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">Product variants</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="option" className="block text-sm font-medium text-gray-700">Option</label>
                    <input
                      type="text"
                      id="option"
                      placeholder="e.g. Size"
                      className="mt-1 block w-full border dark:bg-customBlue border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-700"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="option-values" className="block text-sm font-medium text-gray-700">Option values</label>
                    <input
                      type="text"
                      id="option-values"
                      className="mt-1 block w-full border dark:bg-customBlue border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {/* <button className="absolute top-8 right-2 text-gray-500 hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </button> */}
                  </div>
                </div>
                <button className="mt-2 px-4 py-2 border dark:bg-btnBlue border-gray-300 rounded-lg bg-white text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add option
                </button>
                <div>
                  <label htmlFor="stock-location" className="block text-sm font-medium text-gray-700">Add stock to location</label>
                  <select
                    id="stock-location"
                    className="mt-1 block w-full border dark:bg-customBlue border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                  >
                    <option>Default Stock Location</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
                    <input
                      type="text"
                      id="sku"
                      name='sku'
                      onChange={handleVariantsInput}
                      className="mt-1 block w-full border dark:bg-customBlue border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {/* <span className="text-gray-500 sm:text-sm">US$</span> */}
                      </div>
                      <input
                        type="text"
                        id="price"
                        name='price'
                        placeholder={`${rupees} 0.00`}
                        onChange={handleVariantsInput}
                        className="mt-1 block w-full border dark:bg-customBlue border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                      type="text"
                      id="stock"
                      name='stock'
                      onChange={handleVariantsInput}
                      className="mt-1 block w-full border dark:bg-customBlue border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-30">
            <div className="items-center">
              <div className="border p-3 mb-4 rounded-lg dark:bg-slate-700">
                <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">
                  Visibility
                </label>
                <div className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    id="visibility"
                    onChange={handleInputChange}
                    name='enable'
                    checked={createItem.enable}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-700">Enabled</span>
                </div>
              </div>
              <div className="border p-3 rounded-lg dark:bg-slate-700">
                <label htmlFor="facets" className="block text-sm font-medium text-gray-700">
                  Facets
                </label>
                <button
                  type="button"
                  className="mt-1 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:bg-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  + Add facets
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
