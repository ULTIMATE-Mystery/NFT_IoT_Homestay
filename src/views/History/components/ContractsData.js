import { useEffect, useState } from "react";
import { useContract, useAddress } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "utils/constant.ts";
import { parseBigNumber } from "utils/function/parseBigNumber.js";

export function useContractsData() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);

  useEffect(() => {
    async function fetchContracts() {
      setLoading(true);
      try {
        const nftIds = await contract.call("getNftsIdOfProvider", [], { from: address });

        const details = await Promise.all(nftIds.map(async (id) => {
          const nftInfo = await contract.call("getNFTInfo", [id]);
          return {
            tokenId: parseInt(id), // Convert BigNumber to integer
            createTimestamp: parseBigNumber(nftInfo[6]) * 1000, // Convert to number
            renter: nftInfo[1],
            roomId: parseBigNumber(nftInfo[2]), // Convert to number
            rentAmount: parseBigNumber(nftInfo[3]) // Convert to number
          };
        }));

        setData(details);
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
      setLoading(false);
    }

    if (contract && address) {
      fetchContracts();
    }
  }, [contract, address]);

  return { data, isLoading };
}
