import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "@ethersproject/contracts";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import * as chai from "chai";
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
import { keccak256 } from "@ethersproject/keccak256";

const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

function parseEther(amount: Number) {
    return ethers.parseUnits(amount.toString(), 18);
}

describe("Vault", function () {
    let owner: SignerWithAddress;
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;
    let carol: SignerWithAddress;

  let vault:Contract;
  let token:Contract;

  async function deployFixture() {
        await ethers.provider.send("hardhat_reset", []);
        [owner, alice, bob, carol] = await ethers.getSigners();
        const name = "Hero404"
        const symbol = "HERO404"
        const decimals = 18n
        const units = 10n ** decimals
        const maxTotalSupplyERC721 = 100n
        const maxTotalSupplyERC20 = maxTotalSupplyERC721 * units
        const initialOwner = owner.address
        const initialMintRecipient = owner.address
        // const idPrefix = 57896044618658097711785492504343953926634992332820282019728792003956564819968n

        //Vault deploy
        const Vault = await ethers.getContractFactory("Vault", owner);
        const vault = await Vault.deploy(owner.address);
        console.log("vault add: ", await vault.getAddress());

        //Token deploy
        const Token = await ethers.getContractFactory("Hero404", owner);
        const token = await Token.deploy(
            name,
            symbol,
            decimals,
            maxTotalSupplyERC721,
            initialOwner,
            initialMintRecipient,
        )
        await token.waitForDeployment()

        //Set token to vault
        await vault.setToken(token.getAddress());

        console.log("owner add: ", owner.address);
        console.log("token add: ", await token.getAddress());


        return { owner, alice, bob, carol, token, vault };
    }


 ////// Happy Path
 it("Should deposit into the Vault", async () => {
    let { owner, alice, bob, carol, token, vault } = await loadFixture(
      deployFixture
    );
    await token.transfer(alice.address, parseEther(100));
    await token
      .connect(alice)
      .approve(vault.getAddress(), token.balanceOf(alice.address));

    await vault.connect(alice).deposit(parseEther(10));
    expect(await token.balanceOf(vault.getAddress())).equal(
      parseEther(10)
    );
});

  it("Should withdraw", async () => {
    let { owner, alice, bob, carol, token, vault } = await loadFixture(
      deployFixture
    );
    //grant withdrawer role to Bob
    let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
    await vault.grantRole(WITHDRAWER_ROLE, bob.address);

    // setter vault functions

    await vault.setWithdrawEnable(true);
    await vault.setMaxWithdrawAmount(parseEther(100));

    // alice deposit into the vault
    await token.transfer(alice.address, parseEther(100));
    await token
      .connect(alice)
      .approve(vault.getAddress(), token.balanceOf(alice.address));
    await vault.connect(alice).deposit(parseEther(10));

    // bob withdraw into alice address
    await vault.connect(bob).withdraw(parseEther(3), alice.address);

    expect(await token.balanceOf(vault.getAddress())).equal(
      parseEther(7)
    );
    expect(await token.balanceOf(alice.address)).equal(
      parseEther(93)
    );
  });
  ///////Unhappy Path/////////
//   it("Should not deposit, Insufficient account balance", async () => {
//     let { owner, alice, bob, carol, token, vault } = await loadFixture(
//       deployFixture
//     );
//     await token.transfer(alice.address, parseEther(100));
//     await token
//       .connect(alice)
//       .approve(vault.getAddress(), token.balanceOf(alice.address));
//     expect(
//       await vault.connect(alice).deposit(parseEther(200))
//     ).revertedWith("Insufficient account balance");
//   });
  it("Should not withdraw, Withdraw is not available ", async () => {
    //grant withdrawer role to Bob
    let { alice, vault, token } = await loadFixture(deployFixture);
    let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
    await vault.grantRole(WITHDRAWER_ROLE, bob.address);

    // setter vault functions

    await vault.setWithdrawEnable(false);
    await vault.setMaxWithdrawAmount(parseEther(100));

    // alice deposit into the vault
    await token.transfer(alice.address, parseEther(100));
    await token
      .connect(alice)
      .approve(vault.getAddress(), token.balanceOf(alice.address));
    await vault.connect(alice).deposit(parseEther(10));

    // bob withdraw into alice address
    await expect(
      vault.connect(bob).withdraw(parseEther(30), alice.address)
    ).revertedWith("Withdraw is not available");
  });
  it("Should not withdraw, Exceed maximum amount ", async () => {
    let { alice, vault, token } = await loadFixture(deployFixture);
    //grant withdrawer role to Bob
    let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
    await vault.grantRole(WITHDRAWER_ROLE, bob.address);

    // setter vault functions

    await vault.setWithdrawEnable(true);
    await vault.setMaxWithdrawAmount(parseEther(100));

    // alice deposit into the vault
    await token.transfer(alice.address, parseEther(100));
    await token
      .connect(alice)
      .approve(vault.getAddress(), token.balanceOf(alice.address));
    await vault.connect(alice).deposit(parseEther(100));

    // bob withdraw into alice address
    await expect(
      vault.connect(bob).withdraw(parseEther(200), alice.address)
    ).revertedWith("Exceed maximum amount");
  });
  it("Should not withdraw, Caller is not a withdrawer", async () => {
    let { alice, vault, token } = await loadFixture(deployFixture);
    //grant withdrawer role to Bob
    let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
    await vault.grantRole(WITHDRAWER_ROLE, bob.address);

    // setter vault functions

    await vault.setWithdrawEnable(true);
    await vault.setMaxWithdrawAmount(parseEther(100));

    // alice deposit into the vault
    await token.transfer(alice.address, parseEther(100));
    await token
      .connect(alice)
      .approve(vault.getAddress(), token.balanceOf(alice.address));
    await vault.connect(alice).deposit(parseEther(10));

    // bob withdraw into alice address
    await expect(
      vault.connect(carol).withdraw(parseEther(10), alice.address)
    ).revertedWith("Caller is not a withdrawer");
  });
});