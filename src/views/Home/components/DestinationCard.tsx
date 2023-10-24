import { memo, FC } from 'react';
import './index.scss';
interface DestinationCardProps {
    imagePath: string;
    title: string;
    size?: string;
}

const DestinationCard: FC<DestinationCardProps> = ({
    imagePath,
    title,
    size = '1/3',
}) => {
    return (
        <div className={`relative destination-card w-${size}`}>
            <img src={imagePath} alt={title} className="rounded-lg" />
            <div className="destination-card__title absolute top-0 left-0 w-full h-full bg-black opacity-40 rounded-lg"></div>
            <div className="destination-card__title text-white text-center text-xl absolute bottom-[16px] left-[50%] translate-x-[-50%] font-[500]">
                {title}
            </div>
        </div>
    );
};

DestinationCard.displayName = 'DestinationCard';

export default memo(DestinationCard);
