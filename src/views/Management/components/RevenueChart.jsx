import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'January',
    directbooking: 4000,
    onlinebooking: 2400,
    thirdpartybooking: 2400,
  },
  {
    name: 'February',
    directbooking: 3000,
    onlinebooking: 1398,
    thirdpartybooking: 2210,
  },
  {
    name: 'March',
    directbooking: 2000,
    onlinebooking: 9800,
    thirdpartybooking: 2290,
  },
  {
    name: 'April',
    directbooking: 2780,
    onlinebooking: 3908,
    thirdpartybooking: 2000,
  },
  {
    name: 'May',
    directbooking: 1890,
    onlinebooking: 4800,
    thirdpartybooking: 2181,
  },
  {
    name: 'June',
    directbooking: 2390,
    onlinebooking: 3800,
    thirdpartybooking: 2500,
  },
  {
    name: 'July',
    directbooking: 3490,
    onlinebooking: 4300,
    thirdpartybooking: 2100,
  },
];

class RevenueChart extends PureComponent {
  render() {
    return (
      <div className="w-full h-full py-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={400}
            height={240}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="directbooking" stackId="1" stroke="#77E2AB" fill="#77E2AB" />
            <Area type="monotone" dataKey="onlinebooking" stackId="1" stroke="#0C84D6" fill="#0C84D6" />
            <Area type="monotone" dataKey="thirdpartybooking" stackId="1" stroke="#E6A1DA" fill="#E6A1DA" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default RevenueChart;
