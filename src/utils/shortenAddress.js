export const shortenAddress = (address) => address?
  `${address.slice(0, 8)}...${address.slice(address.length - 6)}`:'undefined';