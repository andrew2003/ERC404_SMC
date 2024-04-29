import { ethers, hardhatArguments } from "hardhat";
import * as Config from "./config";

async function main() {
  await Config.initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : "dev";

  const [deployer] = await ethers.getSigners();
  const simple404 = await ethers.getContractFactory("Simple404");

  const name = "Simple404";
  const symbol = "SIMPLE404";
  const decimals = 18n;
  const units = 10n ** decimals;
  const maxTotalSupplyERC721 = 10000n;
  const maxTotalSupplyERC20 = maxTotalSupplyERC721 * units;
  const initialOwner = deployer.address;
  const initialMintRecipient = deployer.address;
  // const idPrefix = 57896044618658097711785492504343953926634992332820282019728792003956564819968n

  const token404 = await simple404.deploy(
    name,
    symbol,
    decimals,
    maxTotalSupplyERC721,
    initialOwner,
    initialMintRecipient
  );

  await token404.waitForDeployment();
  console.log("Simple404 address: ", await token404.getAddress());

  // //Vault deploy
  // const Vault = await ethers.getContractFactory("Vault");
  // const vault = await Vault.deploy(deployer.address);
  // console.log("vault add: ", await vault.getAddress());

  // //USDT deploy
  // const USDT = await ethers.getContractFactory("USDT");
  // const usdt = await USDT.deploy();
  // console.log("usdt add: ", await usdt.getAddress());

  // //deploy ERC404Marketplace
  // const MKP = await ethers.getContractFactory("ERC404Marketplace");
  // const ERC404Marketplace = await MKP.deploy(await token404.getAddress(), await token404.getAddress(), deployer.address);
  // console.log('Market deployed at: ', await ERC404Marketplace.getAddress());

  // //deploy Auction
  // const Auction = await ethers.getContractFactory("Auction");
  // const auction = await Auction.deploy(await token404.getAddress(), await token404.getAddress(), deployer.address);
  // console.log('Market deployed at: ', await auction.getAddress());

  //Set Config
  Config.setConfig(network + ".DeployerAddress", await deployer.address);
  Config.setConfig(network + ".Token404", await token404.getAddress());
  // Config.setConfig(network + ".Vault", await vault.getAddress());
  // Config.setConfig(network + ".USDT", await usdt.getAddress());
  // Config.setConfig(network + '.ERC404Marketplace', await ERC404Marketplace.getAddress());
  // Config.setConfig(network + '.Auction', await auction.getAddress());

  await Config.updateConfig();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
