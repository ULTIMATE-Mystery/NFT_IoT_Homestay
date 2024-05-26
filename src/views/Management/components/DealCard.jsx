import React from 'react';
import christmastree2 from 'assets/image/avatar/christmasTree2.png';  // Ensure this path is correct

const DealCard = ({ renter, rentAmount }) => {
  const formattedAddress = renter ? `${renter.substring(0, 5)}...${renter.substring(renter.length - 4)}` : 'Loading...';
  const displayAmount = rentAmount ? `$${rentAmount}` : '$0';
  const isLoading = formattedAddress === 'Loading...' || displayAmount === 'Loading...';

  return (
    <div className={`flex flex-row border border-slate-800 bg-slate-900 p-2 w-full rounded-md space-x-2 shadow-lg ${isLoading ? 'justify-center items-center' : 'hover:scale-110 duration-200 hover:drop-shadow-lg hover:shadow-[#7dd3fc] hover:cursor-pointer'}`}>
      {!isLoading && (
        <>
          <svg width="80" height="80" viewBox="0 0 100 100">
            <defs>
              <pattern id="image" patternUnits="userSpaceOnUse" width="160" height="160">
                <image xlinkHref={christmastree2} x="-30" y="-30" width="160" height="160" />
              </pattern>
            </defs>
            <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="url(#image)" />
          </svg>
          <div className='flex flex-col my-auto'>
            <div className='text-lg'>Address</div>
            <div>{formattedAddress}</div>
          </div>
          <div className='flex-grow text-xl my-auto text-lime-700 font-bold text-right'>
            {displayAmount}
          </div>
        </>
      )}
      {isLoading && 'Loading...'}
    </div>
  );
};

export default DealCard;
