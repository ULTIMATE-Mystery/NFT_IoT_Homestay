import * as React from 'react';

function Clock(props: any) {
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
            <path d="M19.504 12.75a7.5 7.5 0 10-14.999 0 7.5 7.5 0 0014.999 0zM6.663 4.275A2.188 2.188 0 005.25 3.75l-.131.004C3.922 3.826 3 4.875 3.004 6.14c0 .619.218.908.51 1.276a.213.213 0 00.152.083h.041a.151.151 0 00.12-.061L6.674 4.64a.252.252 0 00-.012-.366v0zM17.339 4.275a2.187 2.187 0 011.412-.525l.13.004c1.198.072 2.12 1.121 2.116 2.387 0 .619-.218.908-.51 1.276a.212.212 0 01-.151.083h-.042a.152.152 0 01-.119-.062l-2.848-2.797a.251.251 0 01.012-.366v0z" />
            <path d="M12.004 7.5v5.25h-3.75M19.504 20.25l-1.875-1.875M4.504 20.25l1.875-1.875" />
        </svg>
    );
}

export default Clock;
