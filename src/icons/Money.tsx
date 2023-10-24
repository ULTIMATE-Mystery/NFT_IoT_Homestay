import * as React from 'react';

function Money(props: any) {
    return (
        <svg
            width={24}
            height={24}
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M19.5 6.75h-15A2.25 2.25 0 002.25 9v9a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25z" />
            <path d="M19.282 6.75V5.342A2.344 2.344 0 0016.5 3.041L4.155 5.148A2.344 2.344 0 002.25 7.452V9.75" />
            <path
                fill="currentColor"
                d="M17.25 15a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                stroke="none"
            />
        </svg>
    );
}

export default Money;
