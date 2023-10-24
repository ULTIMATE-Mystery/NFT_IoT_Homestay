import { useState } from 'react';
import { useAddress, useContract } from '@thirdweb-dev/react';
import Message from 'components/Message';

const BookingCard = () => {
    const address = useAddress();
    const { contract } = useContract(
        '0xC8339AEeCa4a529a7a0571b9654024600f5FC137'
    );

    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [roomId, setRoomId] = useState('');

    const handleStartDateChange = e => {
        setStartDate(e.target.value);
    };

    const handleStartTimeChange = e => {
        setStartTime(e.target.value);
    };

    const handleEndDateChange = e => {
        setEndDate(e.target.value);
    };

    const handleEndTimeChange = e => {
        setEndTime(e.target.value);
    };

    const handleRoomIdChange = e => {
        setRoomId(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        // Validate input here (you can use a library like moment.js for more advanced date-time handling)
        const nowDateTime = new Date(); // Current date and time
        const nowTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds

        // Combine start date and time
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const startTimestamp = Math.floor(startDateTime.getTime() / 1000); // Convert to seconds

        // Combine end date and time
        const endDateTime = new Date(`${endDate}T${endTime}`);
        const endTimestamp = Math.floor(endDateTime.getTime() / 1000); // Convert to seconds
        // Handle the captured date, time, and duration values as needed
        console.log('Current Date and Time:', nowDateTime);
        console.log('Current Timestamp:', nowTimestamp);
        console.log('Start Date:', startDateTime);
        console.log('Start Date Timestamp:', startTimestamp);
        console.log('End Date:', endDateTime);
        console.log('End Date Timestamp:', endTimestamp);
        console.log('Room ID:', roomId);

        // Call the safeMint function with your contract
        if (contract) {
            try {
                // Call the safeMint function
                // const data = await contract.call('safeMint', [
                //     roomId,
                //     1000,
                //     startTimestamp,
                //     endTimestamp,
                // ]);

                // Handle the response from the contract here
                Message.sendSuccess('Successfully booked!');
            } catch (error) {
                console.error('Error calling safeMint:', error);
                Message.sendError('Error booking homestay');
            }
        } else {
            console.error('Contract not loaded or not connected to Web3');
            Message.sendError('Contract not loaded or not connected to Web3');
        }
    };

    return (
        <>
            {address && (
                <div
                    className="flex p-25 mx-40 mr-40 rounded-xl bg-gradient-to-r from-teal-200 via-cyan-300 
      via-purple-400 to-pink-400 text-base rounded-2xl mt-8"
                >
                    <div className="m-[2px] bg-white rounded-xl w-full flex">
                        <div
                            to="/home"
                            className="p-20 mr-0 w-full flex flex-col"
                        >
                            <div className="w-full flex justify-end">
                                <button
                                    className="rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-500 
            hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 
            dark:focus:ring-cyan-800 font-medium rounded-lg 
            text-sm px-5 py-2.5 text-center flex w-fit"
                                >
                                    <p className="">Change homestay contract</p>
                                </button>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col "
                            >
                                <label>Homestay Name</label>
                                <input
                                    className="border-gray-300 border-2 rounded-xl py-1.5 px-4 pr-80
                 text-sky-500 disabled:border-slate-300 mt-4 w-fit"
                                    style={{ color: '#3B82F6' }}
                                    placeholder="Alexander Homestay"
                                    disabled
                                />
                                <div className="flex flex-col mt-6">
                                    <div className="flex">
                                        <label className="mt-6 mr-4">
                                            Room ID
                                        </label>
                                        <input
                                            className="mt-4 border-2 py-1.5 px-4 rounded-xl 
                  focus:border-sky-500 focus:border-2 focus:outline-none 
                  w-fit"
                                            placeholder="Room No"
                                            type="number"
                                            onChange={handleRoomIdChange}
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-row">
                                    <label className="mt-4 mr-8">
                                        Start Date
                                    </label>
                                    <input
                                        type="time"
                                        className="mt-2 mr-4 border-2 py-1.5 px-4 rounded-xl focus:border-sky-500 focus:border-2 focus:outline-none "
                                        placeholder="Select time start"
                                        value={startTime}
                                        onChange={handleStartTimeChange}
                                    />
                                    <input
                                        type="date"
                                        className="mt-2 border-2 py-1.5 px-4 rounded-xl focus:border-sky-500 focus:border-2 focus:outline-none "
                                        placeholder="Select date start"
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                    />
                                </div>
                                <div className="mt-6 flex flex-row">
                                    <label className="mt-4 mr-10">
                                        End Date
                                    </label>
                                    <input
                                        type="time"
                                        className="mt-2 mr-4 border-2 py-1.5 px-4  rounded-xl focus:border-sky-500 focus:border-2 focus:outline-none "
                                        placeholder="Select time end"
                                        value={endTime}
                                        onChange={handleEndTimeChange}
                                    />
                                    <input
                                        type="date"
                                        className="mt-2 border-2 py-1.5 px-4  rounded-xl focus:border-sky-500 focus:border-2 focus:outline-none "
                                        placeholder="Select date end"
                                        value={endDate}
                                        onChange={handleEndDateChange}
                                    />
                                </div>
                                <div className="w-full flex justify-center mt-10">
                                    <button
                                        type="submit"
                                        className="rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-500 
                  hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 
                  dark:focus:ring-cyan-800 font-medium rounded-lg 
                  text-sm py-4 px-16 text-center flex w-fit "
                                    >
                                        <p className="text-xl">
                                            {' '}
                                            Book with 1000${' '}
                                        </p>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {!address && (
                <div className="text-center">
                    You need to collect wallet first.
                </div>
            )}
        </>
    );
};

export default BookingCard;
