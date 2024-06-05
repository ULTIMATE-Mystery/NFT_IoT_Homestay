import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  BuyNFT,
  Checkout,
  DataSent,
  ListNFT,
  LogIoTDevice,
  Mint,
  OwnershipTransferred,
  PayRemaining,
  Transfer,
  UnlistNFT,
  UpdateListingNFTPrice
} from "../generated/Contract/Contract"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createBuyNFTEvent(
  from: Address,
  tokenId: BigInt,
  price: BigInt
): BuyNFT {
  let buyNftEvent = changetype<BuyNFT>(newMockEvent())

  buyNftEvent.parameters = new Array()

  buyNftEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  buyNftEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  buyNftEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return buyNftEvent
}

export function createCheckoutEvent(
  tokenId: BigInt,
  roomId: BigInt,
  startTimestamp: BigInt
): Checkout {
  let checkoutEvent = changetype<Checkout>(newMockEvent())

  checkoutEvent.parameters = new Array()

  checkoutEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  checkoutEvent.parameters.push(
    new ethereum.EventParam("roomId", ethereum.Value.fromUnsignedBigInt(roomId))
  )
  checkoutEvent.parameters.push(
    new ethereum.EventParam(
      "startTimestamp",
      ethereum.Value.fromUnsignedBigInt(startTimestamp)
    )
  )

  return checkoutEvent
}

export function createDataSentEvent(
  encryptedData: string,
  hashedData: Bytes
): DataSent {
  let dataSentEvent = changetype<DataSent>(newMockEvent())

  dataSentEvent.parameters = new Array()

  dataSentEvent.parameters.push(
    new ethereum.EventParam(
      "encryptedData",
      ethereum.Value.fromString(encryptedData)
    )
  )
  dataSentEvent.parameters.push(
    new ethereum.EventParam(
      "hashedData",
      ethereum.Value.fromFixedBytes(hashedData)
    )
  )

  return dataSentEvent
}

export function createListNFTEvent(
  from: Address,
  tokenId: BigInt,
  price: BigInt
): ListNFT {
  let listNftEvent = changetype<ListNFT>(newMockEvent())

  listNftEvent.parameters = new Array()

  listNftEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  listNftEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  listNftEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return listNftEvent
}

export function createLogIoTDeviceEvent(
  tokenId: BigInt,
  deviceId: BigInt,
  status: boolean,
  timestamp: BigInt
): LogIoTDevice {
  let logIoTDeviceEvent = changetype<LogIoTDevice>(newMockEvent())

  logIoTDeviceEvent.parameters = new Array()

  logIoTDeviceEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  logIoTDeviceEvent.parameters.push(
    new ethereum.EventParam(
      "deviceId",
      ethereum.Value.fromUnsignedBigInt(deviceId)
    )
  )
  logIoTDeviceEvent.parameters.push(
    new ethereum.EventParam("status", ethereum.Value.fromBoolean(status))
  )
  logIoTDeviceEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return logIoTDeviceEvent
}

export function createMintEvent(
  provider: Address,
  renter: Address,
  roomId: BigInt,
  rentAmount: BigInt,
  startTimestamp: BigInt,
  endTimestamp: BigInt,
  createTimestamp: BigInt,
  tokenId: BigInt,
  isCancelled: boolean,
  isCheckedOut: boolean,
  version: BigInt,
  isPrepaid: boolean,
  isPaidAll: boolean
): Mint {
  let mintEvent = changetype<Mint>(newMockEvent())

  mintEvent.parameters = new Array()

  mintEvent.parameters.push(
    new ethereum.EventParam("provider", ethereum.Value.fromAddress(provider))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("renter", ethereum.Value.fromAddress(renter))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("roomId", ethereum.Value.fromUnsignedBigInt(roomId))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam(
      "rentAmount",
      ethereum.Value.fromUnsignedBigInt(rentAmount)
    )
  )
  mintEvent.parameters.push(
    new ethereum.EventParam(
      "startTimestamp",
      ethereum.Value.fromUnsignedBigInt(startTimestamp)
    )
  )
  mintEvent.parameters.push(
    new ethereum.EventParam(
      "endTimestamp",
      ethereum.Value.fromUnsignedBigInt(endTimestamp)
    )
  )
  mintEvent.parameters.push(
    new ethereum.EventParam(
      "createTimestamp",
      ethereum.Value.fromUnsignedBigInt(createTimestamp)
    )
  )
  mintEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  mintEvent.parameters.push(
    new ethereum.EventParam(
      "isCancelled",
      ethereum.Value.fromBoolean(isCancelled)
    )
  )
  mintEvent.parameters.push(
    new ethereum.EventParam(
      "isCheckedOut",
      ethereum.Value.fromBoolean(isCheckedOut)
    )
  )
  mintEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("isPrepaid", ethereum.Value.fromBoolean(isPrepaid))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("isPaidAll", ethereum.Value.fromBoolean(isPaidAll))
  )

  return mintEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPayRemainingEvent(tokenId: BigInt): PayRemaining {
  let payRemainingEvent = changetype<PayRemaining>(newMockEvent())

  payRemainingEvent.parameters = new Array()

  payRemainingEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return payRemainingEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createUnlistNFTEvent(
  from: Address,
  tokenId: BigInt
): UnlistNFT {
  let unlistNftEvent = changetype<UnlistNFT>(newMockEvent())

  unlistNftEvent.parameters = new Array()

  unlistNftEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  unlistNftEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return unlistNftEvent
}

export function createUpdateListingNFTPriceEvent(
  tokenId: BigInt,
  price: BigInt
): UpdateListingNFTPrice {
  let updateListingNftPriceEvent = changetype<UpdateListingNFTPrice>(
    newMockEvent()
  )

  updateListingNftPriceEvent.parameters = new Array()

  updateListingNftPriceEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  updateListingNftPriceEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return updateListingNftPriceEvent
}
