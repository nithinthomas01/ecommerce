import React, { useState } from 'react';

const PriceFilter = ({ handlePriceFilter }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    // Check if both minPrice and maxPrice are not empty before filtering
    if (minPrice !== '' && maxPrice !== '') {
      handlePriceFilter(parseFloat(minPrice), parseFloat(maxPrice));
    } else {
      // Handle error when one of the inputs is empty
      console.error('Please enter both minimum and maximum prices.');
    }
  };

  return (
    <div className="bg-gray-100 p-3 w-1/3 rounded-md shadow-md m-1">
      <h3 className="text-lg font-semibold mb-2">Price Range Filter</h3>
      <div className="flex flex-col gap-2">
        <label htmlFor="minPrice">Min Price:</label>
        <input
          type="number"
          id="minPrice"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="maxPrice">Max Price:</label>
        <input
          type="number"
          id="maxPrice"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        />
      </div>
      <button
        onClick={handleFilter}
        className="bg-blue-500 text-white px-2 py-1 rounded-md mt-3 hover:bg-blue-600"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default PriceFilter;
