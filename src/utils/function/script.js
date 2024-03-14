import EthCrypto from 'eth-crypto';

// const identity = EthCrypto.createIdentity();
// console.log(identity)
// // secp256k1 unavailable, reverting to browser version
// // {
// //   privateKey: '0xfb8ba94924a43eb08c16bd3eee209578127ec369ed70c4aafcb334f53156f6d0',
// //   publicKey: 'b09ee95d482215262f2e0e06522ed42c03e11cc0a040cd4ded0c78e159424c86069d4c9f39e986d8e032cb2f5dcddd35657a1d38b501d903b3952ed01ab8f3f0',
// //   address: '0x25F34c6984Fa39bc14a3c8e899B226cDDfFBc4a0'
// // }

import  encryptWithPbK from './encryptWithPbK.js';
import decryptWithPrK from './decryptWithPrK.js';

let encrypted = await encryptWithPbK('b09ee95d482215262f2e0e06522ed42c03e11cc0a040cd4ded0c78e159424c86069d4c9f39e986d8e032cb2f5dcddd35657a1d38b501d903b3952ed01ab8f3f0',"foobar");
console.log('Message after encrypted(object form): ',encrypted);
console.log('Message after encrypted(string form): ', JSON.stringify(encrypted));

let decrypted = await decryptWithPrK('0xfb8ba94924a43eb08c16bd3eee209578127ec369ed70c4aafcb334f53156f6d0',encrypted);
console.log('Message after decrypted: ',decrypted);