import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  BuyNFT as BuyNFTEvent,
  Checkout as CheckoutEvent,
  DataSent as DataSentEvent,
  ListNFT as ListNFTEvent,
  LogIoTDevice as LogIoTDeviceEvent,
  Mint as MintEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PayRemaining as PayRemainingEvent,
  Transfer as TransferEvent,
  UnlistNFT as UnlistNFTEvent,
  UpdateListingNFTPrice as UpdateListingNFTPriceEvent,
  CancelContract as CancelContractEvent,
} from "../generated/Contract/Contract"
import {
  Token
} from "../generated/schema"

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  
}


export function handleMint(event: MintEvent): void {
  let token = Token.load(event.params.tokenId.toHexString());
  token!.tokenId = event.params.tokenId;
  token!.provider = event.params.provider;
  token!.renter = event.params.renter;
  token!.roomId = event.params.roomId;
  token!.version = event.params.version;
  token!.isPrepaid = event.params.isPrepaid;
  token!.isPaidAll = event.params.isPaidAll;
  token!.isCancelled = false;
  token!.save();
}

export function handleTransfer(event: TransferEvent): void {
  let token = Token.load(event.params.tokenId.toHexString());
  if (!token) {
    token = new Token(event.params.tokenId.toHexString());
  }
  token.tokenId = event.params.tokenId;
  token.owner = event.params.to;
  token.creator = event.params.from;
  token.save();
}

export function handlePayRemaining(event: PayRemainingEvent): void {
  let token = Token.load(event.params.tokenId.toHexString());
  token!.isPaidAll = true;
  token!.save();
}

export function handleCancelContract(event: CancelContractEvent): void {
  let token = Token.load(event.params.tokenId.toHexString());
  token!.isCancelled = true;
  token!.save();
}

export function handleListNFT(event: ListNFTEvent): void {
    let token = Token.load(event.params.tokenId.toHexString());
    token!.price = event.params.price;
    token!.save();
}
export function handleBuyNFT(event: BuyNFTEvent): void {
  let token = Token.load(event.params.tokenId.toHexString());
  token!.price = event.params.price;
  token!.owner = event.params.from;
  token!.save();
}
export function handleUnlistNFT(event: UnlistNFTEvent): void {
  let token = Token.load(event.params.tokenId.toHexString());
  token!.price = null;
  token!.owner = event.params.from;
  token!.save();
}
export function handleUpdateListingNFTPrice(event: UpdateListingNFTPriceEvent): void {
  let token = Token.load(event.params.tokenId.toHexString());
  token!.price = event.params.price;
  token!.save();
}