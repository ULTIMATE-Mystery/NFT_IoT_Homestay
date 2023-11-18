import * as React from 'react';

const Filter = ({
    size = 24,
    strokeWidth = 0.5,
    color = 'currentColor',
    ...props
}) => (
    <svg 
        className="feather feather-filter" 
        width={size} 
        height={size}
        fill="none" 
        stroke={color} 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width={strokeWidth} 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
);

export default Filter;
