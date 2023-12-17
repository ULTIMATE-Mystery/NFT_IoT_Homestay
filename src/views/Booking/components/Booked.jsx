import BookedCard from './BookedCard';
import SmallCard from './SmallCard';
import GetBookedContracts from '../GetBookedContracts';
import Loading from 'components/Loading';

const Booked = ({ isButtonClicked }) => {
    const { data, isLoading } = GetBookedContracts();
    return (
        <>
            <div className="flex mx-40 mr-40 mb-40 rounded-xl text-base rounded-2xl mt-8 relative">
                <div className="m-[2px] rounded-xl w-full grid min-[1580px]:grid-cols-5 min-[1400px]:grid-cols-4 lg:grid-cols-3 min-[780px]:grid-cols-2 grid-cols-1 justify-between justify-items-center gap-10">
                    {isLoading && <div className='absolute w-full h-full flex mx-auto px-auto align-center justify-center py-40'>
                                        <Loading/>
                                    </div>}
                    {isButtonClicked && data && !isLoading && (
                        <>
                            {data.map((data, index) => (
                                <SmallCard
                                    key={index}
                                    tokenId={data}
                                ></SmallCard>
                            ))}
                        </>
                    )}
                </div>
            </div>
            {!isLoading && data.length==0 && 
                    <div className='justify-center flex w-full'>
                        <div className="text-4xl p-20 bg-gradient-to-r from-blue-700 via-sky-400 to-purple-600 bg-clip-text text-transparent w-fit mx-auto">
                            No contracts were created.
                        </div>  
                    </div>}
        </>
    );
};

export default Booked;
