import { useContract, useContractRead, useAddress } from '@thirdweb-dev/react';
import { CONTRACT_ADDRESS } from 'utils/constant.ts';

export default function GetLog(tokenId) {
    const address = useAddress();
    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(
        contract,
        'getLogsForToken',
        [tokenId],
        { from: address }
    );
    return { data: data, isLoading: isLoading };
}
