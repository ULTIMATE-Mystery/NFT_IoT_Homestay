import React, { useState, useEffect } from 'react';
import SmallCard from './SmallCard';
import GetBookedContracts from '../GetBookedContracts';
import Loading from 'components/Loading';
import { useAddress } from '@thirdweb-dev/react';
import LeftArrow from "icons/LeftArrow";
import RightArrow from "icons/RightArrow";

const itemsPerPage = 8; // 4 items per row, 2 rows per page

const Booked = ({ isButtonClicked, page, contractId, selectContract, setModalCheckoutOpened }) => {
    const address = useAddress();
    const { data, isLoading } = GetBookedContracts();
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 1;

    const handlePageChange = (newPage) => {
        setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
    };

    const select = (id) => {
        selectContract(id);
    };

    return (
        <div className="bg-slate-900 rounded-xl p-6">
            <div className="flex rounded-xl text-base mt-8 relative">
                <div className={`${page === "booking" ? "min-[1580px]:grid-cols-4 min-[1400px]:grid-cols-4" : ""} m-[2px] rounded-xl w-full grid lg:grid-cols-4 min-[780px]:grid-cols-2 grid-cols-1 justify-between justify-items-center gap-10`}>
                    {isLoading && (
                        <div className='absolute py-40 flex justify-center'>
                            <Loading />
                        </div>
                    )}
                    {isButtonClicked && data && !isLoading && (
                        <>
                            {data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((data, index) => (
                                <SmallCard
                                    key={index}
                                    tokenId={data}
                                    page={page}
                                    contractId={contractId}
                                    select={select}
                                    setModalCheckoutOpened={setModalCheckoutOpened}
                                ></SmallCard>
                            ))}
                        </>
                    )}
                </div>
            </div>
            {address && !isLoading && data.length === 0 &&
                <div className='justify-center flex w-full'>
                    <div className="text-4xl p-20 bg-gradient-to-r from-blue-700 via-sky-400 to-purple-600 bg-clip-text text-transparent w-fit mx-auto">
                        No contracts were created.
                    </div>
                </div>}
            {!address && (
                <div className='justify-center flex w-full'>
                    <div className="text-4xl p-20 bg-gradient-to-r from-blue-700 via-sky-400 to-purple-600 bg-clip-text text-transparent w-fit mx-auto">
                        You need to connect wallet first.
                    </div>
                </div>)
            }
            <div className='mt-4 flex justify-center items-center w-full'>
                <div className="flex items-center space-x-2">
                    <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="px-3 py-2 bg-slate-800 hover:bg-slate-600 text-white rounded shadow-md transition duration-200">First</button>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-2 bg-slate-800 hover:bg-slate-600 text-white rounded shadow-md transition duration-200 flex items-center justify-center">
                        <LeftArrow />
                    </button>
                    <input type='number' value={currentPage} onChange={(e) => handlePageChange(Number(e.target.value))} className='text-center w-14 bg-slate-900 text-white border border-slate-700 rounded-md focus:outline-none' />
                    <span className="text-slate-500 dark:text-slate-300">of {totalPages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-2 bg-slate-800 hover:bg-slate-600 text-white rounded shadow-md transition duration-200 flex items-center justify-center">
                        <RightArrow />
                    </button>
                    <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="px-3 py-2 bg-slate-800 hover:bg-slate-600 text-white rounded shadow-md transition duration-200">Last</button>
                </div>
            </div>
        </div>
    );
};

export default Booked;
