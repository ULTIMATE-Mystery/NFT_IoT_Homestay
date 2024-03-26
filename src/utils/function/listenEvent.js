import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { CONTRACT_ADDRESS } from "../constants.js";
import EthCrypto from 'eth-crypto';
import dotenv from 'dotenv'
dotenv.config({ path: "../../../.env" })

import  encryptWithPbK from './encryptWithPbK.js';
import decryptWithPrK from './decryptWithPrK.js';

// Get private key and secret key from environment variables
const clientId = process.env.CLIENT_ID;
const secretKey = process.env.SECKET_CLIENT_ID;
const privateKey = process.env.PRIVATE_KEY;

const sdk = new ThirdwebSDK("binance-testnet", {
  secretKey: secretKey,
  clientId: clientId,
});
const sdk2 = ThirdwebSDK.fromPrivateKey(
  privateKey,
  "binance-testnet"
);

const contract = await sdk.getContract(CONTRACT_ADDRESS);
const contract2 = await sdk2.getContract(CONTRACT_ADDRESS);

// // retrive past events of checkout activities
// const events = await contract.events.getEvents("Checkout")
// console.log("Check out: " , events); 

// listen to a checkout event (in real time)
contract.events.addEventListener("Checkout", async (event) => {
  const tokenId = parseInt(event.data.tokenId._hex, 16);
  console.log('Token ID', tokenId);
  console.log('__________');
  //backend func
  let encrypted = await encryptWithPbK("b8fe1cb154f4785431a51baba402007be5962e2d9ef601d78270044b5d18ad49354619cd717b1a4b1bf04cc8c81fa1d84f72b637d64823c7940bdfec93c4a316","foobar");
  const data = await contract2.call("sendData", [
    event.data.tokenId, 
    JSON.stringify(encrypted), 
    EthCrypto.hash.keccak256("foobar")
  ])
  console.log(data);
});