import React from 'react';
import DealCard from './DealCard';

const TopDealCard = ({ topDeals }) => {
  return (
    <div className=''>
      <p className='text-2xl font-bold'>Top Deals</p>
      <div className='mt-4 flex flex-col space-y-[10px]'>
        {topDeals.length > 0 ? topDeals.map((deal, index) => (
          <DealCard key={index} renter={deal.renter} rentAmount={deal.rentAmount} />
        )) : (
          <div className='flex justify-center items-center h-full'>
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default TopDealCard;
