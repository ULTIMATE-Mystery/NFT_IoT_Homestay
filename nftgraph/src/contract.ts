import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  Approval,
  ApprovalForAll,
  BuyNFT,
  CancelContract,
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
import { ExampleEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from)

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.approved = event.params.approved

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract._authorizedGateways(...)
  // - contract._logIoTdevices(...)
  // - contract._minTimeToCancelDeposit(...)
  // - contract._minTimeToCancelPrepaid(...)
  // - contract._nfts(...)
  // - contract._nftsOfProvider(...)
  // - contract._nftsOfRenter(...)
  // - contract._noNftOfProvider(...)
  // - contract._noNftOfRenter(...)
  // - contract._noRooms(...)
  // - contract._percentDeposit(...)
  // - contract._price(...)
  // - contract._startTime(...)
  // - contract._version(...)
  // - contract.balanceOf(...)
  // - contract.bnbToUsd(...)
  // - contract.calculateRentAmount(...)
  // - contract.getAllRoomsValidity(...)
  // - contract.getApproved(...)
  // - contract.getBalance(...)
  // - contract.getBnbPrice(...)
  // - contract.getLatestPolicy(...)
  // - contract.getLogsForToken(...)
  // - contract.getNFTInfo(...)
  // - contract.getNftsIdOfProvider(...)
  // - contract.getNftsIdOfRenter(...)
  // - contract.getPolicyByVersion(...)
  // - contract.getPrice(...)
  // - contract.getRoomValidity(...)
  // - contract.getTime(...)
  // - contract.isApprovedForAll(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.ownerOf(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.tokenURI(...)
  // - contract.usdToBnb(...)
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleBuyNFT(event: BuyNFT): void {}

export function handleCancelContract(event: CancelContract): void {}

export function handleCheckout(event: Checkout): void {}

export function handleDataSent(event: DataSent): void {}

export function handleListNFT(event: ListNFT): void {}

export function handleLogIoTDevice(event: LogIoTDevice): void {}

export function handleMint(event: Mint): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePayRemaining(event: PayRemaining): void {}

export function handleTransfer(event: Transfer): void {}

export function handleUnlistNFT(event: UnlistNFT): void {}

export function handleUpdateListingNFTPrice(
  event: UpdateListingNFTPrice
): void {}
