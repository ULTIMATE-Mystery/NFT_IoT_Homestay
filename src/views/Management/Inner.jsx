/*
- Contract address: Thay đổi address để xem NFT của homestay khác
- Number of room: Tổng phòng
- Rooms available for rent: ...
- Change room validity
- Chart thống kê doanh thu, số lượt thuê trong tháng
- Input show NFT info
- Card NFT info (Thêm Due Time)
*/
import { useState, memo, useEffect } from 'react';
import HomeLayout from 'layouts/Home';
import { CONTRACT_ADDRESS } from 'utils/constant';
import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react';
import OwnerDashboard from './components/OwnerDashboard';
import UserDashboard from './components/UserDashboard';
import Loading from 'components/Loading';
const Inner = memo(() => {
    const address = useAddress();
    const {contract} = useContract(CONTRACT_ADDRESS);
    const {data: owner, isLoading: isLoadingOwner } = useContractRead(contract,"owner");
    const [mode,setMode] = useState("owner")
    console.log(mode);
    useEffect(()=>{
        setMode(mode);
    },[mode])
    return (
        <HomeLayout title="Management">
            {address === undefined ? (
                <div className='justify-center flex'>
                    <div className="text-4xl mt-60 mx-20 bg-gradient-to-r from-blue-700 via-sky-400 to-purple-600 bg-clip-text text-transparent w-fit mx-auto">
                    You need to connect wallet first
                    </div>  
                </div>
                
            ):(
            <div className=''>
            {!isLoadingOwner && (
                // owner==address
                mode === "owner"
            ?(<div>
                {()=>setMode("owner")}
                <OwnerDashboard mode={mode} setMode={setMode}/>
            </div>)
            :(<div>
                {()=>setMode("user")}
                <UserDashboard mode={mode} setMode={setMode}/>
            </div>))}
            {isLoadingOwner&&(
            <div className='py-80 flex justify-center w-fit mx-auto'>
                <Loading/>
            </div>)}
            </div>
            )}

        </HomeLayout>
    );
});

Inner.displayName = 'Management Inner';

export default Inner;
