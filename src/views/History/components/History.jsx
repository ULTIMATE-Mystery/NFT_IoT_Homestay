import React, { useState, useEffect } from "react";
import LeftArrow from "icons/LeftArrow";
import RightArrow from "icons/RightArrow";
import Filter from "icons/Filter";
import { columns, data } from "./data";
import {useContract, useContractRead} from "@thirdweb-dev/react";
import Modal from "./HistoryModal";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const TransactionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE_OPTIONS[0]);
  const [selectedData, setSelectedData] = useState(null);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [displayedData, setDisplayedData] = useState([]);
  const [filter, setFilter] = useState("");
  const totalPages = Math.ceil(totalDataCount / rowsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      const startIdx = (currentPage - 1) * rowsPerPage;
      const endIdx = startIdx + rowsPerPage;
      let subsetData = data.slice(startIdx, endIdx);
      setTotalDataCount(data.length);
      setDisplayedData(subsetData);
    };

    fetchData();
  }, [currentPage, rowsPerPage]);

  const handleRowChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const gotoPage = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(pageNumber, 1), totalPages));
  };

  return (
    <div className="">
      <div class="pb-4 flex flex-row">
        <div class="relative flex items-center w-[85%] h-10 rounded-full focus-within:shadow-lg bg-gray-600 overflow-hidden">
          <div class="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            class="peer h-full w-full outline-none text-sm text-white pr-2 bg-gray-600 "
            type="text"
            id="search"
            placeholder="Search for transactions"
          />
        </div>
        <div className="ml-[10%]">
        <button
            onClick={() => setFilter("")}
            className="ml-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow-md transition duration-200 rounded-full"
          >
            {/* Place Filter icon and text inside a div for inline display */}
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </div>
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-separate border-spacing-y-2">
        
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="">
              {columns.map((column) => (
                <th key={column.index} scope="col" className="px-6 py-3">
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="">
            {displayedData.map((rowData, index) => (
              <tr
                key={index}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 "
                onClick={() => setSelectedData(rowData)}
              >
                {columns.map((column) => (
                  <td
                    key={column.index}
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {rowData[column.index]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {selectedData && (
          <Modal
            transaction={selectedData}
            onClose={() => setSelectedData(null)}
          />
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <label
            className="text-gray-500 dark:text-gray-300 mr-2"
            htmlFor="rows"
          >
            Show rows:
          </label>
          <select
            id="rows"
            value={rowsPerPage}
            onChange={handleRowChange}
            className="bg-gray-800 text-white rounded px-3 py-2 border dark:border-gray-600"
          >
            {PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => gotoPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow-md transition duration-200"
          >
            First
          </button>
          <button
            onClick={() => gotoPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow-md transition duration-200 flex items-center justify-center"
          >
            <LeftArrow />
          </button>
          <span className="text-gray-500 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => gotoPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow-md transition duration-200 flex items-center justify-center"
          >
            <RightArrow />
          </button>
          <button
            onClick={() => gotoPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow-md transition duration-200"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;