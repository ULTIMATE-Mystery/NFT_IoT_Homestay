import * as React from 'react';

const Droplet = ({
    size = 50,
    strokeWidth = 2.5,
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
        <path d="m12 2.69 5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
);

export default Droplet;
