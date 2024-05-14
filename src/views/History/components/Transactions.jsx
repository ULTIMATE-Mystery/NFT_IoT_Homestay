import React, { useState, useEffect, useRef } from "react";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import Filter from "icons/Filter";
import LeftArrow from "icons/LeftArrow";
import RightArrow from "icons/RightArrow";
import { useContractsData } from "./ContractsData";
import Loading from "components/Loading";
import { shortenAddress } from "utils/shortenAddress";
import { formatDate } from "utils/function/formatDate";

const Transactions = () => {
  const { data, isLoading } = useContractsData();
  const [mode, setMode] = useState(0);
  const itemsPerPage = 5; // Number of transactions per page
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filterInputs, setFilterInputs] = useState({
    timestampStart: '',
    timestampEnd: '',
    roomId: '',
    minPrice: '',
    maxPrice: ''
  });
  const [filters, setFilters] = useState({
    timestampStart: '',
    timestampEnd: '',
    roomId: '',
    minPrice: '',
    maxPrice: ''
  });
  const [filteredData, setFilteredData] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    if (data) {
      applyFilters();
    }
  }, [data, filters]);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data to display only the rows for the current page
  const currentData = filteredData.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  const handleFilterChange = (filterName, value) => {
    setFilterInputs(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const applyFilters = () => {
    let filtered = data;

    if (filters.timestampStart) {
      const startDate = new Date(filters.timestampStart).getTime();
      filtered = filtered.filter(item => item.createTimestamp >= startDate);
    }

    if (filters.timestampEnd) {
      const endDate = new Date(filters.timestampEnd).getTime();
      filtered = filtered.filter(item => item.createTimestamp <= endDate);
    }

    if (filters.roomId) {
      filtered = filtered.filter(item => item.roomId.toString() === filters.roomId);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(item => item.rentAmount >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(item => item.rentAmount <= parseFloat(filters.maxPrice));
    }

    setFilteredData(filtered);
  };

  const handleApplyFilters = () => {
    setFilters(filterInputs);
    setFiltersApplied(true);
    setIsFilterModalVisible(false);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      timestampStart: '',
      timestampEnd: '',
      roomId: '',
      minPrice: '',
      maxPrice: ''
    });
    setFilteredData(data);
    if (filtersApplied) {
      setCurrentPage(1);
      setFiltersApplied(false);
    }
  };

  const handleResetFilters = () => {
    setFilterInputs({
      timestampStart: '',
      timestampEnd: '',
      roomId: '',
      minPrice: '',
      maxPrice: ''
    });
  };

  // Close modal when clicking outside
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsFilterModalVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="w-full flex-row space-y-12">
        <div className="w-full flex justify-between items-center space-x-6">
          <div className="w-full flex items-center p-2 bg-slate-800 rounded-lg">
            <SearchOutlined className="mr-2" />
            <input
              type="text"
              placeholder="Search for transactions..."
              className="bg-slate-800 flex-grow outline-none"
            />
          </div>
          <div className="flex space-x-2">
            <button className="border border-white rounded-lg flex items-center p-2 space-x-2" onClick={toggleFilterModal}>
              <Filter />
              <p>Filter</p>
            </button>
            <button className="border border-white rounded-lg flex items-center p-2 space-x-2 w-[133px]" onClick={handleClearFilters}>
              <ClearOutlined />
              <p>Clear Filters</p>
            </button>
          </div>
        </div>
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
        {!mode ? (
          <div>
            <div className="w-full flex flex-row text-slate-500 p-4">
              <div className="basis-1/12 flex justify-center">NFT ID</div>
              <div className="basis-1/3 flex justify-center">Time created</div>
              <div className="basis-1/5 flex justify-center">Renter</div>
              <div className="basis-1/5 flex justify-center">Room ID</div>
              <div className="basis-1/5 flex justify-center">Price</div>
            </div>
            <div>
              {isLoading && (
                <div className="py-40 flex justify-center w-fit mx-auto">
                  <Loading />
                </div>
              )}
              {currentData.length > 0 && (
                <>
                  {currentData.map((data, index) => (
                    <div
                      key={index}
                      className="w-full flex flex-row bg-slate-800 mb-2 align-items-center align-center p-4 rounded-lg"
                    >
                      <div className="basis-1/12 flex justify-center">
                        {data.tokenId}
                      </div>
                      <div className="basis-1/3 flex justify-center">
                        {formatDate(data.createTimestamp)}
                      </div>
                      <div className="basis-1/5 flex justify-center">
                        {shortenAddress(data.renter)}
                      </div>
                      <div className="basis-1/5 flex justify-center">
                        {data.roomId}
                      </div>
                      <div className="basis-1/5 flex justify-center">
                        {data.rentAmount} VNĐ
                      </div>
                    </div>
                  ))}
                </>
              )}
              {!isLoading && currentData.length === 0 && (
                <div className="justify-center flex">
                  <div className="text-4xl p-20 bg-gradient-to-r from-blue-700 via-sky-400 to-purple-600 bg-clip-text text-transparent w-fit mx-auto">
                    No contracts data match filtered.
                  </div>
                </div>
              )}
            </div>
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
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
            <div ref={modalRef} className="relative bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg transform transition-transform duration-300 ease-in-out">
              <button
                onClick={() => setIsFilterModalVisible(false)}
                className="absolute top-0 right-0 m-3 text-white bg-transparent hover:bg-gray-700 focus:outline-none focus:bg-gray-700 rounded"
              >
                <span className="text-2xl">&times;</span> {/* Using '×' as the close icon */}
              </button>
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
                        value={filterInputs.timestampStart}
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
                        value={filterInputs.timestampEnd}
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
                    value={filterInputs.roomId}
                    onChange={(e) => handleFilterChange("roomId", e.target.value)}
                    className="bg-gray-700 text-white rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
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
                        value={filterInputs.minPrice}
                        onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                        className="bg-gray-700 text-white rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="text-white text-sm block mb-1">Max Price</label>
                      <input
                        type="number"
                        value={filterInputs.maxPrice}
                        onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                        className="bg-gray-700 text-white rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 text-center">
                <button
                  onClick={handleApplyFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleResetFilters}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out ml-4"
                >
                  Reset Filters
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
