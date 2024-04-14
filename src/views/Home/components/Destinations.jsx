import { memo } from 'react';
import DestinationCard from './DestinationCard';
import { useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstants';
const Destinations = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col ">
            <div className="w-full flex flex-row justify-between py-6">
                <div className="w-1/3 min-[800px]:text-2xl min-[600px]:text-xl min-[400px]:text-base text-xs 
                flex flex-col h-full justify-between space-y-3">
                    <div className="text-gray-500 font-[600] flex ">DESTINATIONS</div>
                    <div className="font-[700] flex">
                        City escapes and nature retreats
                    </div>
                </div>
                <div className="w-1/3 min-[800px]:text-xl min-[600px]:text-base min-[400px]:text-sm text-[8px]">
                    <div className="text-gray-500">
                        From vibrant urban escapes to tranquil natural wonders,
                        find your perfect destination. Explore diverse
                        landscapes and immerse yourself in local cultures.
                    </div>
                    <div
                        className="text-emerald-600 font-[600]"
                        onClick={() => navigate(routeConstants.BOOKING)}
                    >
                        Explore more
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex flex-row gap-6">
                    <DestinationCard
                        imagePath={require('assets/image/destinations/hochiminh.webp')}
                        title="Ho Chi Minh City"
                        size="1/2"
                    />
                    <DestinationCard
                        imagePath={require('assets/image/destinations/hanoi.webp')}
                        title="Ha Noi"
                        size="1/2"
                    />
                </div>

                <div className="flex flex-row gap-6">
                    <DestinationCard
                        imagePath={require('assets/image/destinations/mekongdelta.webp')}
                        title="Mekong Delta"
                        size="1/3"
                    />
                    <DestinationCard
                        imagePath={require('assets/image/destinations/sondoong.webp')}
                        title="Son Doong Cave"
                        size="1/3"
                    />
                    <DestinationCard
                        imagePath={require('assets/image/destinations/halongbay.webp')}
                        title="Ha Long Bay"
                        size="1/3"
                    />
                </div>
            </div>
        </div>
    );
};

export default memo(Destinations);
