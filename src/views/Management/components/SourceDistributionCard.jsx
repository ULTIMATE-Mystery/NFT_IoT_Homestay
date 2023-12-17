import SDPieChart from './SDPieChart';
const data = [
  { name: 'Mobile', value: 400, color: '#0088FE' },
  { name: 'Desktop', value: 300, color: '#00C49F' },
  { name: 'Laptop', value: 300, color: '#FFBB28' },
  { name: 'Tablet', value: 200, color: '#FF8042' },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SourceDistributionCard = () => {
  return (
    <div className='flex flex-col justify-between w-full h-full py-2'>
        <div className='text-xl md:text-2xl flex '>
            Leads By Source
        </div>
        <div className='flex justify-center '>
            <SDPieChart/>
        </div>
        <div className='flex flex-row justify-between '>
          {data.map((item,index)=>(
            <div className='flex flex-row space-x-2'>
              <div style={{color: COLORS[index]}}>
                {'\u25CF'}
              </div>
              
              <div className='flex flex-col'>
                  <div className='flex'>
                      {item.name}
                  </div>
                  <div className='flex'>
                      {item.value}
                  </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default SourceDistributionCard