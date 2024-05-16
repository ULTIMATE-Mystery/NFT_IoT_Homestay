import React, { useState, useEffect } from "react";
import { SearchOutlined, ExportOutlined } from "@ant-design/icons";
import Filter from "icons/Filter";
import TransactionCard from "./TransactionCard";
import LeftArrow from "icons/LeftArrow";
import RightArrow from "icons/RightArrow";
import { formatDate } from 'utils/function/formatDate';
import { parseBigNumber } from 'utils/function/parseBigNumber';
import GetAllContractsHomestay from "../GetAllContractsHomestay";
import Loading from "components/Loading";

const Transactions = () => {
  const { data, isLoading } = GetAllContractsHomestay();
  const [mode, setMode] = useState(0);
  const [filters, setFilters] = useState({
    timestampStart: "",
    timestampEnd: "",
    roomId: "",
    minPrice: "",
    maxPrice: "",
  });
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const itemsPerPage = 5; // Number of transactions per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data to display only the rows for the current page
  const currentData = filteredData ? filteredData.slice(startIndex, endIndex) : [];

  // Calculate the total number of pages
  const totalPages = Math.ceil((filteredData ? filteredData.length : 0) / itemsPerPage);

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

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleFilterButtonClick = () => {
    setIsFilterModalVisible(true);
  };

  const handleFilterModalClose = () => {
    setIsFilterModalVisible(false);
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible((prevState) => !prevState);
  };

  const applyFilters = () => {
    let filtered = data || []; // Initialize filtered as an empty array if data is null or undefined
  
    // Timestamp filter
    if ((filters.timestampStart || filters.timestampEnd) && !(!filters.timestampStart && !filters.timestampEnd)) {
      filtered = filtered.filter((item) => {
        const timestamp = new Date(item.timestamp);
        if (filters.timestampStart && !filters.timestampEnd) {
          const startDate = new Date(filters.timestampStart);
          return timestamp >= startDate;
} else if (!filters.timestampStart && filters.timestampEnd) {
          const endDate = new Date(filters.timestampEnd);
          return timestamp <= endDate;
        } else if (filters.timestampStart && filters.timestampEnd) {
          const startDate = new Date(filters.timestampStart);
          const endDate = new Date(filters.timestampEnd);
          return timestamp >= startDate && timestamp <= endDate;
        }
      });
    }
  
    // Room ID filter
    if (filters.roomId) {
      const roomIds = filters.roomId.split(',').map(id => parseInt(id, 10));
      filtered = filtered.filter((item) => roomIds.includes(item.roomId));
    }
  
    // Price filter
    if ((filters.minPrice || filters.maxPrice) && !(!filters.minPrice && !filters.maxPrice)) {
      filtered = filtered.filter((item) => {
        const price = parseFloat(item.price);
        if (filters.minPrice && !filters.maxPrice) {
          const minPrice = parseFloat(filters.minPrice);
          return price >= minPrice;
        } else if (!filters.minPrice && filters.maxPrice) {
          const maxPrice = parseFloat(filters.maxPrice);
          return price <= maxPrice;
        } else if (filters.minPrice && filters.maxPrice) {
          const minPrice = parseFloat(filters.minPrice);
          const maxPrice = parseFloat(filters.maxPrice);
          return price >= minPrice && price <= maxPrice;
        }
      });
    }
  
    setFilteredData(filtered.length > 0 ? filtered : null);
    setIsFilterModalVisible(false);
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
                placeholder="Search for transactions..."
                className="bg-slate-800 flex w-full outline-none"
              />
            </div>
          </div>
          {/*Filter*/}
          <button
            className="border border-white rounded-lg flex flex-end p-2 justify-between space-x-2"
            onClick={handleFilterButtonClick}
          >
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
            className={`${!mode ? "bg-slate-600" : "bg-slate-800"} p-3 rounded-lg`}
            onClick={() => setMode(0)}
          >
            All transactions
          </button>
          <button
className={`${!mode ? "bg-slate-800" : "bg-slate-600"} p-3 rounded-lg`}
            onClick={() => setMode(1)}
          >
            Analytics
          </button>
        </div>
        {/*Transactions card*/}
        {!mode ? (
          <div>
            <div className="w-full flex flex-row text-slate-500 p-4">
              <div className="basis-1/12 flex justify-center">Nft ID</div>
              <div className="basis-1/4 flex justify-center">Transaction hash</div>
              <div className="basis-1/6 flex justify-center">Timestamp</div>
              <div className="basis-1/4 flex justify-center flex justify-center">
                From
              </div>
              <div className="basis-1/12 flex justify-center">Room ID</div>
              <div className="basis-1/6 flex justify-center">Price</div>
            </div>
            <div>
              {isLoading && 
              <div className='py-40 flex justify-center w-fit mx-auto'>
                <Loading/>
              </div>}
              {filteredData && currentData.length > 0 && (
                <>
                  {currentData.map((data, index) => (
                    <TransactionCard key={index} tokenId={parseInt(data)} filters={filters} />
                  ))}
                </>
              )}
              {!isLoading && filteredData === null && (
                <div>
                  <div className="justify-center flex">
                    <div className="text-4xl p-20 bg-gradient-to-r from-blue-700 via-sky-400 to-purple-600 bg-clip-text text-transparent w-fit mx-auto">
                      No contracts data
                    </div>
                  </div>
                </div>
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
          </div>
        ) : (
          <div></div>
        )}

        {/* Filter Modal */}
        {isFilterModalVisible && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg">
              <h2 className="text-3xl font-bold mb-8 text-white text-center">
                Filter Options
              </h2>

              <div className="space-y-8">
                <div>
                  <div className="uppercase text-gray-400 text-sm font-bold mb-2">
                    Timestamp
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label className="text-white text-sm block mb-1">Start Date</label>
                      <input
                        type="date"
                        value={filters.timestampStart}
                        onChange={(e) =>
                          handleFilterChange("timestampStart", e.target.value)
                        }
                        className="bg-gray-700 text-white rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="text-white text-sm block mb-1">End Date</label>
                      <input
                        type="date"
                        value={filters.timestampEnd}
                        onChange={(e) =>
                          handleFilterChange("timestampEnd", e.target.value)
                        }
                        className="bg-gray-700 text-white rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="uppercase text-gray-400 text-sm font-bold block mb-2">
Room ID
                  </label>
                  <input
                    type="text"
                    value={filters.roomId}
                    onChange={(e) => handleFilterChange("roomId", e.target.value)}
                    className="bg-gray-700 text-white rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    list="roomIdOptions"
                  />
                  <datalist id="roomIdOptions">
                    <option value="1">Room 1</option>
                    <option value="2">Room 2</option>
                  </datalist>
                </div>

                <div>
                  <div className="uppercase text-gray-400 text-sm font-bold mb-2">
                    Price
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label className="text-white text-sm block mb-1">Min Price</label>
                      <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                        className="bg-gray-700 text-white rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="text-white text-sm block mb-1">Max Price</label>
                      <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                        className="bg-gray-700 text-white rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 text-center">
                <button
                  onClick={applyFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Transactions;