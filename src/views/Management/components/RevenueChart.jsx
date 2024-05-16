import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useManagementData } from './ManagementData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="intro">{`Revenue: $${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const RevenueChart = () => {
  const { rentData, isLoading } = useManagementData();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full h-full py-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={400}
          height={240}
          data={rentData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="monthYear" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="rentAmount" stackId="1" stroke="#77E2AB" fill="#77E2AB" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
