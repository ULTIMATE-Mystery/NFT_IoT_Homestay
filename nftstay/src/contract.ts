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
  UpdateListingNFTPrice as UpdateListingNFTPriceEvent
} from "../generated/Contract/Contract"
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
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBuyNFT(event: BuyNFTEvent): void {
  let entity = new BuyNFT(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCheckout(event: CheckoutEvent): void {
  let entity = new Checkout(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.roomId = event.params.roomId
  entity.startTimestamp = event.params.startTimestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDataSent(event: DataSentEvent): void {
  let entity = new DataSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.encryptedData = event.params.encryptedData
  entity.hashedData = event.params.hashedData

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleListNFT(event: ListNFTEvent): void {
  let entity = new ListNFT(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLogIoTDevice(event: LogIoTDeviceEvent): void {
  let entity = new LogIoTDevice(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.deviceId = event.params.deviceId
  entity.status = event.params.status
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMint(event: MintEvent): void {
  let entity = new Mint(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.provider = event.params.provider
  entity.renter = event.params.renter
  entity.roomId = event.params.roomId
  entity.rentAmount = event.params.rentAmount
  entity.startTimestamp = event.params.startTimestamp
  entity.endTimestamp = event.params.endTimestamp
  entity.createTimestamp = event.params.createTimestamp
  entity.tokenId = event.params.tokenId
  entity.isCancelled = event.params.isCancelled
  entity.isCheckedOut = event.params.isCheckedOut
  entity.version = event.params.version
  entity.isPrepaid = event.params.isPrepaid
  entity.isPaidAll = event.params.isPaidAll

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePayRemaining(event: PayRemainingEvent): void {
  let entity = new PayRemaining(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnlistNFT(event: UnlistNFTEvent): void {
  let entity = new UnlistNFT(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdateListingNFTPrice(
  event: UpdateListingNFTPriceEvent
): void {
  let entity = new UpdateListingNFTPrice(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
