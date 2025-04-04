import { useState } from 'react';
import { FaFilter } from 'react-icons/fa'; // FontAwesome filter icon
import { AiOutlinePlus } from 'react-icons/ai'; // Ant Design Plus icon
import { MdViewModule } from 'react-icons/md'; // Material Design View Module icon

const MediaManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    createdByMe: true,
    status: '',
    tags: [],
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddAsset = () => {
    // Add asset logic here
  };

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">All media</h1>
        <button className="text-blue-500 hover:underline">
          How can we improve Media?
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Type to search for assets"
          value={searchTerm}
          onChange={handleSearch}
          className="flex-grow px-4 py-2 border rounded-md"
        />

        {/* Active Filters */}
        <div className="flex space-x-2">
          {filters.createdByMe && (
            <span className="px-2 py-1 bg-gray-200 rounded-full">Created by me</span>
          )}
          {filters.status && (
            <span className="px-2 py-1 bg-gray-200 rounded-full">Status is {filters.status}</span>
          )}
          {filters.tags.length > 0 && (
            <span className="px-2 py-1 bg-gray-200 rounded-full">Tags is one of {filters.tags.join(', ')}</span>
          )}
        </div>

        {/* Filter Button */}
        <button className="text-blue-500">
          <FaFilter />
          <span className="ml-2">Filter</span>
        </button>

        {/* View Dropdown */}
        <div className="relative">
          <button className="flex items-center space-x-1">
            <MdViewModule className="text-xl" />
            <span className="text-sm">View</span>
          </button>
          {/* Dropdown logic can be added here */}
        </div>

        {/* Add Asset Button */}
        <button
          onClick={handleAddAsset}
          className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          <AiOutlinePlus className="mr-2" />
          Add asset
        </button>
      </div>
    </div>
  );
};

export default MediaManager;
