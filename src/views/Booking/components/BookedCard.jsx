import { useContract, useContractRead } from '@thirdweb-dev/react';
import { shortenAddress } from 'utils/shortenAddress';
import Money from 'icons/Money';
import Clock from 'icons/Clock';
import Calendar from 'icons/Calendar';
import Checkbox from 'icons/Checkbox';
import Home from 'icons/Home';
import Copy from 'icons/Copy';
import { Tooltip } from 'antd';
import Message from 'components/Message';
import UserIcon from 'icons/UserIcon';

const BookedCard = ({ tokenId }) => {
    const contractAddress = '0xC8339AEeCa4a529a7a0571b9654024600f5FC137';
    const { contract } = useContract(contractAddress);
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
        <>
            {!isLoading && data && (
                <div className="border-2 p-4 rounded-lg flex flex-col justify-between gap-4 max-w-1/3">
                    <div className="w-full flex justify-between">
                        <div className="flex gap-2">
                            <UserIcon />
                            <p className="flex my-auto justify-center">
                                Renter
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <span
                                className="cursor-pointer"
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        contractAddress
                                    );
                                    Message.sendSuccess('Copied to clipboard');
                                }}
                            >
                                <Copy />
                            </span>
                            <Tooltip title={data[0]}>
                                <span className="font-[700]">
                                    {shortenAddress(data[0])}
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="flex gap-2">
                            <UserIcon />
                            <p className="flex my-auto justify-center">
                                Provider
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <span
                                className="cursor-pointer"
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        contractAddress
                                    );
                                    Message.sendSuccess('Copied to clipboard');
                                }}
                            >
                                <Copy />
                            </span>
                            <Tooltip title={data[1]}>
                                <span className="font-[700]">
                                    {shortenAddress(data[1])}
                                </span>
                            </Tooltip>
                        </div>
                    </div>

                    <div className="w-full flex justify-between">
                        <div className="flex gap-2">
                            <Home />
                            <p className="flex my-auto justify-center">
                                Room ID
                            </p>
                        </div>
                        <p className="flex justify-center font-[700]">
                            {parseBigNumber(data[2])}
                        </p>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="flex gap-2">
                            <Money />
                            <p className="flex my-auto justify-center">Price</p>
                        </div>
                        <p className="flex justify-center font-[700]">
                            ${parseBigNumber(data[3])}
                        </p>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="flex gap-2">
                            <Clock />
                            <p className="flex my-auto justify-center">
                                Duration
                            </p>
                        </div>
                        <p className="flex justify-center font-[700]">
                            {new Date(parseBigNumber(data[6]) * 1000)
                                .toISOString()
                                .slice(11, 19)}
                        </p>
                    </div>
                    <div className="w-full flex justify-between gap-[2rem]">
                        <div className="flex gap-2">
                            <Calendar />
                            <p className="flex my-auto justify-center">
                                Create time
                            </p>
                        </div>
                        <p className="flex justify-center font-[700]">
                            {formatDate(parseBigNumber(data[4]))}
                        </p>
                    </div>
                    <div className="w-full flex justify-between gap-4">
                        <div className="flex gap-2">
                            <Checkbox />
                            <p className="flex my-auto justify-center">
                                Available Time
                            </p>
                        </div>
                        <p className="flex justify-center font-[700]">
                            {formatDate(
                                parseInt(parseBigNumber(data[4])) +
                                    parseInt(parseBigNumber(data[5]))
                            )}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookedCard;
