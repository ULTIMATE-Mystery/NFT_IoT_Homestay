import React from 'react';
import { useManagementData } from './ManagementData';
import SDPieChart from './SDPieChart';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF8043', '#FF8044', '#FF8045'];

const SourceDistributionCard = () => {
  const { renterDistribution, isLoading } = useManagementData();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex flex-col justify-between w-full h-full py-2'>
        <div className='text-xl md:text-2xl flex '>
            Top Renters by Time Rented
        </div>
        <div className='flex justify-center '>
            <SDPieChart data={renterDistribution} colors={COLORS} />
        </div>
        <div className='flex flex-row justify-between '>
          {renterDistribution.map((item, index) => (
            <div key={item.name} className='flex flex-row space-x-2'>
              <div style={{ color: COLORS[index % COLORS.length] }}>
                {'\u25CF'}
              </div>
              
              <div className='flex flex-col'>
                  <div className='flex'>
                      {item.name}
                  </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default SourceDistributionCard;
