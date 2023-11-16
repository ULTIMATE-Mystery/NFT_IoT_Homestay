import * as React from "react"

function WaterPlant(props) {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#B4DFFB"
          d="M34 62c11.046 0 20-8.954 20-20S34 .982 34 .982 14 30.954 14 42s8.954 20 20 20z"
        />
        <path
          fill="#80D25B"
          d="M34 41a8 8 0 008-8c0-4.418-8-18-8-18s-8 13.582-8 18a8 8 0 008 8z"
        />
        <path
          stroke="#22BA8E"
          strokeLinecap="square"
          strokeWidth={2}
          d="M34 56V29.955"
        />
        <path
          stroke="#22BA8E"
          strokeLinecap="round"
          strokeWidth={2}
          d="M46 44c-6.627 0-12 5.373-12 12M22 44c6.627 0 12 5.373 12 12"
        />
      </g>
    </svg>
  )
}

export default WaterPlant