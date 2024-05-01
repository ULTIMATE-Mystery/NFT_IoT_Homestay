import React from 'react'
import homestayImg from 'assets/image/homestay/homestay6.jpg';

const HomestayNFTCard = () => {
  return (
    <div className='h-auto items-center flex justify-center relative flex-col space-y-2'>
        <div className="w-full h-48 bg-white rounded-xl"
                style={{
                    backgroundImage: `url(${homestayImg})`,
                    backgroundSize: `100% 100%`,
                }}>
        </div>
        <div className='text-slate-400 flex px-2 w-full'>
            Alexander
        </div>
        <div className='font-bold px-2 w-full'>
            Name NFT
        </div>
        <div className='font-bold px-2 w-full pb-4'>
            10 BNB
        </div>
    </div>
  )
}

export default HomestayNFTCard