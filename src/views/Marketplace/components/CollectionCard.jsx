import React from 'react';
import homestay from 'assets/image/homestay/homestay6.jpg';


const CollectionCard = ({setNoCollection,index}) => {
  return (
    <div className="flex flex-col flex-basis justify-between space-y-4 rounded-md">
      <div
        className="relative"
        style={{
          paddingTop: '75%',
          backgroundImage: "url('https://airnfts.s3.amazonaws.com/nft-images/20210522/SUMMER_HOUSE_ILUSTRATIONS_1621648119342.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '8px',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(0,0,0,0.5))',
          }}
        ></div>
        <div className='absolute bottom-0 left-4 flex flex-row space-x-4'>
            <div className="w-16 h-16 bg-white rounded-md"
                    style={{
                        backgroundImage: `url(${homestay})`,
                        backgroundSize: `100% 100%`,

                    }}>
            </div>
            <div className='flex flex-col justify-between space-y-4'>
                <div className='flex font-bold min-[1200px]:text-lg min-[800px]:text-base min-[600px]:text-base min-[400px]:text-sm text-sm'>
                    Alexander Homestay
                </div>
                <div className='flex flex-row min-[1200px]:text-base min-[600px]:text-sm text-xs'>
                    <div className='flex my-auto text-slate-400'>
                        by &nbsp;
                    </div>
                    <div className='bg-slate-950 hover:bg-slate-800 cursor-pointer py-1 px-2 rounded-xl align-center flex'>
                        <img src='' alt='' className='avatar'/>
                        <div className='flex align-center font-[700]'>Alexander</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className="p-4 text-slate-400 min-[1200px]:text-base min-[600px]:text-sm text-xs">
        First NFT collection by Alexander Homestay. 1000 NFT homestays that open up over time and reveal the hidden vouchers.
      </div>
      <div className="flex justify-between p-4 space-x-4 min-[1200px]:text-base min-[600px]:text-sm text-xs font-bold">
        <button className="bg-sky-700 hover:bg-sky-800 py-2 px-4 rounded-xl w-[calc(50%-8px)]"
        onClick={()=>setNoCollection(index)}>
          View Collection
        </button>
        <button className="bg-slate-800 hover:bg-slate-700 py-2 px-4 rounded-xl w-[calc(50%-8px)]">
          Promo page
        </button>
      </div>
    </div>
  );
};

export default CollectionCard;
