import React from 'react';
import MediaManager from './MediaManager';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdList, MdViewModule } from 'react-icons/md';
import { FaFilter } from 'react-icons/fa';

const mediaData = [
  {
    name: 'B1C3',
    dimensions: '294px × 202px',
    type: 'Image / webp',
    updated: '14 days ago',
    by: 'Santhosh K',
    status: 'Published',
  },
  {
    name: 'b1',
    dimensions: '1072px × 362px',
    type: 'Image / png',
    updated: '14 days ago',
    by: 'Santhosh K',
    status: 'Published',
  },
  {
    name: 'HealthPick6',
    dimensions: '266px × 300px',
    type: 'Image / webp',
    updated: '14 days ago',
    by: 'Santhosh K',
    status: 'Published',
  },
  // Add more objects as per the image data...
];
const containerClasses = "container mx-auto p-4";
const buttonClasses = "flex items-center text-zinc-500 hover:text-zinc-700 ml-2";
const tagClasses = "inline-block bg-zinc-200 text-zinc-700 text-sm rounded-full px-3 py-1 mr-2 mb-2";
const filterButtonClasses = "text-zinc-500 hover:text-zinc-700 ml-2";
const MediaComponent = () => {
  return (
    <div className="p-6 bg-gray-50">
    
    <div className={containerClasses}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold flex items-center"><MdList className="mr-2"/> All media</h1>
          <div className="flex items-center">
            <button className={buttonClasses}>How can we improve Media?</button>
            <button className="flex items-center space-x-1 ml-4">
              <MdViewModule className="text-xl" />
              <span className="text-sm">View</span>
            </button>
            <button
              className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ml-4"
            >
              <AiOutlinePlus className="mr-2" />
              Add asset
            </button>
          </div>
        </div>

        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="Type to search for assets" 
            className="border border-zinc-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-primary pr-12" 
          />
          <button className="absolute top-1/2 transform -translate-y-1/2 right-2 text-blue-500 flex items-center">
            <FaFilter />
            <span className="ml-2">Filter</span>
          </button>
        </div>

        <div className="flex flex-wrap">
          <span className={tagClasses}>Created by me</span>
          <span className={tagClasses}>Status is</span>
          <span className={tagClasses}>Tags is one of</span>
        </div>
      </div>
 
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
              </th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Dimensions</th>
              <th scope="col" className="px-6 py-3">Type</th>
              <th scope="col" className="px-6 py-3">Updated</th>
              <th scope="col" className="px-6 py-3">By</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {mediaData.map((media, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-100">
                <td className="px-6 py-4">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                </td>
                <td className="px-6 py-4 flex items-center">
                  <img src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnyoVrBMH7TS4dG8nLHswSlUJ31wUIWk2a_b1WocsKTSts5TiIPMaH0qE6iaXaVp3G3oE&s`} alt={media.name} className="w-8 h-8 mr-2" />
                  {media.name}
                </td>
                <td className="px-6 py-4">{media.dimensions}</td>
                <td className="px-6 py-4">{media.type}</td>
                <td className="px-6 py-4">{media.updated}</td>
                <td className="px-6 py-4">{media.by}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-sm ${
                    media.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {media.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MediaComponent;
