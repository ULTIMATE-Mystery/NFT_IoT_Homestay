import React from 'react';
import homestay from 'assets/image/homestay/homestay1.jpg';


const CollectionCard = () => {
  return (
    <div className="flex flex-col flex-basis justify-between space-y-4">
      <div
        className="relative"
        style={{
          paddingTop: '75%',
          backgroundImage: "url('https://airnfts.s3.amazonaws.com/nft-images/20210522/SUMMER_HOUSE_ILUSTRATIONS_1621648119342.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(0,0,0,0.5))',
          }}
        ></div>
        <div className='absolute bottom-0 left-4 flex flex-row space-x-4'>
            <img
              src={homestay}
              alt="Background"
              className="w-1/4 h-auto "
            />
            <div className='flex flex-col space-y-2'>
                <div>
                    Alexander Homestay
                </div>
                <div className='flex flex-row'>
                    <div className='flex my-auto'>
                        By &nbsp;
                    </div>
                    <div className='bg-slate-950 hover:bg-slate-800 cursor-pointer p-2 rounded-xl'>
                        <img src=''/>
                        <div>Alexander</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className="p-4 text-slate-400">
        First NFT collection by Alexander Homestay. 1000 NFT homestays that open up over time and reveal the hidden vouchers.
      </div>
      <div className="flex justify-between p-4 space-x-4">
        <button className="bg-sky-700 hover:bg-sky-800 py-2 px-4 rounded-xl w-[calc(50%-8px)]">
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
