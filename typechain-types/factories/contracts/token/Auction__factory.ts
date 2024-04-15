/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  Auction,
  AuctionInterface,
} from "../../../contracts/token/Auction";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        internalType: "contract IERC721",
        name: "_nft",
        type: "address",
      },
      {
        internalType: "address",
        name: "initialOwner_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "AUCTION_SERVICE_FEE_RATE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINIMUM_BID_RATE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_auctionId",
        type: "uint256",
      },
    ],
    name: "cancelAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_initialPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endTime",
        type: "uint256",
      },
    ],
    name: "createAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_auctionId",
        type: "uint256",
      },
    ],
    name: "finishAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_auctionId",
        type: "uint256",
      },
    ],
    name: "getAuction",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "auctioneer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initialPrice",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "previousBidder",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "lastBid",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "lastBidder",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "completed",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "active",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "auctionId",
            type: "uint256",
          },
        ],
        internalType: "struct Auction.AuctionInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_active",
        type: "bool",
      },
    ],
    name: "getAuctionByStatus",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "auctioneer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initialPrice",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "previousBidder",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "lastBid",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "lastBidder",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "completed",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "active",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "auctionId",
            type: "uint256",
          },
        ],
        internalType: "struct Auction.AuctionInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_auctionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_bid",
        type: "uint256",
      },
    ],
    name: "joinAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200377b3803806200377b833981810160405281019062000037919062000302565b80600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620000ad5760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401620000a491906200036f565b60405180910390fd5b620000be816200014a60201b60201c565b5082600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050506200038c565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620002408262000213565b9050919050565b6000620002548262000233565b9050919050565b620002668162000247565b81146200027257600080fd5b50565b60008151905062000286816200025b565b92915050565b6000620002998262000233565b9050919050565b620002ab816200028c565b8114620002b757600080fd5b50565b600081519050620002cb81620002a0565b92915050565b620002dc8162000233565b8114620002e857600080fd5b50565b600081519050620002fc81620002d1565b92915050565b6000806000606084860312156200031e576200031d6200020e565b5b60006200032e8682870162000275565b93505060206200034186828701620002ba565b92505060406200035486828701620002eb565b9150509250925092565b620003698162000233565b82525050565b60006020820190506200038660008301846200035e565b92915050565b6133df806200039c6000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c806396b5a7551161007157806396b5a7551461017b578063bd0a079d14610197578063c00a6fb7146101b5578063cf266ed0146101e5578063f08e6e7614610201578063f2fde38b1461021d576100b4565b8063150b7a02146100b9578063431f21da146100e95780636aadfdd014610105578063715018a61461012357806378bd79351461012d5780638da5cb5b1461015d575b600080fd5b6100d360048036038101906100ce9190612467565b610239565b6040516100e0919061252a565b60405180910390f35b61010360048036038101906100fe9190612545565b610267565b005b61010d6107fa565b60405161011a91906125bb565b60405180910390f35b61012b6107ff565b005b610147600480360381019061014291906125d6565b610813565b604051610154919061271d565b60405180910390f35b6101656109c4565b6040516101729190612748565b60405180910390f35b610195600480360381019061019091906125d6565b6109ed565b005b61019f610ec9565b6040516101ac91906125bb565b60405180910390f35b6101cf60048036038101906101ca919061278f565b610ece565b6040516101dc919061294d565b60405180910390f35b6101ff60048036038101906101fa91906125d6565b6111c9565b005b61021b6004803603810190610216919061296f565b6116bb565b005b610237600480360381019061023291906129af565b611e1b565b005b60007f150b7a023d4804d13e8c85fb27262cb750cf6ba9f9dd3bb30d90f482ceeb4b1f905095945050505050565b814211156102aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102a190612a39565b60405180910390fd5b8082106102ec576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102e390612acb565b60405180910390fd5b8260001061032f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161032690612b5d565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636352211e866040518263ffffffff1660e01b81526004016103a191906125bb565b602060405180830381865afa1580156103be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103e29190612b92565b73ffffffffffffffffffffffffffffffffffffffff1614610438576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161042f90612c0b565b60405180910390fd5b3073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663081812fc866040518263ffffffff1660e01b81526004016104aa91906125bb565b602060405180830381865afa1580156104c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104eb9190612b92565b73ffffffffffffffffffffffffffffffffffffffff1614610541576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161053890612c9d565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166342842e0e3330876040518463ffffffff1660e01b81526004016105a093929190612cbd565b600060405180830381600087803b1580156105ba57600080fd5b505af11580156105ce573d6000803e3d6000fd5b5050505060006040518061016001604052803373ffffffffffffffffffffffffffffffffffffffff168152602001868152602001858152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001858152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001848152602001838152602001600015158152602001600115158152602001600380549050815250905060038190806001815401808255809150506001900390600052602060002090600a020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002015560608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506080820151816004015560a08201518160050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060c0820151816006015560e082015181600701556101008201518160080160006101000a81548160ff0219169083151502179055506101208201518160080160016101000a81548160ff021916908315150217905550610140820151816009015550505050505050565b606e81565b610807611ea1565b6108116000611f28565b565b61081b6122c4565b6003828154811061082f5761082e612cf4565b5b90600052602060002090600a0201604051806101600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600482015481526020016005820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160068201548152602001600782015481526020016008820160009054906101000a900460ff161515151581526020016008820160019054906101000a900460ff161515151581526020016009820154815250509050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b8060038181548110610a0257610a01612cf4565b5b90600052602060002090600a020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610a9f5750610a706109c4565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b610ade576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ad590612d95565b60405180910390fd5b6000151560038381548110610af657610af5612cf4565b5b90600052602060002090600a020160080160009054906101000a900460ff16151514610b57576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b4e90612e01565b60405180910390fd5b60038281548110610b6b57610b6a612cf4565b5b90600052602060002090600a020160080160019054906101000a900460ff16610bc9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bc090612e6d565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166342842e0e3060038581548110610c1c57610c1b612cf4565b5b90600052602060002090600a020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660038681548110610c6257610c61612cf4565b5b90600052602060002090600a0201600101546040518463ffffffff1660e01b8152600401610c9293929190612cbd565b600060405180830381600087803b158015610cac57600080fd5b505af1158015610cc0573d6000803e3d6000fd5b50505050600073ffffffffffffffffffffffffffffffffffffffff1660038381548110610cf057610cef612cf4565b5b90600052602060002090600a020160050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610e4957600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb60038481548110610d8f57610d8e612cf4565b5b90600052602060002090600a020160050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660038581548110610dd557610dd4612cf4565b5b90600052602060002090600a0201600401546040518363ffffffff1660e01b8152600401610e04929190612e8d565b6020604051808303816000875af1158015610e23573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e479190612ecb565b505b600160038381548110610e5f57610e5e612cf4565b5b90600052602060002090600a020160080160006101000a81548160ff021916908315150217905550600060038381548110610e9d57610e9c612cf4565b5b90600052602060002090600a020160080160016101000a81548160ff0219169083151502179055505050565b600381565b60606000805b600380549050811015610f3a5783151560038281548110610ef857610ef7612cf4565b5b90600052602060002090600a020160080160019054906101000a900460ff16151503610f2d578180610f2990612f27565b9250505b8080600101915050610ed4565b5060008167ffffffffffffffff811115610f5757610f56612f6f565b5b604051908082528060200260200182016040528015610f9057816020015b610f7d6122c4565b815260200190600190039081610f755790505b5090506000805b6003805490508110156111bd5785151560038281548110610fbb57610fba612cf4565b5b90600052602060002090600a020160080160019054906101000a900460ff161515036111b05760038181548110610ff557610ff4612cf4565b5b90600052602060002090600a0201604051806101600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600482015481526020016005820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160068201548152602001600782015481526020016008820160009054906101000a900460ff161515151581526020016008820160019054906101000a900460ff1615151515815260200160098201548152505083838151811061119657611195612cf4565b5b602002602001018190525081806111ac90612f27565b9250505b8080600101915050610f97565b50819350505050919050565b80600381815481106111de576111dd612cf4565b5b90600052602060002090600a020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061127b575061124c6109c4565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b6112ba576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112b190612d95565b60405180910390fd5b60001515600383815481106112d2576112d1612cf4565b5b90600052602060002090600a020160080160009054906101000a900460ff16151514611333576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161132a90612e01565b60405180910390fd5b6003828154811061134757611346612cf4565b5b90600052602060002090600a020160080160019054906101000a900460ff166113a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161139c90612e6d565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166342842e0e30600385815481106113f8576113f7612cf4565b5b90600052602060002090600a020160050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166003868154811061143e5761143d612cf4565b5b90600052602060002090600a0201600101546040518463ffffffff1660e01b815260040161146e93929190612cbd565b600060405180830381600087803b15801561148857600080fd5b505af115801561149c573d6000803e3d6000fd5b505050506000600383815481106114b6576114b5612cf4565b5b90600052602060002090600a02016004015490506000600384815481106114e0576114df612cf4565b5b90600052602060002090600a0201600201546003858154811061150657611505612cf4565b5b90600052602060002090600a0201600401546115229190612f9e565b9050600060646003836115359190612fd2565b61153f9190613043565b90506000818461154f9190612f9e565b9050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600388815481106115a3576115a2612cf4565b5b90600052602060002090600a020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836040518363ffffffff1660e01b81526004016115f3929190612e8d565b6020604051808303816000875af1158015611612573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116369190612ecb565b5060016003878154811061164d5761164c612cf4565b5b90600052602060002090600a020160080160006101000a81548160ff02191690831515021790555060006003878154811061168b5761168a612cf4565b5b90600052602060002090600a020160080160016101000a81548160ff021916908315150217905550505050505050565b6000600383815481106116d1576116d0612cf4565b5b90600052602060002090600a0201604051806101600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600482015481526020016005820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160068201548152602001600782015481526020016008820160009054906101000a900460ff161515151581526020016008820160019054906101000a900460ff1615151515815260200160098201548152505090508060c001514210156118a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161189f906130c0565b60405180910390fd5b600015158161010001511515146118f4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118eb90612e01565b60405180910390fd5b806101200151611939576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161193090612e6d565b60405180910390fd5b60008073ffffffffffffffffffffffffffffffffffffffff168260a0015173ffffffffffffffffffffffffffffffffffffffff1614611994576064606e83608001516119859190612fd2565b61198f9190613043565b61199a565b81604001515b9050828111156119df576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119d690613152565b60405180910390fd5b82600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b8152600401611a3b9190612748565b602060405180830381865afa158015611a58573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a7c9190613187565b1015611abd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ab490613200565b60405180910390fd5b82600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b8152600401611b1b929190613220565b602060405180830381865afa158015611b38573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b5c9190613187565b1015611b9d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b9490613295565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff16826000015173ffffffffffffffffffffffffffffffffffffffff1603611c0f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c0690613301565b60405180910390fd5b611c3d600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16333086611fec565b600073ffffffffffffffffffffffffffffffffffffffff168260a0015173ffffffffffffffffffffffffffffffffffffffff1614611d1f57600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8360a0015184608001516040518363ffffffff1660e01b8152600401611cda929190612e8d565b6020604051808303816000875af1158015611cf9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d1d9190612ecb565b505b8160a0015160038581548110611d3857611d37612cf4565b5b90600052602060002090600a020160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503360038581548110611d9c57611d9b612cf4565b5b90600052602060002090600a020160050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260038581548110611e0057611dff612cf4565b5b90600052602060002090600a02016004018190555050505050565b611e23611ea1565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611e955760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401611e8c9190612748565b60405180910390fd5b611e9e81611f28565b50565b611ea961206e565b73ffffffffffffffffffffffffffffffffffffffff16611ec76109c4565b73ffffffffffffffffffffffffffffffffffffffff1614611f2657611eea61206e565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401611f1d9190612748565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b612068848573ffffffffffffffffffffffffffffffffffffffff166323b872dd86868660405160240161202193929190612cbd565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050612076565b50505050565b600033905090565b60006120a1828473ffffffffffffffffffffffffffffffffffffffff1661210d90919063ffffffff16565b905060008151141580156120c65750808060200190518101906120c49190612ecb565b155b1561210857826040517f5274afe70000000000000000000000000000000000000000000000000000000081526004016120ff9190612748565b60405180910390fd5b505050565b606061211b83836000612123565b905092915050565b60608147101561216a57306040517fcd7860590000000000000000000000000000000000000000000000000000000081526004016121619190612748565b60405180910390fd5b6000808573ffffffffffffffffffffffffffffffffffffffff1684866040516121939190613392565b60006040518083038185875af1925050503d80600081146121d0576040519150601f19603f3d011682016040523d82523d6000602084013e6121d5565b606091505b50915091506121e58683836121f0565b925050509392505050565b606082612205576122008261227f565b612277565b6000825114801561222d575060008473ffffffffffffffffffffffffffffffffffffffff163b145b1561226f57836040517f9996b3150000000000000000000000000000000000000000000000000000000081526004016122669190612748565b60405180910390fd5b819050612278565b5b9392505050565b6000815111156122925780518082602001fd5b6040517f1425ea4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b604051806101600160405280600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600015158152602001600015158152602001600081525090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006123998261236e565b9050919050565b6123a98161238e565b81146123b457600080fd5b50565b6000813590506123c6816123a0565b92915050565b6000819050919050565b6123df816123cc565b81146123ea57600080fd5b50565b6000813590506123fc816123d6565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f84011261242757612426612402565b5b8235905067ffffffffffffffff81111561244457612443612407565b5b6020830191508360018202830111156124605761245f61240c565b5b9250929050565b60008060008060006080868803121561248357612482612364565b5b6000612491888289016123b7565b95505060206124a2888289016123b7565b94505060406124b3888289016123ed565b935050606086013567ffffffffffffffff8111156124d4576124d3612369565b5b6124e088828901612411565b92509250509295509295909350565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b612524816124ef565b82525050565b600060208201905061253f600083018461251b565b92915050565b6000806000806080858703121561255f5761255e612364565b5b600061256d878288016123ed565b945050602061257e878288016123ed565b935050604061258f878288016123ed565b92505060606125a0878288016123ed565b91505092959194509250565b6125b5816123cc565b82525050565b60006020820190506125d060008301846125ac565b92915050565b6000602082840312156125ec576125eb612364565b5b60006125fa848285016123ed565b91505092915050565b61260c8161238e565b82525050565b61261b816123cc565b82525050565b60008115159050919050565b61263681612621565b82525050565b610160820160008201516126536000850182612603565b5060208201516126666020850182612612565b5060408201516126796040850182612612565b50606082015161268c6060850182612603565b50608082015161269f6080850182612612565b5060a08201516126b260a0850182612603565b5060c08201516126c560c0850182612612565b5060e08201516126d860e0850182612612565b506101008201516126ed61010085018261262d565b5061012082015161270261012085018261262d565b50610140820151612717610140850182612612565b50505050565b600061016082019050612733600083018461263c565b92915050565b6127428161238e565b82525050565b600060208201905061275d6000830184612739565b92915050565b61276c81612621565b811461277757600080fd5b50565b60008135905061278981612763565b92915050565b6000602082840312156127a5576127a4612364565b5b60006127b38482850161277a565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b610160820160008201516127ff6000850182612603565b5060208201516128126020850182612612565b5060408201516128256040850182612612565b5060608201516128386060850182612603565b50608082015161284b6080850182612612565b5060a082015161285e60a0850182612603565b5060c082015161287160c0850182612612565b5060e082015161288460e0850182612612565b5061010082015161289961010085018261262d565b506101208201516128ae61012085018261262d565b506101408201516128c3610140850182612612565b50505050565b60006128d583836127e8565b6101608301905092915050565b6000602082019050919050565b60006128fa826127bc565b61290481856127c7565b935061290f836127d8565b8060005b8381101561294057815161292788826128c9565b9750612932836128e2565b925050600181019050612913565b5085935050505092915050565b6000602082019050818103600083015261296781846128ef565b905092915050565b6000806040838503121561298657612985612364565b5b6000612994858286016123ed565b92505060206129a5858286016123ed565b9150509250929050565b6000602082840312156129c5576129c4612364565b5b60006129d3848285016123b7565b91505092915050565b600082825260208201905092915050565b7f41756374696f6e2063616e206e6f742073746172740000000000000000000000600082015250565b6000612a236015836129dc565b9150612a2e826129ed565b602082019050919050565b60006020820190508181036000830152612a5281612a16565b9050919050565b7f41756374696f6e2063616e206e6f7420656e64206265666f726520697420737460008201527f6172747300000000000000000000000000000000000000000000000000000000602082015250565b6000612ab56024836129dc565b9150612ac082612a59565b604082019050919050565b60006020820190508181036000830152612ae481612aa8565b9050919050565b7f496e697469616c207072696365206d757374206265206772656174657220746860008201527f616e203000000000000000000000000000000000000000000000000000000000602082015250565b6000612b476024836129dc565b9150612b5282612aeb565b604082019050919050565b60006020820190508181036000830152612b7681612b3a565b9050919050565b600081519050612b8c816123a0565b92915050565b600060208284031215612ba857612ba7612364565b5b6000612bb684828501612b7d565b91505092915050565b7f4d757374207374616b6520796f7572206f776e20746f6b656e00000000000000600082015250565b6000612bf56019836129dc565b9150612c0082612bbf565b602082019050919050565b60006020820190508181036000830152612c2481612be8565b9050919050565b7f5468697320636f6e7472616374206d75737420626520617070726f766564207460008201527f6f207472616e736665722074686520746f6b656e000000000000000000000000602082015250565b6000612c876034836129dc565b9150612c9282612c2b565b604082019050919050565b60006020820190508181036000830152612cb681612c7a565b9050919050565b6000606082019050612cd26000830186612739565b612cdf6020830185612739565b612cec60408301846125ac565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4f6e6c792061756374696f6e656572206f72206f776e65722063616e2070657260008201527f666f726d207468697320616374696f6e00000000000000000000000000000000602082015250565b6000612d7f6030836129dc565b9150612d8a82612d23565b604082019050919050565b60006020820190508181036000830152612dae81612d72565b9050919050565b7f41756374696f6e20697320616c726561647920636f6d706c6574656400000000600082015250565b6000612deb601c836129dc565b9150612df682612db5565b602082019050919050565b60006020820190508181036000830152612e1a81612dde565b9050919050565b7f41756374696f6e206973206e6f74206163746976650000000000000000000000600082015250565b6000612e576015836129dc565b9150612e6282612e21565b602082019050919050565b60006020820190508181036000830152612e8681612e4a565b9050919050565b6000604082019050612ea26000830185612739565b612eaf60208301846125ac565b9392505050565b600081519050612ec581612763565b92915050565b600060208284031215612ee157612ee0612364565b5b6000612eef84828501612eb6565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612f32826123cc565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612f6457612f63612ef8565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000612fa9826123cc565b9150612fb4836123cc565b9250828203905081811115612fcc57612fcb612ef8565b5b92915050565b6000612fdd826123cc565b9150612fe8836123cc565b9250828202612ff6816123cc565b9150828204841483151761300d5761300c612ef8565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061304e826123cc565b9150613059836123cc565b92508261306957613068613014565b5b828204905092915050565b7f41756374696f6e20686173206e6f742073746172746564000000000000000000600082015250565b60006130aa6017836129dc565b91506130b582613074565b602082019050919050565b600060208201905081810360008301526130d98161309d565b9050919050565b7f426964207072696365206d7573742062652067726561746572207468616e207460008201527f6865206d696e696d756d20707269636500000000000000000000000000000000602082015250565b600061313c6030836129dc565b9150613147826130e0565b604082019050919050565b6000602082019050818103600083015261316b8161312f565b9050919050565b600081519050613181816123d6565b92915050565b60006020828403121561319d5761319c612364565b5b60006131ab84828501613172565b91505092915050565b7f496e73756666696369656e742062616c616e6365000000000000000000000000600082015250565b60006131ea6014836129dc565b91506131f5826131b4565b602082019050919050565b60006020820190508181036000830152613219816131dd565b9050919050565b60006040820190506132356000830185612739565b6132426020830184612739565b9392505050565b7f496e73756666696369656e7420616c6c6f77616e636500000000000000000000600082015250565b600061327f6016836129dc565b915061328a82613249565b602082019050919050565b600060208201905081810360008301526132ae81613272565b9050919050565b7f43616e206e6f7420626964206f6e20796f7572206f776e2061756374696f6e00600082015250565b60006132eb601f836129dc565b91506132f6826132b5565b602082019050919050565b6000602082019050818103600083015261331a816132de565b9050919050565b600081519050919050565b600081905092915050565b60005b8381101561335557808201518184015260208101905061333a565b60008484015250505050565b600061336c82613321565b613376818561332c565b9350613386818560208601613337565b80840191505092915050565b600061339e8284613361565b91508190509291505056fea2646970667358221220a897e08f41a370cb90a5a5a12b14042183c7f25f22a96e58bb98884be49aae5c64736f6c63430008180033";

type AuctionConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AuctionConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Auction__factory extends ContractFactory {
  constructor(...args: AuctionConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _token: AddressLike,
    _nft: AddressLike,
    initialOwner_: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _token,
      _nft,
      initialOwner_,
      overrides || {}
    );
  }
  override deploy(
    _token: AddressLike,
    _nft: AddressLike,
    initialOwner_: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _token,
      _nft,
      initialOwner_,
      overrides || {}
    ) as Promise<
      Auction & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Auction__factory {
    return super.connect(runner) as Auction__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AuctionInterface {
    return new Interface(_abi) as AuctionInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Auction {
    return new Contract(address, _abi, runner) as unknown as Auction;
  }
}
