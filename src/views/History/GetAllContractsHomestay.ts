import { useContract, useContractRead, useAddress } from '@thirdweb-dev/react';
import { CONTRACT_ADDRESS } from 'utils/constant';

export default function GetAllContractsHomestay() {
    const address = useAddress();
    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(
        contract,
        'getNftsIdOfProvider',
        [],
        { from: address }
    );
    return { data: data, isLoading: isLoading };
}
