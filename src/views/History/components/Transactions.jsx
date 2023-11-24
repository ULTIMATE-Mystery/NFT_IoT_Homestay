import React, { useState } from "react";
import { SearchOutlined, ExportOutlined } from "@ant-design/icons";
import Filter from "icons/Filter";
import TransactionCard from "./TransactionCard";
import LeftArrow from "icons/LeftArrow";
import RightArrow from "icons/RightArrow";
import GetAllContractsHomestay from "../GetAllContractsHomestay";

const Transactions = () => {
  const { data, isLoading } = GetAllContractsHomestay();
  const [mode, setMode] = useState(0);
  
  const itemsPerPage = 5; // Number of transactions per page
  const [currentPage, setCurrentPage] = useState(1);

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
      {/*Transaction history body */}
      <div className="w-full flex-row space-y-12">
        {/*Search and filter*/}
        <div className="w-full flex justify-between space-x-6">
          {/*Search*/}
          <div className="w-full flex flex-start p-2 bg-slate-800 rounded-lg">
            <div className="w-full flex flex-cols w-full justify-between space-x-2">
              <SearchOutlined />
              <input
                type="text"
                placeholder="Seach for transactions..."
                className="bg-slate-800 flex w-full outline-none"
              />
            </div>
          </div>
          {/*Filter*/}
          <button className="border border-white rounded-lg flex flex-end p-2 justify-between space-x-2">
            <Filter />
            <p>Filter</p>
          </button>
          {/*Export*/}
          <button className="border border-white rounded-lg flex flex-end p-2 justify-between space-x-2">
            <ExportOutlined />
            <p>Export</p>
          </button>
        </div>
        {/*Mode*/}
        <div className="flex space-x-4">
          <button
            className={`${
              !mode ? "bg-slate-600" : "bg-slate-800"
            } p-3 rounded-lg`}
            onClick={() => setMode(0)}
          >
            All transactions
          </button>
          <button
            className={`${
              !mode ? "bg-slate-800" : "bg-slate-600"
            } p-3 rounded-lg`}
            onClick={() => setMode(1)}
          >
            Analytics
          </button>
        </div>
        {/*Transactions card*/}
        {!mode
      ?(<div>
        <div className="w-full flex flex-row text-slate-500 p-4">
          <div class="basis-1/12 flex justify-center">Nft ID</div>
          <div class="basis-1/4 flex justify-center">Transaction hash</div>
          <div class="basis-1/6 flex justify-center">Timestamp</div>
          <div class="basis-1/4 flex justify-center flex justify-center">
            From
          </div>
          <div class="basis-1/12 flex justify-center">Room ID</div>
          <div class="basis-1/6 flex justify-center">Price</div>
        </div>
        <div>
          {isLoading && <p>Loading data...</p>}
          {currentData.length > 0 && (
            <>
              {currentData.map((data, index) => (
                <TransactionCard key={index} tokenId={parseInt(data)} />
              ))}
            </>
          )}
          {!isLoading && currentData.length === 0 && (
            <div>No contracts were created.</div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 mr-1 flex justify-end items-center">
          <div className="flex items-center space-x-2 ">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-600 text-white rounded shadow-md transition duration-200"
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-600 text-white rounded shadow-md transition duration-200 flex items-center justify-center"
            >
              <LeftArrow />
            </button>
            {/* Editable page number input with rounded square corners */}
            <input
              type="number"
              value={currentPage}
              onChange={handleInputChange}
              className="w-14 text-white bg-slate-900 text-center border border-slate-700 rounded-md focus:outline-none"
              min="1"
              max={totalPages}
            />
            <span className="text-slate-500 dark:text-slate-300">
              of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-600 text-white rounded shadow-md transition duration-200 flex items-center justify-center"
            >
              <RightArrow />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-600 text-white rounded shadow-md transition duration-200"
            >
              Last
            </button>
          </div>
        </div>
      </div>)
            :(<div>
              
      </div>)}
            
      </div>
    </>
  );
};

export default Transactions;
