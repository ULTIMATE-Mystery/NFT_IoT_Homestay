import * as React from 'react';

function Calendar(props: any) {
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
            <path d="M19.5 3.75h-15A2.25 2.25 0 002.25 6v13.5a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25z" />
            <path
                fill="currentColor"
                d="M13.875 12a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM17.625 12a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM13.875 15.75a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM17.625 15.75a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM6.375 15.75a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM10.125 15.75a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM6.375 19.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM10.125 19.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM13.875 19.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                stroke="none"
            />
            <path d="M6 2.25v1.5M18 2.25v1.5M21.75 7.5H2.25" />
        </svg>
    );
}

export default Calendar;
