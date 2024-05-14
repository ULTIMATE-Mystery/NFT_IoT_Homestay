import React, { useState, useEffect } from 'react';
import { useContract, useAddress } from '@thirdweb-dev/react';
import { parseBigNumber } from 'utils/function/parseBigNumber.js';
import { formatDate } from 'utils/function/formatDate.js';
import { CONTRACT_ADDRESS } from 'utils/constant.ts';
import moment from 'moment';

function shortenAddress(address) {
    return `${address.slice(0, 2)}${address.slice(2, 3)}...${address.slice(-2)}`;
}

function calculatePercentageChange(current, previous) {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
}

export function useManagementData() {
    const [totalRent, setTotalRent] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalContracts, setTotalContracts] = useState(0);
    const [totalTimeBooked, setTotalTimeBooked] = useState(0);
    const [topDeals, setTopDeals] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [percentageChanges, setPercentageChanges] = useState({
        users: 0,
        revenue: 0,
        contracts: 0,
        timeBooked: 0,
    });
    const [rentData, setRentData] = useState([]);
    const [renterDistribution, setRenterDistribution] = useState([]);
    const [renterRentAmount, setRenterRentAmount] = useState([]);
    const [roomRentals, setRoomRentals] = useState([]);

    const address = useAddress();
    const { contract } = useContract(CONTRACT_ADDRESS);

    useEffect(() => {
        let intervalId;

        async function loadNFTData() {
            setLoading(true);
            try {
                const nftIds = await contract.call('getNftsIdOfProvider', [], { from: address });
                const rentDetails = await Promise.all(nftIds.map(async (id) => {
                    const nftInfo = await contract.call('getNFTInfo', [id]);
                    return {
                        rentAmount: Number(parseBigNumber(nftInfo.rentAmount)),
                        renter: nftInfo.renter,
                        roomId: nftInfo.roomId,
                        createTimestamp: parseBigNumber(nftInfo.createTimestamp) * 1000,
                        startTimestamp: parseBigNumber(nftInfo.startTimestamp),
                        endTimestamp: parseBigNumber(nftInfo.endTimestamp)
                    };
                }));

                // Overall totals
                const totalRent = rentDetails.reduce((acc, { rentAmount }) => acc + rentAmount, 0);
                const totalUsers = new Set(rentDetails.map(({ renter }) => renter)).size;
                const totalContracts = nftIds.length;
                const totalTimeBookedMilliseconds = rentDetails.reduce((acc, { startTimestamp, endTimestamp }) => acc + (endTimestamp - startTimestamp), 0);
                const totalTimeBookedDays = Math.round(totalTimeBookedMilliseconds / 86400000);

                // Current month and previous month details
                const currentMonth = moment().startOf('month');
                const previousMonth = moment().subtract(1, 'months').startOf('month');
                
                const currentMonthRentDetails = rentDetails.filter(({ createTimestamp }) => moment(createTimestamp).isSame(currentMonth, 'month'));
                const previousMonthRentDetails = rentDetails.filter(({ createTimestamp }) => moment(createTimestamp).isSame(previousMonth, 'month'));

                const totalCurrentMonthRent = currentMonthRentDetails.reduce((acc, { rentAmount }) => acc + rentAmount, 0);
                const totalPreviousMonthRent = previousMonthRentDetails.reduce((acc, { rentAmount }) => acc + rentAmount, 0);
                
                const currentMonthUniqueUsers = new Set(currentMonthRentDetails.map(({ renter }) => renter));
                const previousMonthUniqueUsers = new Set(previousMonthRentDetails.map(({ renter }) => renter));

                const currentMonthContracts = currentMonthRentDetails.length;
                const previousMonthContracts = previousMonthRentDetails.length;

                const currentMonthTimeBooked = currentMonthRentDetails.reduce((acc, { startTimestamp, endTimestamp }) => acc + (endTimestamp - startTimestamp), 0);
                const previousMonthTimeBooked = previousMonthRentDetails.reduce((acc, { startTimestamp, endTimestamp }) => acc + (endTimestamp - startTimestamp), 0);

                const currentMonthTimeBookedDays = Math.round(currentMonthTimeBooked / 86400000);
                const previousMonthTimeBookedDays = Math.round(previousMonthTimeBooked / 86400000);

                setTotalRent(totalRent);
                setTotalUsers(totalUsers);
                setTotalContracts(totalContracts);
                setTotalTimeBooked(totalTimeBookedDays);

                setPercentageChanges({
                    users: calculatePercentageChange(currentMonthUniqueUsers.size, previousMonthUniqueUsers.size),
                    revenue: calculatePercentageChange(totalCurrentMonthRent, totalPreviousMonthRent),
                    contracts: calculatePercentageChange(currentMonthContracts, previousMonthContracts),
                    timeBooked: calculatePercentageChange(currentMonthTimeBookedDays, previousMonthTimeBookedDays),
                });

                const sortedDeals = rentDetails.sort((a, b) => b.rentAmount - a.rentAmount).slice(0, 7);
                setTopDeals(sortedDeals);

                const groupedData = rentDetails.reduce((acc, { rentAmount, createTimestamp }) => {
                    const monthYear = moment(createTimestamp).format('MMMM YYYY');
                    if (!acc[monthYear]) {
                        acc[monthYear] = { monthYear, rentAmount: 0 };
                    }
                    acc[monthYear].rentAmount += rentAmount;
                    return acc;
                }, {});

                const sortedGroupedData = Object.values(groupedData).sort((a, b) => moment(a.monthYear, 'MMMM YYYY').unix() - moment(b.monthYear, 'MMMM YYYY').unix());
                setRentData(sortedGroupedData);

                const renterDist = rentDetails.reduce((acc, { renter, startTimestamp, endTimestamp }) => {
                    const rentalTime = endTimestamp - startTimestamp;
                    if (!acc[renter]) {
                        acc[renter] = { name: shortenAddress(renter), value: 0 };
                    }
                    acc[renter].value += rentalTime;
                    return acc;
                }, {});

                const renterDistArray = Object.values(renterDist)
                    .sort((a, b) => b.value - a.value)
                    .slice(0, 3)
                    .map(item => ({ ...item, value: Math.round(item.value / 86400000) })); // Convert milliseconds to days

                setRenterDistribution(renterDistArray);

                const renterRent = rentDetails.reduce((acc, { renter, rentAmount }) => {
                    if (!acc[renter]) {
                        acc[renter] = { name: shortenAddress(renter), rentAmount: 0 };
                    }
                    acc[renter].rentAmount += rentAmount;
                    return acc;
                }, {});

                const renterRentArray = Object.values(renterRent)
                    .sort((a, b) => b.rentAmount - a.rentAmount)
                    .slice(0, 5); // Top 5 renters

                setRenterRentAmount(renterRentArray);

                const roomRentalsData = rentDetails.reduce((acc, { roomId }) => {
                    if (!acc[roomId]) {
                        acc[roomId] = { roomId, rentals: 0 };
                    }
                    acc[roomId].rentals += 1;
                    return acc;
                }, {});

                const roomRentalsArray = Object.values(roomRentalsData)
                    .sort((a, b) => b.rentals - a.rentals)
                    .slice(0, 5); // Top 5 rooms

                setRoomRentals(roomRentalsArray);

            } catch (error) {
                console.error('Failed to load NFT data:', error);
            }
            setLoading(false);
        }

        if (contract && address) {
            loadNFTData();
            intervalId = setInterval(loadNFTData, 60000); // Refresh data every 60 seconds
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [address, contract]);

    return { totalRent, isLoading, totalUsers, totalContracts, totalTimeBooked, topDeals, percentageChanges, rentData, renterDistribution, renterRentAmount, roomRentals };
}
