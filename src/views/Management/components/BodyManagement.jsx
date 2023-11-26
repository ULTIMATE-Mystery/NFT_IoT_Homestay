import { useContract, useContractRead } from '@thirdweb-dev/react';
import { shortenAddress } from 'utils/shortenAddress';
import UserIcon from 'icons/UserIcon';
import Droplet from 'icons/Droplet';
import Money from 'icons/Money';
import Clock from 'icons/Clock';
import Calendar from 'icons/Calendar';
import Calendar2 from 'icons/Calendar2';
import { CONTRACT_ADDRESS } from 'utils/constant';

const BodyManagement = ({ tokenId, isButtonClicked }) => {
    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(contract, 'getNFTInfo', [
        tokenId,
    ]);
    console.log(data);
    const formatDate = timestamp => {
        const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false, // Use 24-hour format
            timeZoneName: 'short',
        };
        return date.toLocaleString('en-US', options);
    };

    const parseBigNumber = value => {
        return value ? value.toString() : '';
    };
    return (
        <div>
            {/* Conditionally render NFT info based on the buttonClicked state */}
            {isLoading && <p>Loading data...</p>}
            {isButtonClicked && data && !isLoading && (
                <div className="border-2 p-16 space-y-20 border-cyan-500 rounded-xl">
                    <div className="flex flex-row justify-between gap-8">
                        <div className="w-full">
                            <div className="flex justify-center">
                                <UserIcon className="mb-6" />
                                <p className="flex my-auto justify-center text-3xl font-extrabold text-sky-600">
                                    Provider
                                </p>
                            </div>
                            <p
                                className="flex justify-center 
              font-[1000] text-4xl bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
              bg-clip-text "
                            >
                                {shortenAddress(data[0])}
                            </p>
                        </div>
                        <div className="w-full">
                            <div className="flex justify-center">
                                <UserIcon className="mb-6" />
                                <p className="flex my-auto justify-center text-3xl font-extrabold text-sky-600">
                                    Renter
                                </p>
                            </div>
                            <p
                                className="flex justify-center 
              font-[1000] text-4xl bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
              bg-clip-text "
                            >
                                {shortenAddress(data[1])}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between gap-4">
                        <div className="w-full">
                            <div className="flex justify-center">
                                <Droplet className="mb-6 w-16" />
                                <p className="flex my-auto justify-center text-3xl font-extrabold text-sky-600">
                                    Room ID
                                </p>
                            </div>
                            <p
                                className="flex justify-center 
              font-[1000] text-4xl bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
              bg-clip-text "
                            >
                                {parseBigNumber(data[2])}
                            </p>
                        </div>
                        <div className="w-full">
                            <div className="flex justify-center">
                                <Money className="mb-6 w-20" />
                                <p className="flex my-auto justify-center text-3xl font-extrabold text-sky-600">
                                    Rent Amount
                                </p>
                            </div>
                            <p
                                className="flex justify-center
              font-[1000] text-4xl bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
              bg-clip-text"
                            >
                                {parseBigNumber(data[3])} $
                            </p>
                        </div>
                    </div>
                    <div className="justify-center">
                        <div className="flex justify-center">
                            <Clock className="mb-6 w-12 mr-2" />
                            <p className="flex my-auto justify-center text-3xl font-extrabold text-sky-600">
                                Duration
                            </p>
                        </div>
                        <p
                            className="flex w-full justify-center
            font-[1000] text-4xl bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
            bg-clip-text"
                        >
                            {parseBigNumber(data[5]) - parseBigNumber(data[4])}{' '}
                            seconds
                        </p>
                    </div>
                    <div className="justify-center">
                        <div className="flex justify-center">
                            <Calendar className="mb-6 w-16 mr-2" />
                            <p className="flex my-auto justify-center text-3xl font-extrabold text-sky-600">
                                Contract Creation Time
                            </p>
                        </div>
                        <p
                            className="flex w-full justify-center
            font-[1000] text-4xl bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
            bg-clip-text"
                        >
                            {formatDate(parseBigNumber(data[6]))}
                        </p>
                    </div>
                    <div className="justify-center">
                        <div className="flex justify-center">
                            <Calendar2 className="mb-6 w-16 mr-2" />
                            <p className="flex my-auto justify-center text-3xl font-extrabold text-sky-600">
                                Available Time
                            </p>
                        </div>
                        <p className="flex w-full justify-center font-[1000] text-4xl bg-gradient-to-r from-sky-500 to-purple-500 text-transparent bg-clip-text">
                            {formatDate(parseBigNumber(data[4]))}
                        </p>
                    </div>
                    <div className="justify-center">
                        <div className="flex justify-center">
                            <Calendar2 className="mb-6 w-16 mr-2" />
                            <p className="flex my-auto justify-center text-3xl font-extrabold text-sky-600">
                                Due Time
                            </p>
                        </div>
                        <p className="flex w-full justify-center font-[1000] text-4xl bg-gradient-to-r from-sky-500 to-purple-500 text-transparent bg-clip-text">
                            {formatDate(parseBigNumber(data[5]))}
                        </p>
                    </div>
                </div>
            )}
            {!isLoading && !data && <div>Token Id does not exist!</div>}
        </div>
    );
};

export default BodyManagement;
