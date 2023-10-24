import { useState, useEffect, memo } from 'react';
import background1 from 'assets/image/background/background1.jpg';
import background2 from 'assets/image/background/background2.jpg';
import background3 from 'assets/image/background/background3.jpg';
import background4 from 'assets/image/background/background4.jpg';
import background5 from 'assets/image/background/background5.jpg';
import background6 from 'assets/image/background/background6.jpg';
import background7 from 'assets/image/background/background7.jpg';
import background8 from 'assets/image/background/background8.jpg';
import background9 from 'assets/image/background/background9.jpg';
import background10 from 'assets/image/background/background10.jpg';
import background11 from 'assets/image/background/background11.jpg';
import background12 from 'assets/image/background/background12.jpg';
import background13 from 'assets/image/background/background13.jpg';
import background14 from 'assets/image/background/background14.jpg';

const HeadBanner = () => {
    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const [bgIndex, setBgIndex] = useState(randomNumberInRange(0, 13));
    const backgroundImages = [
        background1,
        background2,
        background3,
        background4,
        background5,
        background6,
        background7,
        background8,
        background9,
        background10,
        background11,
        background12,
        background13,
        background14,
    ];
    useEffect(() => {
        // Change background every 7 seconds
        const interval = setInterval(() => {
            setBgIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
        }, 7000);

        // Clear the interval when the component unmounts
        return () => {
            clearInterval(interval);
        };
    }, [backgroundImages.length]);

    return (
        <div>
            <div className="relative h-screen">
                {/* Background image */}
                <img
                    src={backgroundImages[bgIndex]}
                    alt="Background"
                    className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
                    style={{ opacity: '100%' }}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
                {/* Content */}
                <div className="flex flex-col items-center justify-center gap-y-8 h-full relative z-1 text-white">
                    <div>
                        <div className="text-xl text-center w-full">
                            SHSC HOMESTAY TRAVELS
                        </div>
                        <div className="mt-16 text-6xl font-[600] text-center w-full">
                            <p className="w-2/3 mx-auto leading-normal">
                                Let's embark on your dream journey
                            </p>
                        </div>
                        <div className="text-xl text-center w-full mt-16 font-[400]">
                            <p>
                                Discover inspiring destinations, create
                                unforgettable memories
                            </p>
                            <p>
                                Travel with confidence - Your adventure starts
                                here
                            </p>
                        </div>
                    </div>
                    {/* <input
                        placeholder="Search place"
                        className="mt-20 border-2 rounded-xl bg-black rounded-xl font-[1000] 
            text-5xl bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
            bg-clip-text p-2 w-full min-w-[400px] max-w-[600px]"
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default memo(HeadBanner);
