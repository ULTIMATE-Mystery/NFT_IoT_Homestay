import React, { useState, useEffect } from 'react';
import { useContract, useAddress } from '@thirdweb-dev/react';
import { parseBigNumber } from 'utils/function/parseBigNumber.js';
import { CONTRACT_ADDRESS } from 'utils/constant.ts';

export function useManagementData() {
    const [totalRent, setTotalRent] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalContracts, setTotalContracts] = useState(0);
    const [totalTimeBooked, setTotalTimeBooked] = useState(0);
    const [topDeals, setTopDeals] = useState([]);
    const address = useAddress();
    const { contract } = useContract(CONTRACT_ADDRESS);

    useEffect(() => {
        async function loadNFTData() {
            setLoading(true);
            try {
                const nftIds = await contract.call('getNftsIdOfProvider', [], { from: address });
                const rentDetails = await Promise.all(nftIds.map(async (id) => {
                    const nftInfo = await contract.call('getNFTInfo', [id]);
                    return {
                        rentAmount: Number(parseBigNumber(nftInfo.rentAmount)),
                        renter: nftInfo.renter,
                        startTimestamp: nftInfo.startTimestamp,
                        endTimestamp: nftInfo.endTimestamp
                    };
                }));
                const total = rentDetails.reduce((acc, { rentAmount }) => acc + rentAmount, 0);
                const uniqueUsers = new Set(rentDetails.map(({ renter }) => renter));
                setTotalUsers(uniqueUsers.size);
                setTotalRent(total);
                setTotalContracts(nftIds.length);

                const totalTimeInMilliseconds = rentDetails.reduce((acc, { startTimestamp, endTimestamp }) => {
                    return acc + (parseBigNumber(endTimestamp) - parseBigNumber(startTimestamp));
                }, 0);
                const totalTimeInDays = Math.round(totalTimeInMilliseconds / 86400000); // Convert milliseconds to days
                setTotalTimeBooked(totalTimeInDays);

                // Sort and store top deals
                const sortedDeals = rentDetails.sort((a, b) => b.rentAmount - a.rentAmount).slice(0, 7);
                setTopDeals(sortedDeals);

            } catch (error) {
                console.error('Failed to load NFT data:', error);
            }
            setLoading(false);
        }

        if (contract && address) {
            loadNFTData();
        }
    }, [address, contract]);

    return { totalRent, isLoading, totalUsers, totalContracts, totalTimeBooked, topDeals };
}
