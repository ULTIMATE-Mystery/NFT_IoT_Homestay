import * as React from 'react';

const RightArrow = ({
    size = 24,
    strokeWidth = 0.5,
    color = 'currentColor',
    ...props
}) => (
    <svg
        width={size}
        height={size}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
            fill="#FFFFFF"
        />
    </svg>
);

export default RightArrow;
