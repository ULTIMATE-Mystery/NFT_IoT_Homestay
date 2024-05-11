import React, { useState, useEffect, useCallback } from 'react';
import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react';
import Loading from 'components/Loading';
import { CONTRACT_ADDRESS } from 'utils/constant';
import { formatDate } from 'utils/function/formatDate';
import { parseBigNumber } from 'utils/function/parseBigNumber';
import CryptoJS from 'crypto-js';
import LeftArrow from "icons/LeftArrow";
import RightArrow from "icons/RightArrow";
import deviceService from 'apis/services/deviceService';

const secretKey = process.env.REACT_APP_SECRET_KEY_WEB;
const itemsPerPage = 10; // Set the number of items per page

const LogCardCheckout = ({ tokenId }) => {
    const { contract } = useContract(CONTRACT_ADDRESS);
    const address = useAddress();
    const { data, isLoading } = useContractRead(contract, 'getLogsForToken', [tokenId], { from: address });
    const [currentPage, setCurrentPage] = useState(1);
    const [decryptedData, setDecryptedData] = useState([]);
    const [deviceData, setDeviceData] = useState([]);

    useEffect(() => {
        if (data) {
            const decrypted = decrypt(data);
            setDecryptedData(decrypted);
        }
    }, [data]);

    const decrypt = (encryptedData) => {
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey.toString());
        return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    };

    const totalPages = Math.ceil(decryptedData.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
    };

    const fetchDeviceData = useCallback(async () => {
        try {
            const response = await deviceService.getDeviceData();
            setDeviceData(response?.data || []);
        } catch (error) {
            console.error('Failed to fetch device data:', error);
        }
    }, []);
    
    useEffect(() => {
        fetchDeviceData();
    }, [fetchDeviceData]);
    console.log('device data', deviceData)
    return (
        <div className='log-card-checkout' style={{ maxWidth: '1920px', height: '1080px', overflowY: 'auto', padding: '20px' }}>
            {isLoading ? <Loading /> : (
                <div className='w-full h-full'>
                    {decryptedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => {
                        const device = deviceData.find(d => Number(d.DeviceCode) === Number(parseBigNumber(item[0])));
                        return (
                            <div key={index} className='flex flex-cols justify-center w-full mb-4 border-t text-300 font-bold text-slate-600 py-2'>
                                <div className='basis-1/4 flex justify-center text-slate-500'>{device ? device.DeviceName : 'Unknown Device'}</div>
                                <div className={`basis-1/4 flex justify-center ${parseBigNumber(item[1]) ? "text-lime-400" : "text-red-300"}`}>
                                    {!parseBigNumber(item[1]) ? "OFF" : parseBigNumber(item[1]) !== true ? parseBigNumber(item[1]) : "ON"}
                                </div>
                                <div className='basis-2/4 flex justify-center text-slate-500'>{formatDate(parseBigNumber(item[2]))}</div>
                            </div>
                        );
                    })}
                    {decryptedData.length === 0 && <div className='text-xl'>No logs were found.</div>}
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
            )}
        </div>
    );
};

export default LogCardCheckout;
