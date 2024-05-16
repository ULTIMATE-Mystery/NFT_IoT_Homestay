import React from 'react';
import { BarChart, Bar, Tooltip, ResponsiveContainer, Cell, XAxis } from 'recharts';
import { useManagementData } from './ManagementData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`Renter: ${payload[0].payload.name}`}</p>
        <p>{`Rent Amount: $${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const VisitChart = () => {
  const { renterRentAmount, isLoading } = useManagementData();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!renterRentAmount || renterRentAmount.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className='w-full h-[200px] py-4'>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={renterRentAmount}>
          <Tooltip content={<CustomTooltip />} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ display: 'none' }} />
          <Bar dataKey="rentAmount" fill="#8884d8">
            {renterRentAmount.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#8884d8" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VisitChart;
