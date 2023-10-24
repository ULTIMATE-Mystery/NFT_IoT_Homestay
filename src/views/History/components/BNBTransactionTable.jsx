import React, { useState } from 'react';
import LeftArrow from 'icons/LeftArrow';
import RightArrow from 'icons/RightArrow';
import { columns, data } from './data';

const Modal = ({ transaction, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-1/2 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-xl"
                >
                    ×
                </button>
                <h2 className="text-2xl mb-4">Transaction Details</h2>
                {columns.map(column => (
                    <div key={column.key} className="mb-3">
                        <strong>{column.title}: </strong>{' '}
                        {transaction[column.dataIndex]}
                    </div>
                ))}
            </div>
        </div>
    );
};

const BNBTransactionTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedData, setSelectedData] = useState(null); // Added the missing state
    const totalDataCount = data.length;
    const totalPages = Math.ceil(totalDataCount / rowsPerPage);

    const handleRowChange = e => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to the first page after changing rows
    };

    const gotoPage = pageNumber => {
        setCurrentPage(Math.min(Math.max(pageNumber, 1), totalPages));
    };

    const displayedData = data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="dark:bg-gray-800 p-4 rounded">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 dark:text-gray-300">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        {columns.map(column => (
                            <th
                                key={column.key}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {displayedData.map(data => (
                        <tr
                            key={data.key}
                            className="dark:hover:bg-gray-700"
                            onClick={() => setSelectedData(data)}
                        >
                            {' '}
                            {/* Added onClick handler */}
                            {columns.map(column => (
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {data[column.dataIndex]}
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

            {/* Navigation bar */}
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
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
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
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow-md transition duration-200 flex items-center justify-center" // Flexbox classes for centering
                    >
                        <LeftArrow />
                    </button>
                    <span className="text-gray-500 dark:text-gray-300">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => gotoPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow-md transition duration-200 flex items-center justify-center" // Added flexbox classes here
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

export default BNBTransactionTable;
