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
  const { totalRent, isLoading, totalUsers, totalContracts, totalTimeBooked, topDeals, percentageChanges } = useManagementData();
  const dataTotalCard = [
    ["Total Users", isLoading ? 'Loading...' : totalUsers, percentageChanges.users],
    ["Total Revenue", isLoading ? 'Loading...' : `$${totalRent}`, percentageChanges.revenue],
    ["Total Contracts", isLoading ? 'Loading...' : totalContracts, percentageChanges.contracts],
    ["Total Time Booked", isLoading ? 'Loading...' : `${totalTimeBooked} days`, percentageChanges.timeBooked],
  ];

  return (
    <>
      <div className='mt-4 mx-4 md:mx-20 flex flex-col md:flex-row md:space-x-4 justify-center'>
        <div className="order-2 md:order-1 md:basis-1/4 mb-4 flex flex-col space-y-4">
          <div className="basis-3/4 w-full border border-slate-600 rounded-md p-4">
            <TopDealCard topDeals={topDeals} />
          </div>
          <div className="basis-1/4 max-h-[200px] border border-slate-600 rounded-md p-4">
            <p>Top Renters by Rent Amount</p>
            <VisitChart />
          </div>
        </div>
        <div className="order-3 md:order-2 basis-1/2 mb-4 flex flex-col space-y-4">
          <div className="md:flex md:flex-col md:space-y-4 border border-slate-600 rounded-md p-4 space-y-4 h-fit">
            <div className='flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-2 h-fit xl:h-[221px]'>
              <TotalCard data={dataTotalCard[0]} />
              <TotalCard data={dataTotalCard[1]} />
            </div>
            <div className='flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-2 h-fit xl:h-[221px]'>
              <TotalCard data={dataTotalCard[2]} />
              <TotalCard data={dataTotalCard[3]} />
            </div>
          </div>
          <div className="basis-1/2 2xl:max-h-[1200px] lg:max-h-[1000px] md:max-h-[800px] max-h-[300px] border border-slate-600 rounded-md p-4 overflow-hidden">
            <p className='text-2xl md:text-xl'>
              Revenue Analytics
            </p>
            <div className="h-[300px] w-full md:h-full overflow-auto pb-6 md:pb-0">
              <RevenueChart />
            </div>
          </div>
        </div>
        <div className="order-1 md:order-3 md:basis-1/4 mb-4 flex flex-col space-y-4">
          <div className="basis-1/4 border border-slate-600 rounded-md p-4 flex w-full">
            <SelHSCard mode={mode} setMode={setMode} />
          </div>
          <div className="basis-2/4 border border-slate-600 rounded-md p-4">
            <SourceDistributionCard />
          </div>
          <div className="basis-1/4 max-h-[206px] border border-slate-600 rounded-md p-4">
            <p>Top Rentals per Room</p>
            <ProfitChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerDashboard;
