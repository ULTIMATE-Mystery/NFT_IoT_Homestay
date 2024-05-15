import * as React from 'react';

const Plug = ({
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
      <path d="M6 7h12v5a6 6 0 01-6 6v0a6 6 0 01-6-6V7zM15 2v5M12 18v4M9 2v5" />
    </svg>
);

export default Plug;
