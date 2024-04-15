import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + "/.env"})


const config:  HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    bsctest: {
      url: "https://bsc-testnet.bnbchain.org",
      accounts: [`${process.env.PRIV_KEY}`]
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`${process.env.PRIV_KEY}`]
    }
  },
  etherscan: {
    apiKey: process.env.API_KEY_ETH
  },
  sourcify: {
    enabled: true
  }
};

export default config;
