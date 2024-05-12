import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { CONTRACT_ADDRESS } from "../constants.js";
import EthCrypto from 'eth-crypto';
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv'

import encryptWithPbK from './encryptWithPbK.js';
import decryptWithPrK from './decryptWithPrK.js';
dotenv.config({ path: "../../../.env" })


// Get private key and secret key from environment variables
const clientId = process.env.CLIENT_ID;
const secretClientKey = process.env.SECRET_CLIENT_KEY;
const privateKey = process.env.PRIVATE_KEY;
const secretKey = process.env.REACT_APP_SECRET_KEY_WEB;

const sdk = new ThirdwebSDK("binance-testnet", {
  secretKey: secretClientKey,
  clientId: clientId,
});
const sdk2 = ThirdwebSDK.fromPrivateKey(
  privateKey,
  "binance-testnet"
);

const contract = await sdk.getContract(CONTRACT_ADDRESS);
const contract2 = await sdk2.getContract(CONTRACT_ADDRESS);

const data = [[2, true, 1711964243], [2, false, 1713964243], [2, false, 1715464243]];

// Convert data to string
const jsonData = JSON.stringify(data);
const sha256Data = '0x' + CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex).padStart(64, '0');;



// listen to a checkout event (in real time)
contract.events.addEventListener("Checkout", async (event) => {
  const tokenId = parseInt(event.data.tokenId._hex, 16);
  const roomId = parseInt(event.data.roomId._hex, 16);
  console.log('Token ID', tokenId);
  console.log('__________');
  console.log('Room ID', roomId);
  console.log('__________');
  //backend func
  //encryption
  const encryptedData = CryptoJS.AES.encrypt(jsonData, secretKey).toString();
  console.log('Encrypted data:', encryptedData);
  const res = await contract2.call("sendData", [
    event.data.tokenId,
    encryptedData,
    sha256Data
  ])
  console.log(res);
});