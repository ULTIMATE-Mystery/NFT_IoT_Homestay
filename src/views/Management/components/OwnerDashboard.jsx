import React from 'react'
import TotalCard from './TotalCard'
import SelHSCard from './SelHSCard'
import TopDealCard from './TopDealCard'
import SourceDistributionCard from './SourceDistributionCard'
import ProfitChart from './ProfitChart'
import VisitChart from './VisitChart'
import RevenueChart from './RevenueChart'

const OwnerDashboard = () => {
  return (
    <div className='mt-4 mx-20 flex flex-col md:flex-row md:space-x-4 justify-center'>
        <div className="md:basis-1/4 mb-4 flex flex-col space-y-4">
            <div className="basis-3/4 w-full border border-slate-600 rounded-md p-4">
                <TopDealCard/>
            </div>
            <div className="basis-1/4 max-h-[200px] border border-slate-600 rounded-md p-4">
                <p> Total Visit</p>
                <VisitChart></VisitChart>
            </div>
        </div>
        <div className="md:basis-1/2 mb-4 flex flex-col space-y-4">
            <div className="basis-1/2 border border-slate-600 rounded-md p-4 space-y-4 flex flex-col justify-between space-y-2 h-full">
                <div className='flex flex-row justify-between space-x-2 h-full'>
                    <TotalCard></TotalCard>
                    <TotalCard></TotalCard>
                </div>
                <div className='flex flex-row justify-between space-x-2 h-full'>
                    <TotalCard></TotalCard>
                    <TotalCard></TotalCard>
                </div>
                
            </div>
            <div className="basis-1/2 2xl:max-h-[700px] lg:max-h-[600px] md:max-h-[450px] max-h-[300px] border border-slate-600 rounded-md p-4">
                <p className='text-2xl md:text-xl'>
            Revenue Analytics
                </p>
                <RevenueChart/>
            </div>
        </div>
        <div className="md:basis-1/4 mb-4 flex flex-col space-y-4">
            <div className="basis-1/4 border border-slate-600 rounded-md p-4 flex w-full">
                <SelHSCard/>
            </div>
            <div className="basis-2/4 border border-slate-600 rounded-md p-4">
                <SourceDistributionCard/>
            </div>
            <div className="basis-1/4  max-h-[200px] border border-slate-600 rounded-md p-4">
                <p>Profit Earned</p>
                <ProfitChart/>
            </div>
        </div>
    </div>
  )
}

export default OwnerDashboard