import React from 'react';
import { BarChart, Bar, Tooltip, ResponsiveContainer, Cell, XAxis } from 'recharts';
import { useManagementData } from './ManagementData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`Room ID: ${payload[0].payload.roomId}`}</p>
        <p>{`Rentals: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const ProfitChart = () => {
  const { roomRentals, isLoading } = useManagementData();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!roomRentals || roomRentals.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className='w-full h-[206px] py-4'>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={roomRentals}>
          <Tooltip content={<CustomTooltip />} />
          <XAxis dataKey="roomId" axisLine={false} tickLine={false} tick={{ display: 'none' }} />
          <Bar dataKey="rentals" fill="#8884d8">
            {roomRentals.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#8884d8" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProfitChart;
