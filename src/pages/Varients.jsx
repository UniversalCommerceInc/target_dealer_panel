import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteVariantsById, getVariantsById, updateVariant, updateVariantsById } from '../slices/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';

const inputClasses = "border border-zinc-300 rounded p-2 w-full bg-gray-100";
const buttonClasses = "bg-blue-600 text-white p-2 rounded hover:bg-blue-700";
const checkboxClasses = "mr-2";

const VarientDetails = () => {
    const [isLoader, setIsLoader] = useState(false);
    const [variantsData, setVariantsData] = useState({});
    const [editableData, setEditableData] = useState({});
    const dispatch = useDispatch();
    const { productId, varientId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoader(true);
                const result = await dispatch(getVariantsById(varientId));
                setVariantsData(result.payload.data);
                setEditableData(result.payload.data); 
            } catch (error) {
                console.error("Failed to fetch variant data", error);
            } finally {
                setIsLoader(false);
            }
        };

        fetchData();
    }, [dispatch, varientId]);

    if (isLoader) {
        return <Loader />;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEditableData(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleOptionChange = (e, index) => {
        const { name, value } = e.target;
        const updatedOptions = [...editableData.options];
        updatedOptions[index] = { ...updatedOptions[index], [name]: value };

        setEditableData(prevState => ({
            ...prevState,
            options: updatedOptions,
        }));
    };

    const getModifiedFields = () => {
        const modifiedFields = {};

        Object.keys(editableData).forEach(key => {
            if (JSON.stringify(editableData[key]) !== JSON.stringify(variantsData[key])) {
                modifiedFields[key] = editableData[key];
            }
        });

        return modifiedFields;
    };

    const handleUpdate = async () => {
        const modifiedData = getModifiedFields();
        const data={
            id:variantsData.id,
            variant:modifiedData
        }
        dispatch(updateVariantsById(data))
    toast.success("Updated Variants")
   
    };

    const handleDelete = async()=>{
         dispatch(deleteVariantsById(variantsData.id))
        toast.success("Delete Variants")
        setTimeout(()=>{
            navigate(`/product/${productId}`)
        },1000)
    }

    const { taxCategory = {}, priceWithTax = 0, outOfStockThreshold = 0, id, createdAt, updatedAt, visibility = false, options = [] } = editableData;

    return (
        <>
        <Toaster/>
        <div className="container mx-auto p-4 max-w-4xl">
            <div className='flex justify-end'>
            <div className="text-right mb-4 mr-5">
                <button onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700 p-2 rounded">Delete</button>
            </div>
            <div className="text-right mb-4">
                <button onClick={handleUpdate} className="bg-green-600 text-white hover:bg-green-700 p-2 rounded">Update</button>
            </div>
            </div>
            <div className="flex justify-between gap-2">
                <div className="w-2/3 border border-zinc-300 rounded p-4 mb-2">
                    <h1 className="text-2xl font-bold mb-4">{variantsData?.name}</h1>
                    <div className="grid grid-cols-2 gap-4 mb-6 border border-zinc-300 rounded p-4">
                        <div className="col-span-2">
                            <label className="block mb-1" htmlFor="name">Name</label>
                            <input
                                className={inputClasses}
                                type="text"
                                id="name"
                                name="name"
                                value={editableData?.name || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block mb-1" htmlFor="sku">SKU</label>
                            <input
                                className={inputClasses}
                                type="text"
                                id="sku"
                                name="sku"
                                value={editableData?.sku || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-4">Price and Tax</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4 border border-zinc-300 rounded p-4">
                        <div>
                            <label className="block mb-1" htmlFor="tax-category">Tax category</label>
                            <select
                                className={inputClasses}
                                id="tax-category"
                                name="taxCategory"
                                value={taxCategory?.name || ''}
                                onChange={handleInputChange}
                            >
                                <option value={taxCategory?.name || ''}>{taxCategory?.name || 'Select Tax Category'}</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1" htmlFor="price">Price</label>
                            <input
                                className={inputClasses}
                                type="text"
                                id="price"
                                name="price"
                                value={editableData?.price || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Taxes</label>
                            <input
                                className={inputClasses}
                                type="text"
                                readOnly
                                value={`Inc. ${taxCategory.name === 'Zero Tax' ? '0%' : '20%'} tax: $${(priceWithTax / 100).toFixed(2)}`}
                            />
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-4">Stock Levels</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4 border border-zinc-300 rounded p-4">
                        <div>
                            <label className="block mb-1" htmlFor="track-inventory">Track inventory</label>
                            <select
                                className={inputClasses}
                                id="track-inventory"
                                name="trackInventory"
                                value={editableData.trackInventory || 'Inherit from global settings'}
                                onChange={handleInputChange}
                            >
                                <option>Inherit from global settings</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1" htmlFor="out-of-stock-threshold">Out-of-stock threshold</label>
                            <input
                                className={inputClasses}
                                type="number"
                                id="out-of-stock-threshold"
                                name="outOfStockThreshold"
                                value={editableData?.outOfStockThreshold || 0}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block mb-1" htmlFor="default-stock-location">Default Stock Location</label>
                            <input
                                className={inputClasses}
                                type="number"
                                id="default-stock-location"
                                name="defaultStockLocation"
                                value={editableData?.defaultStockLocation || 100}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-4">Options</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4 border border-zinc-300 rounded p-4">
                        {options.length > 0 ? (
                            options.map((option, index) => (
                                <div key={index} className="col-span-2">
                                    <label className="block mb-1" htmlFor={`option-name-${index}`}>Option Name</label>
                                    <input
                                        className={inputClasses}
                                        type="text"
                                        id={`option-name-${index}`}
                                        name="name"
                                        value={option.name || ''}
                                        onChange={(e) => handleOptionChange(e, index)}
                                    />
                                    <label className="block mb-1" htmlFor={`option-value-${index}`}>Option Value</label>
                                    <input
                                        className={inputClasses}
                                        type="text"
                                        id={`option-value-${index}`}
                                        name="value"
                                        value={option.value || ''}
                                        onChange={(e) => handleOptionChange(e, index)}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No options available.</p>
                        )}
                    </div>
                </div>
                <div className="w-1/3 border border-zinc-300 rounded p-4">
                    <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <div>
                            <label className="block mb-1">ID</label>
                            <input className={inputClasses} readOnly type="text" value={id} />
                        </div>
                        <div>
                            <label className="block mb-1">Created At</label>
                            <input className={inputClasses} readOnly type="text" value={createdAt} />
                        </div>
                        <div>
                            <label className="block mb-1">Updated At</label>
                            <input className={inputClasses} readOnly type="text" value={updatedAt} />
                        </div>
                        <div className="flex items-center">
                            <input
                                className={checkboxClasses}
                                type="checkbox"
                                id="visibility"
                                name="visibility"
                                checked={editableData?.visibility || false}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="visibility">Visible</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

VarientDetails.propTypes = {
    productId: PropTypes.string,
    varientId: PropTypes.string,
};

export default VarientDetails;
