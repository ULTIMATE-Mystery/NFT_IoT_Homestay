import { memo } from 'react';
import DestinationCard from './DestinationCard';
import { useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstants';
const Destinations = () => {
    const navigate = useNavigate();
    return (
        <div className="w-11/12 h-[540px] mx-auto">
            <div className="w-full flex flex-row justify-between items-center py-4">
                <div className="w-1/3">
                    <div className="text-gray-500 font-[600]">DESTINATIONS</div>
                    <div className="text-2xl font-[700]">
                        City escapes and nature retreats
                    </div>
                </div>
                <div className="w-1/3">
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
            <div className="flex flex-col h-[600px] gap-3">
                <div className="flex flex-row w-[calc(100%-12px)] gap-3">
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

                <div className="flex flex-row w-[calc(100%-24px)] gap-3">
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
