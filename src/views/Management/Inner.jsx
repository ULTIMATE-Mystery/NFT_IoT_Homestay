/*
- Contract address: Thay đổi address để xem NFT của homestay khác
- Number of room: Tổng phòng
- Rooms available for rent: ...
- Change room validity
- Chart thống kê doanh thu, số lượt thuê trong tháng
- Input show NFT info
- Card NFT info (Thêm Due Time)
*/
import { useState, memo } from 'react';
import ContractInfo from './components/ContractInfo';
import HomeLayout from 'layouts/Home';
import Copy from 'icons/Copy';
import Message from 'components/Message';
import { Select, Tooltip } from 'antd';
import { shortenAddress } from 'utils/shortenAddress';
const Inner = memo(() => {
    const contractAddress = '0x7e15935f8ae6FCbBAc0211D2E15A2166143707B3';
    const [inputValue, setInputValue] = useState(0);
    const [isButtonClicked, setButtonClicked] = useState(false);

    return (
        <HomeLayout title="Management">
            <div className="w-11/12 min-h-[100px] mx-auto flex flex-col items-center gap-6 m-4">
                <div className="w-1/4 h-full min-h-[100px] border-[2px] rounded-md shadow-sm py-4 px-[1rem] flex flex-col justify-center gap-4">
                    <div className="flex flex-col justify-between gap-4">
                        <div>Select homestay</div>
                        <Select
                            defaultValue={'Alexander Homestay'}
                            options={[
                                {
                                    value: 'Alexander Homestay',
                                    label: 'Alexander Homestay',
                                },
                            ]}
                        />
                    </div>
                </div>

                <div className="text-2xl font-[700]">General information</div>
                <div className="w-full h-full min-h-[100px] flex flex-row gap-4">
                    <div className="w-1/3 border-[2px] rounded-md shadow-sm py-4 px-[1rem] flex flex-col gap-4">
                        <div className="flex flex-row justify-between items-center">
                            <div>Address</div>
                            <div>HCMC, Vietnam</div>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <div>Contract address</div>
                            <div className="flex flex-row items-center gap-2">
                                <span
                                    className="cursor-pointer"
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            contractAddress
                                        );
                                        Message.sendSuccess(
                                            'Copied to clipboard'
                                        );
                                    }}
                                >
                                    <Copy />
                                </span>
                                <Tooltip title={contractAddress}>
                                    <span className="font-[600]">
                                        {shortenAddress(contractAddress)}
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/6 h-full min-h-[100px] border-[2px] rounded-md shadow-sm flex flex-col justify-around px-[1rem] py-3">
                        <div className="opacity-60">Total rooms</div>
                        <div className="text-2xl font-[700]">10</div>
                    </div>
                    <div className="w-1/6 h-full min-h-[100px] border-[2px] rounded-md shadow-sm flex flex-col justify-around px-[1rem] py-3">
                        <div className="opacity-60">Rented rooms</div>
                        <div className="text-2xl font-[700]">4</div>
                    </div>
                    <div className="w-1/6 h-full min-h-[100px] border-[2px] rounded-md shadow-sm flex flex-col justify-around px-[1rem] py-3">
                        <div className="opacity-60">Total contracts</div>
                        <div className="text-2xl font-[700]">25</div>
                    </div>
                    <div className="w-1/6 h-full min-h-[100px] border-[2px] rounded-md shadow-sm flex flex-col justify-around px-[1rem] py-3">
                        <div className="opacity-60">Total return</div>
                        <div className="text-2xl font-[700]">$1500,00</div>
                    </div>
                </div>
                <div className="text-2xl font-[700]">Contract info</div>
                <div className="flex flex-row items-center gap-4">
                    <span>Token ID</span>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="Enter token ID"
                        className="border-[2px] rounded-md p-2"
                    />
                    <button
                        onClick={() => setButtonClicked(!isButtonClicked)}
                        className="border-[2px] bg-emerald-500 rounded-md text-white p-2"
                    >
                        Show info
                    </button>
                </div>
                <ContractInfo
                    tokenId={inputValue}
                    isButtonClicked={isButtonClicked}
                />
                {/* </div>
            </div> */}
            </div>
        </HomeLayout>
    );
});

Inner.displayName = 'Management Inner';

export default Inner;
