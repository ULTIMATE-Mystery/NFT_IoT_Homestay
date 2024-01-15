import * as React from 'react';

function Lightning(props: any) {
    return (
        <svg
            width={24}
            height={24}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M6 12l2-9h7.5L14 9h4L9 21l1.5-9H6z" />
        </svg>
    );
}

export default Lightning;
