import EthCrypto from 'eth-crypto';

const encryptWithPbK = async (publicKey, data) => {
    const encrypted = await EthCrypto.encryptWithPublicKey(
        publicKey, // publicKey
        data // message
    );
    return encrypted;
}
export default encryptWithPbK;