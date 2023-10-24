import BookedCard from './BookedCard';
import GetBookedContracts from '../GetBookedContracts';

const Booked = ({ isButtonClicked }) => {
    // const { contract } = useContract("0xC8339AEeCa4a529a7a0571b9654024600f5FC137");
    // const { data, isLoading } = useContractRead(contract, "getNftsIdOfRenter", [[]])

    const { data, isLoading } = GetBookedContracts();
    // Handle the data when it's available
    // useEffect(() => {
    //   if (!isLoading && data && data.length > 0) {
    //     // Process the data here
    //     console.log(data);
    //   }
    // }, [isLoading, data]);

    return (
        <>
            <div className="mt-10 ml-40 bg-white rounded-xl w-full flex flex-wrap justify-start gap-8">
                {isLoading && <p>Loading data...</p>}
                {isButtonClicked && data && !isLoading && (
                    <>
                        {data.map((data, index) => (
                            <BookedCard key={index} tokenId={data}></BookedCard>
                        ))}
                    </>
                )}
                {!isLoading && !data && <div>Token Id does not exist!</div>}
            </div>
        </>
    );
};

export default Booked;
