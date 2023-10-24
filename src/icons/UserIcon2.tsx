import * as React from 'react';

function UserIcon2(props: any) {
    return (
        <svg
            width={60}
            height={60}
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 100-8z" />
        </svg>
    );
}

export default UserIcon2;
