import ContractData from './ContractData';

const TestData = () => {
    const { data, isLoading } = ContractData();
    console.log(data[0]);
    return (
        <div> 
        {data&&!isLoading&&(
            
            <button class="bg-indigo-500 shadow-lg shadow-indigo-500/50 ...">{data[0]}</button>
        )}
        {!isLoading && !data && <div>Token Id does not exist!</div>}
        </div>
    );
};

export default TestData;