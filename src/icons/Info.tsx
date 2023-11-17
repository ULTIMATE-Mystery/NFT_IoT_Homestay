const Info = ({ size = 24, strokeWidth = 1.5, color = 'none', ...props }) => (
    <svg
        width={size}
        height={size}
        fill="currentColor"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M12 2.625c-5.17 0-9.375 4.206-9.375 9.375 0 5.17 4.206 9.375 9.375 9.375 5.17 0 9.375-4.206 9.375-9.375 0-5.17-4.206-9.375-9.375-9.375zm0 3.844a1.219 1.219 0 110 2.437 1.219 1.219 0 010-2.437zm3 10.593H9.375v-1.5h2.063v-4.124h-1.5v-1.5h3v5.624H15v1.5z" />
    </svg>
);

export default Info;
