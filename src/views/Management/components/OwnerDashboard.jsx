import React from "react";
import TotalCard from './TotalCard';
import SelHSCard from './SelHSCard';
import TopDealCard from './TopDealCard';
import SourceDistributionCard from './SourceDistributionCard';
import ProfitChart from './ProfitChart';
import VisitChart from './VisitChart';
import RevenueChart from './RevenueChart';
import { useManagementData } from './ManagementData'; 

const OwnerDashboard = ({ mode, setMode }) => {
  const { totalRent, isLoading, totalUsers, totalContracts, totalTimeBooked, topDeals } = useManagementData();
    const dataTotalCard = [
      ["Total Users", isLoading ? 'Loading...' : totalUsers, -30],
      ["Total Revenue", isLoading ? 'Loading...' : `${totalRent} VNĐ`, 17],
      ["Total Contracts", isLoading ? 'Loading...' : totalContracts, -21],
      ["Total Time Booked", isLoading ? 'Loading...' : `${totalTimeBooked} days`, 23],
    ];
  return (
    <>
      <div className='mt-4 mx-20 flex flex-col md:flex-row md:space-x-4 justify-center'>
        <div className="md:basis-1/4 mb-4 flex flex-col space-y-4">
          <div className="basis-3/4 w-full border border-slate-600 rounded-md p-4">
          <TopDealCard topDeals={topDeals} />
          </div>
          <div className="basis-1/4 max-h-[200px] border border-slate-600 rounded-md p-4">
            <p>Total Visit</p>
            <VisitChart />
          </div>
        </div>
        <div className="md:basis-1/2 mb-4 flex flex-col space-y-4">
          <div className="basis-1/2 border border-slate-600 rounded-md p-4 space-y-4 flex flex-col justify-between space-y-2 h-full">
            <div className='flex flex-row justify-between space-x-2 h-full'>
              <TotalCard data={dataTotalCard[0]} />
              <TotalCard data={dataTotalCard[1]} />
            </div>
            <div className='flex flex-row justify-between space-x-2 h-full'>
              <TotalCard data={dataTotalCard[2]} />
              <TotalCard data={dataTotalCard[3]} />
            </div>
          </div>
          <div className="basis-1/2 2xl:max-h-[700px] lg:max-h-[600px] md:max-h-[450px] max-h-[300px] border border-slate-600 rounded-md p-4">
            <p className='text-2xl md:text-xl'>
              Revenue Analytics
            </p>
            <RevenueChart />
          </div>
        </div>
        <div className="md:basis-1/4 mb-4 flex flex-col space-y-4">
          <div className="basis-1/4 border border-slate-600 rounded-md p-4 flex w-full">
            <SelHSCard mode={mode} setMode={setMode} />
          </div>
          <div className="basis-2/4 border border-slate-600 rounded-md p-4">
            <SourceDistributionCard />
          </div>
          <div className="basis-1/4 max-h-[200px] border border-slate-600 rounded-md p-4">
            <p>Profit Earned</p>
            <ProfitChart />
          </div>
        </div>
      </div>
    </>
  )
}

export default OwnerDashboard;
