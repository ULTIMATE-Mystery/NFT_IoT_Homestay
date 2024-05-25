import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useManagementData } from './ManagementData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip p-2 bg-gray-800 text-white rounded">
        <p>{`Revenue: $${payload[0].value}`}</p>
        <p>{`Date: ${label}`}</p>
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

  if (!rentData || rentData.length === 0) {
    return <p>No data available</p>;
  }

  const isSingleMonth = rentData.length === 1;
  const singleMonthData = isSingleMonth ? rentData[0].dates : [];

  // Check for unique dates within the single month
  const uniqueDates = new Set(singleMonthData.map(date => date.date)).size;
  const isSingleDate = uniqueDates === 1;
  const isMultipleDates = uniqueDates > 1;

  return (
    <div className="w-full h-full py-8">
      <ResponsiveContainer width="100%" height="100%">
        {isSingleMonth && isSingleDate ? (
          <BarChart
            width={400}
            height={240}
            data={singleMonthData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="rentAmount" fill="#77E2AB" barSize={60} />
          </BarChart>
        ) : isSingleMonth && isMultipleDates ? (
          <AreaChart
            width={400}
            height={240}
            data={singleMonthData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="rentAmount" stackId="1" stroke="#77E2AB" fill="#77E2AB" />
          </AreaChart>
        ) : (
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
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
