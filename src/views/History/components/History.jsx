import React, { useState } from 'react';
import ContractData from './ContractData';
import SmallCard from './NftInfo';
import LeftArrow from "icons/LeftArrow";
import RightArrow from "icons/RightArrow";
import './index.scss';

const History = () => {
  const { data, isLoading } = ContractData();
  const itemsPerPage = 5;

  // State for managing the current page
  const [currentPage, setCurrentPage] = useState(1);

  const parseBigNumber = (value) => {
    return value ? value.toString() : '';
  };

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data to display only the rows for the current page
  const currentData = data ? data.slice(startIndex, endIndex) : [];

  // Calculate the total number of pages
  const totalPages = Math.ceil((data ? data.length : 0) / itemsPerPage);

  const handlePageChange = (newPage) => {
    // Ensure the new page is within bounds
    const clampedPage = Math.max(1, Math.min(newPage, totalPages));
    setCurrentPage(clampedPage);
  };

  const handleInputChange = (e) => {
    // Ensure the input value is within the range of 1 to totalPages
    const inputPage = parseInt(e.target.value, 10);
    const clampedPage = Math.max(1, Math.min(inputPage, totalPages));

    // Update the current page
    setCurrentPage(clampedPage);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl p-6 rounded-xl space-y-10 shadow-lg history-background">
        <div className="m-[2px] rounded-xl w-full grid gap-1.5 justify-items-center">
          {isLoading && <p>Loading data...</p>}
          {currentData.length > 0 && (
            <>
              {currentData.map((tokenId, index) => (
                <SmallCard key={index} tokenId={tokenId}></SmallCard>
              ))}
            </>
          )}
          {!isLoading && data && data.length === 0 && <div>No data available!</div>}
          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow-md transition duration-200"
              >
                First
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow-md transition duration-200 flex items-center justify-center"
              >
                <LeftArrow />
              </button>
              {/* Editable page number input with rounded square corners */}
              <input
                type="number"
                value={currentPage}
                onChange={handleInputChange}
                className="w-14 text-white bg-gray-700 text-center border border-gray-300 rounded-md focus:outline-none"
                min="1"
                max={totalPages}
              />
              <span className="text-gray-500 dark:text-gray-300">
                of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow-md transition duration-200 flex items-center justify-center"
              >
                <RightArrow />
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow-md transition duration-200"
              >
                Last
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
