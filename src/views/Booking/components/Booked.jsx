import BookedCard from './BookedCard';
import SmallCard from './SmallCard';
import GetBookedContracts from '../GetBookedContracts';

const Booked = ({ isButtonClicked }) => {
    const { data, isLoading } = GetBookedContracts();
    return (
        <>
            <div className="flex mx-40 mr-40 rounded-xl text-base rounded-2xl mt-8 ">
                <div className="m-[2px] bg-white rounded-xl w-full grid min-[1580px]:grid-cols-5 min-[1400px]:grid-cols-4 lg:grid-cols-3 min-[780px]:grid-cols-2 grid-cols-1 justify-between justify-items-center gap-10">
                    {isLoading && <p>Loading data...</p>}
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
                    {!isLoading && !data && <div>Token Id does not exist!</div>}
                </div>
            </div>
        </>
    );
};

export default Booked;
