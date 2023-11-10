function Menu(props: any) {
    return (
        <svg
            width={24}
            height={24}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M3.75 7.5h16.5M3.75 12h16.5M3.75 16.5h16.5" />
        </svg>
    );
}

export default Menu;
