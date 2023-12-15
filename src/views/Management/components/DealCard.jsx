import React from 'react';
import christmastree from 'assets/image/avatar/christmasTree.jpg';
import christmastree2 from 'assets/image/avatar/christmasTree2.png';

const DealCard = () => {
  return (
    <div className='flex flex-row border border-slate-800 bg-slate-900
    p-2 w-full rounded-md space-x-2'>
      <svg width="80" height="80" viewBox="0 0 100 100">
        <defs>
          <pattern
            id="image"
            patternUnits="userSpaceOnUse"
            width="160"
            height="160"
          >
            <image
              xlinkHref={christmastree2}
              x="-30"
              y="-30"
              width="160"
              height="160"
            />
          </pattern>
        </defs>
        <polygon
          points="50 1 95 25 95 75 50 99 5 75 5 25"
          fill="url(#image)"
        />
      </svg>
      <div className='flex flex-col my-auto'>
        <div className='text-lg'>Address</div>
        <div>0x53...22fF</div>
      </div>
      <div className='pl-2 text-xl my-auto text-lime-700 font-bold'>
        $1000
      </div>
    </div>
  );
};

export default DealCard;
