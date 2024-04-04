import EthCrypto from 'eth-crypto';

const decryptWithPrK = async (privateKey, encrypted) => {
    const decrypted = await EthCrypto.decryptWithPrivateKey(
        privateKey, // privateKey
        encrypted// encrypted-data
    );
    return decrypted;
}
export default decryptWithPrK;