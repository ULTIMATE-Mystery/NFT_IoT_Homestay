import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { CONTRACT_ADDRESS } from "../constants.js";

// Get private key and secret key from environment variables
const clientId = process.env.CLIENT_ID;
const secretKey = process.env.SECKET_CLIENT_ID;

const sdk = new ThirdwebSDK("binance-testnet", {
  secretKey: secretKey,
  clientId: clientId,
});

const contract = await sdk.getContract(CONTRACT_ADDRESS);

// // retrive past events of checkout activities
// const events = await contract.events.getEvents("Checkout")
// console.log("Check out: " , events); 

// listen to a checkout event (in real time)
contract.events.addEventListener("Checkout", (event) => {
  const tokenId = parseInt(event.data.tokenId._hex, 16);
  console.log('Token ID', tokenId);
  console.log('__________');
  const devices = event.data.devices;
  // Iterate through all devices
  devices.forEach(device => {
      const deviceId = parseInt(device.deviceId._hex, 16);
      const status = device.status;
      const timestamp = parseInt(device.timestamp._hex, 16);

      console.log("Device ID:", deviceId);
      console.log("Status:", status);
      console.log("Timestamp:", timestamp);
      console.log("----------");
  });
});