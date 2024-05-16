import SmallCard from './SmallCard';
import GetBookedContracts from '../GetBookedContracts';
import Loading from 'components/Loading';
import { useAddress } from '@thirdweb-dev/react';
import { useState } from 'react';

const Booked = ({ isButtonClicked,page,contractId,selectContract,setModalCheckoutOpened}) => {
    const address = useAddress();
    const { data, isLoading } = GetBookedContracts();
    const select = (id)=>{
        selectContract(id);
    }
    const [assetStatus, setAssetStatus] = useState("myasset");
    return (
        <>
            <div className="flex rounded-xl text-base mt-8 relative">
                <div className={`${page=="booking"?"min-[1580px]:grid-cols-5 min-[1400px]:grid-cols-4":""} m-[2px] rounded-xl w-full grid lg:grid-cols-3 min-[780px]:grid-cols-2 grid-cols-1 justify-between justify-items-center gap-10`}>
                    {isLoading && <div className='absolute py-40 flex justify-center'>
                                        <Loading/>
                                    </div>}
                    {isButtonClicked && data && !isLoading && (
                        <>
                            {data.map((data, index) => (
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
            {!address &&(
                <div className='justify-center flex w-full'>
                    <div className="text-4xl p-20 bg-gradient-to-r from-blue-700 via-sky-400 to-purple-600 bg-clip-text text-transparent w-fit mx-auto">
                        You need to connect wallet first.
                    </div>  
                </div>)
            }
        </>
    );
};

export default Booked;
