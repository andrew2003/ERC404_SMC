/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export declare namespace Auction {
  export type AuctionInfoStruct = {
    auctioneer: AddressLike;
    _tokenId: BigNumberish;
    initialPrice: BigNumberish;
    previousBidder: AddressLike;
    lastBid: BigNumberish;
    lastBidder: AddressLike;
    startTime: BigNumberish;
    endTime: BigNumberish;
    completed: boolean;
    active: boolean;
    auctionId: BigNumberish;
  };

  export type AuctionInfoStructOutput = [
    auctioneer: string,
    _tokenId: bigint,
    initialPrice: bigint,
    previousBidder: string,
    lastBid: bigint,
    lastBidder: string,
    startTime: bigint,
    endTime: bigint,
    completed: boolean,
    active: boolean,
    auctionId: bigint
  ] & {
    auctioneer: string;
    _tokenId: bigint;
    initialPrice: bigint;
    previousBidder: string;
    lastBid: bigint;
    lastBidder: string;
    startTime: bigint;
    endTime: bigint;
    completed: boolean;
    active: boolean;
    auctionId: bigint;
  };
}

export interface AuctionInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "AUCTION_SERVICE_FEE_RATE"
      | "MINIMUM_BID_RATE"
      | "cancelAuction"
      | "createAuction"
      | "finishAuction"
      | "getAuction"
      | "getAuctionByStatus"
      | "joinAuction"
      | "onERC721Received"
      | "owner"
      | "renounceOwnership"
      | "transferOwnership"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;

  encodeFunctionData(
    functionFragment: "AUCTION_SERVICE_FEE_RATE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MINIMUM_BID_RATE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "cancelAuction",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createAuction",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "finishAuction",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAuction",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAuctionByStatus",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "joinAuction",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [AddressLike, AddressLike, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "AUCTION_SERVICE_FEE_RATE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MINIMUM_BID_RATE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "finishAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getAuction", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAuctionByStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "joinAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Auction extends BaseContract {
  connect(runner?: ContractRunner | null): Auction;
  waitForDeployment(): Promise<this>;

  interface: AuctionInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  AUCTION_SERVICE_FEE_RATE: TypedContractMethod<[], [bigint], "view">;

  MINIMUM_BID_RATE: TypedContractMethod<[], [bigint], "view">;

  cancelAuction: TypedContractMethod<
    [_auctionId: BigNumberish],
    [void],
    "nonpayable"
  >;

  createAuction: TypedContractMethod<
    [
      _tokenId: BigNumberish,
      _initialPrice: BigNumberish,
      _startTime: BigNumberish,
      _endTime: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  finishAuction: TypedContractMethod<
    [_auctionId: BigNumberish],
    [void],
    "nonpayable"
  >;

  getAuction: TypedContractMethod<
    [_auctionId: BigNumberish],
    [Auction.AuctionInfoStructOutput],
    "view"
  >;

  getAuctionByStatus: TypedContractMethod<
    [_active: boolean],
    [Auction.AuctionInfoStructOutput[]],
    "view"
  >;

  joinAuction: TypedContractMethod<
    [_auctionId: BigNumberish, _bid: BigNumberish],
    [void],
    "nonpayable"
  >;

  onERC721Received: TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BigNumberish, arg3: BytesLike],
    [string],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "AUCTION_SERVICE_FEE_RATE"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "MINIMUM_BID_RATE"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "cancelAuction"
  ): TypedContractMethod<[_auctionId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "createAuction"
  ): TypedContractMethod<
    [
      _tokenId: BigNumberish,
      _initialPrice: BigNumberish,
      _startTime: BigNumberish,
      _endTime: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "finishAuction"
  ): TypedContractMethod<[_auctionId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getAuction"
  ): TypedContractMethod<
    [_auctionId: BigNumberish],
    [Auction.AuctionInfoStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getAuctionByStatus"
  ): TypedContractMethod<
    [_active: boolean],
    [Auction.AuctionInfoStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "joinAuction"
  ): TypedContractMethod<
    [_auctionId: BigNumberish, _bid: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "onERC721Received"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BigNumberish, arg3: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;

  filters: {
    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
  };
}
