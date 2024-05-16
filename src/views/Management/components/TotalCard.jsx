import { LineChart, Line, ResponsiveContainer } from 'recharts';

const TotalCard = ({ data }) => {
  const isLoading = data[1] === 'Loading...';

  return (
    <div className='w-full h-full p-4 border border-slate-600 rounded-md flex flex-row justify-between'>
      <div className={`flex-col flex space-y-4 justify-between ${isLoading ? 'items-center justify-center' : ''}`}>
        <div className='text-2xl'>{data[0]}</div>
        <div className={`text-3xl font-bold ${isLoading ? 'flex justify-center items-center h-full' : ''}`}>
          {data[1]}
        </div>
        {!isLoading && <button className='text-left text-blue-600'>View all</button>}
      </div>
      {!isLoading && (
        <div className="flex-col flex justify-between">
          <div className='flex my-auto w-full'>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={30} height={10} data={data}>
                <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className='text-right justify-right flex flex-col'>
            <div className={`font-bold text-xl ${data[2] > 0 ? "text-green-600" : "text-red-600"}`}>{data[2]}%</div>
            <div>this month</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalCard;
