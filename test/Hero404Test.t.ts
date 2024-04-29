import { expect } from "chai";
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, network } from "hardhat";

describe("Token contract", function () {
  async function deployHero404() {
    const signers = await ethers.getSigners();
    const factory = await ethers.getContractFactory("Simple404");

    const name = "Simple404";
    const symbol = "SIMPLE404";
    const decimals = 18n;
    const units = 10n ** decimals;
    const maxTotalSupplyERC721 = 10000n;
    const maxTotalSupplyERC20 = maxTotalSupplyERC721 * units;
    const initialOwner = signers[0];
    const initialMintRecipient = signers[0];
    const idPrefix =
      57896044618658097711785492504343953926634992332820282019728792003956564819968n;

    //Token deploy
    const contract = await factory.deploy(
      name,
      symbol,
      decimals,
      maxTotalSupplyERC721,
      initialOwner.address,
      initialMintRecipient.address
    );
    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();

    // Generate 10 random addresses for experiments.
    const randomAddresses = Array.from(
      { length: 10 },
      () => ethers.Wallet.createRandom().address
    );

    //Vault deploy

    return {
      contract,
      contractAddress,
      signers,
      deployConfig: {
        name,
        symbol,
        decimals,
        units,
        maxTotalSupplyERC721,
        maxTotalSupplyERC20,
        initialOwner,
        initialMintRecipient,
        idPrefix,
      },
      randomAddresses,
    };
  }

  async function getPermitSignature(
    contractAddress: string,
    msgSender: any,
    spender: any,
    value: bigint,
    nonce: bigint,
    deadline: bigint
  ) {
    const domain = {
      name: "Example",
      version: "1",
      chainId: network.config.chainId as number,
      verifyingContract: contractAddress,
    };

    const types = {
      Permit: [
        {
          name: "owner",
          type: "address",
        },
        {
          name: "spender",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
        {
          name: "nonce",
          type: "uint256",
        },
        {
          name: "deadline",
          type: "uint256",
        },
      ],
    };

    // set the Permit type values
    const values = {
      owner: msgSender.address,
      spender: spender,
      value: value,
      nonce: nonce,
      deadline: deadline,
    };

    // sign the Permit type data with the deployer's private key
    const signature = await msgSender.signTypedData(domain, types, values);

    // split the signature into its components
    return ethers.Signature.from(signature);
  }

  async function getSigners() {
    const signers = await ethers.getSigners();

    return {
      bob: signers[0],
      alice: signers[1],
      jason: signers[2],
      patty: signers[3],
      linda: signers[4],
      larry: signers[5],
      tom: signers[6],
      adam: signers[7],
      julie: signers[8],
      robert: signers[9],
      amy: signers[10],
      ...signers,
    };
  }
  async function deployHero404WithTokensInSecondSigner() {
    const f = await loadFixture(deployHero404);
    const from = f.signers[1];
    const to = f.signers[2];

    // Start off with 100 full tokens.
    const initialExperimentBalanceERC721 = 100n;
    const initialExperimentBalanceERC20 =
      initialExperimentBalanceERC721 * f.deployConfig.units;

    const balancesBeforeSigner0 = await getBalances(
      f.contract,
      f.signers[0].address
    );
    const balancesBeforeSigner1 = await getBalances(
      f.contract,
      f.signers[1].address
    );

    // console.log("balancesBeforeSigner0", balancesBeforeSigner0)
    // console.log("balancesBeforeSigner1", balancesBeforeSigner1)

    // Add the owner to the exemption list
    await f.contract
      .connect(f.signers[0])
      .setERC721TransferExempt(f.signers[0].address, true);

    // Transfer all tokens from the owner to 'from', who is the initial sender for the tests.
    await f.contract
      .connect(f.signers[0])
      .transfer(from.address, initialExperimentBalanceERC20);

    return {
      ...f,
      initialExperimentBalanceERC20,
      initialExperimentBalanceERC721,
      from,
      to,
    };
  }

  async function deployHero404WithSomeTokensTransferredToRandomAddress() {
    const f = await loadFixture(deployHero404);

    const targetAddress = f.randomAddresses[0];

    // Transfer some tokens to a non-exempted wallet to generate the NFTs.
    await f.contract
      .connect(f.signers[0])
      .transfer(targetAddress, 5n * f.deployConfig.units);

    expect(await f.contract.erc721TotalSupply()).to.equal(5n);

    return {
      ...f,
      targetAddress,
    };
  }

  async function getBalances(contract: any, address: string) {
    return {
      erc20: await contract.erc20BalanceOf(address),
      erc721: await contract.erc721BalanceOf(address),
    };
  }

  function containsERC721TransferEvent(
    logs: any[],
    from: string,
    to: string,
    id: bigint
  ) {
    for (const log of logs) {
      if (log.topics.length == 4) {
        if (
          log.topics[0] ==
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" &&
          log.topics[1] ==
            "0x000000000000000000000000" +
              from.substring(2, from.length).toLowerCase() &&
          log.topics[2] ==
            "0x000000000000000000000000" +
              to.substring(2, to.length).toLowerCase() &&
          log.topics[3] == "0x" + id.toString(16)
        ) {
          return true;
        }
      }
    }

    return false;
  }

  function containsERC721ApprovalEvent(
    logs: any[],
    owner: string,
    spender: string,
    id: bigint
  ) {
    for (const log of logs) {
      if (log.topics.length == 4) {
        if (
          log.topics[0] ==
            "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925" &&
          log.topics[1] ==
            "0x000000000000000000000000" +
              owner.substring(2, owner.length).toLowerCase() &&
          log.topics[2] ==
            "0x000000000000000000000000" +
              spender.substring(2, spender.length).toLowerCase() &&
          log.topics[3] == "0x" + id.toString(16)
        ) {
          return true;
        }
      }
    }

    return false;
  }

  describe("#constructor", function () {
    it("Initializes the contract with the expected values", async function () {
      const f = await loadFixture(deployHero404);

      expect(await f.contract.name()).to.equal(f.deployConfig.name);
      expect(await f.contract.symbol()).to.equal(f.deployConfig.symbol);
      expect(await f.contract.decimals()).to.equal(f.deployConfig.decimals);
      expect(await f.contract.owner()).to.equal(
        f.deployConfig.initialOwner.address
      );
    });

    it("Mints the initial supply of tokens to the initial mint recipient", async function () {
      const f = await loadFixture(deployHero404);

      // Expect full supply of ERC20 tokens to be minted to the initial recipient.
      expect(
        await f.contract.erc20BalanceOf(
          f.deployConfig.initialMintRecipient.address
        )
      ).to.equal(f.deployConfig.maxTotalSupplyERC20);
      // Expect 0 ERC721 tokens to be minted to the initial recipient, since 1) the user is on the exemption list and 2) the supply is minted using _mintERC20 with mintCorrespondingERC721s_ set to false.
      expect(
        await f.contract.erc721BalanceOf(
          f.deployConfig.initialMintRecipient.address
        )
      ).to.equal(0n);

      // NFT minted count should be 0.
      expect(await f.contract.erc721TotalSupply()).to.equal(0n);

      // Total supply of ERC20s tokens should be equal to the initial mint recipient's balance.
      expect(await f.contract.totalSupply()).to.equal(
        f.deployConfig.maxTotalSupplyERC20
      );
    });

    it("Initializes the exemption list with the initial mint recipient", async function () {
      const f = await loadFixture(deployHero404);

      expect(
        await f.contract.erc721TransferExempt(
          f.deployConfig.initialMintRecipient.address
        )
      ).to.equal(true);
    });
  });

  describe("#erc20TotalSupply", function () {
    it("Returns the correct total supply", async function () {
      const f = await loadFixture(
        deployHero404WithSomeTokensTransferredToRandomAddress
      );

      expect(await f.contract.erc20TotalSupply()).to.eq(
        10000n * f.deployConfig.units
      );
    });
  });

  describe("#erc721TotalSupply", function () {
    it("Returns the correct total supply", async function () {
      const f = await loadFixture(
        deployHero404WithSomeTokensTransferredToRandomAddress
      );

      expect(await f.contract.erc721TotalSupply()).to.eq(5n);
    });
  });

  describe("#ownerOf", function () {
    context("Some tokens have been minted", function () {
      it("Reverts if the token ID is below the allowed range", async function () {
        const f = await loadFixture(
          deployHero404WithSomeTokensTransferredToRandomAddress
        );

        const minimumValidTokenId =
          (await f.contract.ID_ENCODING_PREFIX()) + 1n;

        expect(await f.contract.ownerOf(minimumValidTokenId)).to.eq(
          f.targetAddress
        );

        await expect(
          f.contract.ownerOf(minimumValidTokenId - 1n)
        ).to.be.revertedWithCustomError(f.contract, "InvalidTokenId");
      });

      it("Reverts if the token ID is within the range of valid Ids, but is above 'minted', the max valid minted id", async function () {
        const f = await loadFixture(
          deployHero404WithSomeTokensTransferredToRandomAddress
        );

        const minted = await f.contract.minted();

        const mintedWithPrefix =
          (await f.contract.ID_ENCODING_PREFIX()) + minted;

        expect(await f.contract.ownerOf(mintedWithPrefix)).to.eq(
          f.targetAddress
        );

        await expect(
          f.contract.ownerOf(mintedWithPrefix + 1n)
        ).to.be.revertedWithCustomError(f.contract, "NotFound");
      });

      it("Reverts when for id = MAX_INT", async function () {
        const f = await loadFixture(
          deployHero404WithSomeTokensTransferredToRandomAddress
        );

        const maxId = 2n ** 256n - 1n;

        await expect(f.contract.ownerOf(maxId)).to.be.revertedWithCustomError(
          f.contract,
          "InvalidTokenId"
        );
      });

      it("Returns the address of the owner of the token", async function () {
        const f = await loadFixture(
          deployHero404WithSomeTokensTransferredToRandomAddress
        );

        // Transferred 5 full tokens from a exempted address to the target address (not exempted), which minted the first 5 NFTs.

        // Expect the owner of the token to be the recipient
        for (let i = 1n; i <= 5n; i++) {
          expect(
            await f.contract.ownerOf(f.deployConfig.idPrefix + i)
          ).to.equal(f.targetAddress);
        }
      });
    });
  });

  describe("ERC20 token transfer logic for triggering ERC721 transfers", function () {
    context(
      "Fractional transfers (moving less than 1 full token) that trigger ERC721 transfers",
      async function () {
        it("Handles the case of the receiver gaining a whole new token", async function () {
          const f = await loadFixture(deployHero404WithTokensInSecondSigner);

          // Receiver starts out with 0.9 tokens
          const startingBalanceOfReceiver = (f.deployConfig.units / 10n) * 9n; // 0.9 tokens
          await f.contract
            .connect(f.from)
            .transfer(f.to.address, startingBalanceOfReceiver);

          // Initial balances
          const fromBalancesBefore = await getBalances(
            f.contract,
            f.from.address
          );
          const toBalancesBefore = await getBalances(f.contract, f.to.address);

          // console.log("fromBalancesBefore", fromBalancesBefore)
          // console.log("toBalancesBefore", toBalancesBefore)

          // Ensure that the receiver has 0.9 tokens and 0 NFTs.
          expect(toBalancesBefore.erc20).to.equal(startingBalanceOfReceiver);
          expect(toBalancesBefore.erc721).to.equal(0n);

          // Transfer an amount that results in the receiver gaining a whole new token (0.9 + 0.1)
          const fractionalValueToTransferERC20 = f.deployConfig.units / 10n; // 0.1 tokens
          await f.contract
            .connect(f.from)
            .transfer(f.to.address, fractionalValueToTransferERC20);

          // Post-transfer balances
          const fromBalancesAfter = await getBalances(
            f.contract,
            f.from.address
          );
          const toBalancesAfter = await getBalances(f.contract, f.to.address);

          // console.log("fromBalancesAfter", fromBalancesAfter)
          // console.log("toBalancesAfter", toBalancesAfter)

          // Verify ERC20 balances after transfer
          expect(fromBalancesAfter.erc20).to.equal(
            fromBalancesBefore.erc20 - fractionalValueToTransferERC20
          );
          expect(toBalancesAfter.erc20).to.equal(
            toBalancesBefore.erc20 + fractionalValueToTransferERC20
          );

          // Verify ERC721 balances after transfer
          // Assuming the receiver should have gained 1 NFT due to the transfer completing a whole token
          expect(fromBalancesAfter.erc721).to.equal(fromBalancesBefore.erc721); // No change for the sender
          expect(toBalancesAfter.erc721).to.equal(toBalancesBefore.erc721 + 1n);
        });

        it("Handles the case of the sender losing a partial token, dropping it below a full token", async function () {
          const f = await loadFixture(deployHero404WithTokensInSecondSigner);

          // Initial balances
          const fromBalancesBefore = await getBalances(
            f.contract,
            f.from.address
          );
          const toBalancesBefore = await getBalances(f.contract, f.to.address);

          expect(fromBalancesBefore.erc20 / f.deployConfig.units).to.equal(
            100n
          );

          // Sender starts with 100 tokens and sends 0.1, resulting in the loss of 1 NFT but no NFT transfer to the receiver.
          const initialFractionalAmount = f.deployConfig.units / 10n; // 0.1 token in sub-units
          const transferAmount = initialFractionalAmount * 1n; // 0.1 tokens, ensuring a loss of a whole token after transfer

          // Perform the transfer
          await f.contract
            .connect(f.from)
            .transfer(f.to.address, transferAmount);

          // Post-transfer balances
          const fromBalancesAfter = await getBalances(
            f.contract,
            f.from.address
          );
          const toBalancesAfter = await getBalances(f.contract, f.to.address);

          // Verify ERC20 balances after transfer
          expect(fromBalancesAfter.erc20).to.equal(
            fromBalancesBefore.erc20 - transferAmount
          );
          expect(toBalancesAfter.erc20).to.equal(
            toBalancesBefore.erc20 + transferAmount
          );

          // Verify ERC721 balances after transfer
          // Assuming the sender should lose 1 NFT due to the transfer causing a loss of a whole token.
          // Sender loses an NFT
          expect(fromBalancesAfter.erc721).to.equal(
            fromBalancesBefore.erc721 - 1n
          );
          // No NFT gain for the receiver
          expect(toBalancesAfter.erc721).to.equal(toBalancesBefore.erc721);
          // Contract gains an NFT (it's stored in the contract in this scenario).
          // TODO - Verify this with the contract's balance.
        });
      }
    );

    context("Moving one or more full tokens", async function () {
      it("Transfers whole tokens without fractional impact correctly", async function () {
        const f = await loadFixture(deployHero404WithTokensInSecondSigner);

        // Initial balances
        const fromBalancesBefore = await getBalances(
          f.contract,
          f.from.address
        );
        const toBalancesBefore = await getBalances(f.contract, f.to.address);

        // Expect initial balances to match setup
        expect(fromBalancesBefore.erc20).to.equal(
          f.initialExperimentBalanceERC20
        );
        expect(fromBalancesBefore.erc721).to.equal(
          f.initialExperimentBalanceERC721
        );
        expect(toBalancesBefore.erc20).to.equal(0n);
        expect(toBalancesBefore.erc721).to.equal(0n);

        // Transfer 2 whole tokens
        const erc721TokensToTransfer = 2n;
        const valueToTransferERC20 =
          erc721TokensToTransfer * f.deployConfig.units;
        await f.contract
          .connect(f.from)
          .transfer(f.to.address, valueToTransferERC20);

        // Post-transfer balances
        const fromBalancesAfter = await getBalances(f.contract, f.from.address);
        const toBalancesAfter = await getBalances(f.contract, f.to.address);

        // Verify ERC20 balances after transfer
        expect(fromBalancesAfter.erc20).to.equal(
          fromBalancesBefore.erc20 - valueToTransferERC20
        );
        expect(toBalancesAfter.erc20).to.equal(
          toBalancesBefore.erc20 + valueToTransferERC20
        );

        // Verify ERC721 balances after transfer - Assuming 2 NFTs should have been transferred
        expect(fromBalancesAfter.erc721).to.equal(
          fromBalancesBefore.erc721 - erc721TokensToTransfer
        );
        expect(toBalancesAfter.erc721).to.equal(
          toBalancesBefore.erc721 + erc721TokensToTransfer
        );
      });

      it("Handles the case of sending 3.2 tokens where the sender started out with 99.1 tokens and the receiver started with 0.9 tokens", async function () {
        // This test demonstrates all 3 cases in one scenario:
        // - The sender loses a partial token, dropping it below a full token (99.1 - 3.2 = 95.9)
        // - The receiver gains a whole new token (0.9 + 3.2 (3 whole, 0.2 fractional) = 4.1)
        // - The sender transfers 3 whole tokens to the receiver (99.1 - 3.2 (3 whole, 0.2 fractional) = 95.9)

        const f = await loadFixture(deployHero404WithTokensInSecondSigner);

        // Receiver starts out with 0.9 tokens
        const startingBalanceOfReceiver = (f.deployConfig.units / 10n) * 9n; // 0.9 tokens
        await f.contract
          .connect(f.from)
          .transfer(f.to.address, startingBalanceOfReceiver);

        // Initial balances
        const fromBalancesBefore = await getBalances(
          f.contract,
          f.from.address
        );
        const toBalancesBefore = await getBalances(f.contract, f.to.address);

        // console.log("fromBalancesBefore", fromBalancesBefore)
        // console.log("toBalancesBefore", toBalancesBefore)

        // Ensure that the receiver has 0.9 tokens and 0 NFTs.
        expect(toBalancesBefore.erc20).to.equal(startingBalanceOfReceiver);
        expect(toBalancesBefore.erc721).to.equal(0n);

        // Transfer an amount that results in:
        // - the receiver gaining a whole new token (0.9 + 0.2 + 3)
        // - the sender losing a partial token, dropping it below a full token (99.1 - 3.2 = 95.9)
        const fractionalValueToTransferERC20 =
          (f.deployConfig.units / 10n) * 32n; // 3.2 tokens
        await f.contract
          .connect(f.from)
          .transfer(f.to.address, fractionalValueToTransferERC20);

        // Post-transfer balances
        const fromBalancesAfter = await getBalances(f.contract, f.from.address);
        const toBalancesAfter = await getBalances(f.contract, f.to.address);

        // console.log("fromBalancesAfter", fromBalancesAfter)
        // console.log("toBalancesAfter", toBalancesAfter)

        // Verify ERC20 balances after transfer
        expect(fromBalancesAfter.erc20).to.equal(
          fromBalancesBefore.erc20 - fractionalValueToTransferERC20
        );
        expect(toBalancesAfter.erc20).to.equal(
          toBalancesBefore.erc20 + fractionalValueToTransferERC20
        );

        // Verify ERC721 balances after transfer
        // The receiver should have gained 3 NFTs from the transfer and 1 NFT due to the transfer completing a whole token for a total of +4 NFTs.
        expect(fromBalancesAfter.erc721).to.equal(
          fromBalancesBefore.erc721 - 4n
        );
        expect(toBalancesAfter.erc721).to.equal(toBalancesBefore.erc721 + 4n);
      });
    });
  });

  describe("#transfer", function () {
    it("Reverts when attempting to transfer anything to 0x0", async function () {
      const f = await loadFixture(deployHero404);

      // Attempt to send 1 ERC-721 to 0x0.
      await expect(
        f.contract.connect(f.signers[0]).transfer(ethers.ZeroAddress, 1n)
      ).to.be.revertedWithCustomError(f.contract, "InvalidRecipient");

      // Attempt to send 1 full token worth of ERC-20s to 0x0
      await expect(
        f.contract
          .connect(f.signers[0])
          .transfer(ethers.ZeroAddress, f.deployConfig.units)
      ).to.be.revertedWithCustomError(f.contract, "InvalidRecipient");
    });

    it("Handles fractional balance changes on self-send correctly", async function () {
      const f = await loadFixture(deployHero404);

      // Send 1.5 tokens to address
      await f.contract
        .connect(f.signers[0])
        .transfer(f.signers[1].address, (15n * f.deployConfig.units) / 10n);

      // Send .5 tokens to self
      await f.contract
        .connect(f.signers[1])
        .transfer(f.signers[1].address, (5n * f.deployConfig.units) / 10n);

      expect(await f.contract.erc721BalanceOf(f.signers[1].address)).to.eq(1n);
      expect(await f.contract.erc20BalanceOf(f.signers[1].address)).to.eq(
        (15n * f.deployConfig.units) / 10n
      );
    });

    it("Handles dequeue / enqueue correctly", async function () {
      const f = await loadFixture(deployHero404);

      // Send 4 tokens to address
      await f.contract
        .connect(f.signers[0])
        .transfer(f.signers[1].address, 4n * f.deployConfig.units);

      // Send 1 tokens to deployer
      await f.contract
        .connect(f.signers[1])
        .transfer(f.signers[0].address, 1n * f.deployConfig.units);

      expect(await f.contract.getERC721QueueLength()).to.eq(1);

      // Send 1 tokens to address
      await f.contract
        .connect(f.signers[0])
        .transfer(f.signers[1].address, 1n * f.deployConfig.units);

      expect(await f.contract.getERC721QueueLength()).to.eq(0);

      // Send 1 tokens to deployer
      await f.contract
        .connect(f.signers[1])
        .transfer(f.signers[0].address, 1n * f.deployConfig.units);

      expect(await f.contract.getERC721QueueLength()).to.eq(1);
    });
  });

  describe("#setERC721TransferExempt", function () {
    it("Allows the caller to exempt themselves", async function () {
      const f = await loadFixture(deployHero404);

      expect(
        await f.contract.erc721TransferExempt(f.randomAddresses[1])
      ).to.equal(false);

      // Add a random address to the exemption list
      await f.contract.connect(f.signers[1]).setSelfERC721TransferExempt(true);
      expect(
        await f.contract.erc721TransferExempt(f.signers[1].address)
      ).to.equal(true);

      // Remove the random address from the exemption list
      await f.contract.connect(f.signers[1]).setSelfERC721TransferExempt(false);
      expect(
        await f.contract.erc721TransferExempt(f.signers[1].address)
      ).to.equal(false);
    });
  });

  describe("#_setERC721TransferExempt", function () {
    it("Allows the owner to add and remove addresses from the exemption list", async function () {
      const f = await loadFixture(deployHero404);

      expect(
        await f.contract.erc721TransferExempt(f.randomAddresses[1])
      ).to.equal(false);

      // Add a random address to the exemption list
      await f.contract
        .connect(f.signers[0])
        .setERC721TransferExempt(f.randomAddresses[1], true);
      expect(
        await f.contract.erc721TransferExempt(f.randomAddresses[1])
      ).to.equal(true);

      // Remove the random address from the exemption list
      await f.contract
        .connect(f.signers[0])
        .setERC721TransferExempt(f.randomAddresses[1], false);
      expect(
        await f.contract.erc721TransferExempt(f.randomAddresses[1])
      ).to.equal(false);
    });

    it("Reverts when setting the zero address", async function () {
      const f = await loadFixture(deployHero404);

      await expect(
        f.contract
          .connect(f.signers[0])
          .setERC721TransferExempt(ethers.ZeroAddress, true)
      ).to.be.revertedWithCustomError(f.contract, "InvalidExemption");

      await expect(
        f.contract
          .connect(f.signers[0])
          .setERC721TransferExempt(ethers.ZeroAddress, false)
      ).to.be.revertedWithCustomError(f.contract, "InvalidExemption");
    });

    it("Rebalances ERC721 tokens held by the target", async function () {
      const f = await loadFixture(deployHero404);

      const targetAddress = f.randomAddresses[0];

      // Transfer 3.5 full NFT worth of tokens to that address.
      await f.contract
        .connect(f.signers[0])
        .transfer(targetAddress, (35n * f.deployConfig.units) / 10n);

      expect(await f.contract.erc721BalanceOf(targetAddress)).to.equal(3n);

      // Add that address to the exemption list.
      await f.contract
        .connect(f.signers[0])
        .setERC721TransferExempt(targetAddress, true);

      // Target ERC721 balance should be adjusted
      expect(await f.contract.erc721BalanceOf(targetAddress)).to.equal(0n);
      expect(await f.contract.getERC721QueueLength()).to.equal(3n);
      expect(await f.contract.erc20BalanceOf(targetAddress)).to.equal(
        (35n * f.deployConfig.units) / 10n
      );
      expect((await f.contract.getERC721TokensInQueue(0, 3))[0]).to.equal(
        f.deployConfig.idPrefix + 1n
      );

      // Remove that address from the exemption list.
      await f.contract
        .connect(f.signers[0])
        .setERC721TransferExempt(targetAddress, false);

      // Target ERC721 balance should be adjusted
      expect(await f.contract.erc721BalanceOf(targetAddress)).to.equal(3n);
      expect(await f.contract.getERC721QueueLength()).to.equal(0n);
      expect(await f.contract.erc20BalanceOf(targetAddress)).to.equal(
        (35n * f.deployConfig.units) / 10n
      );
    });
  });

  describe("#erc721BalanceOf", function () {
    context("The address has 0.9 ERC-20 balance", function () {
      it("Returns the correct balance (0 ERC-721)", async function () {
        const f = await loadFixture(deployHero404);

        const targetAddress = f.randomAddresses[0];
        const transferAmount = (f.deployConfig.units / 10n) * 9n; // 0.9 tokens

        // Transfer 1 full NFT worth of tokens to that address.
        await f.contract
          .connect(f.signers[0])
          .transfer(targetAddress, transferAmount);

        expect(await f.contract.erc20BalanceOf(targetAddress)).to.equal(
          transferAmount
        );
        expect(await f.contract.erc721BalanceOf(targetAddress)).to.equal(0n);
      });
    });

    context("The address has exactly 1.0 ERC-20 balance", function () {
      it("Returns the correct balance (1 ERC-721)", async function () {
        const f = await loadFixture(deployHero404);

        const targetAddress = f.randomAddresses[0];
        const transferAmount = f.deployConfig.units; // 1.0 tokens

        // Transfer 1 full NFT worth of tokens to that address.
        await f.contract
          .connect(f.signers[0])
          .transfer(targetAddress, transferAmount);

        expect(await f.contract.erc20BalanceOf(targetAddress)).to.equal(
          transferAmount
        );
        expect(await f.contract.erc721BalanceOf(targetAddress)).to.equal(1n);
      });
    });

    context("The address has 1.1 ERC-20 balance", function () {
      it("Returns the correct balance (1 ERC-721)", async function () {
        const f = await loadFixture(deployHero404);

        const targetAddress = f.randomAddresses[0];
        const transferAmount = (f.deployConfig.units / 10n) * 9n; // 0.9 tokens

        // Transfer 1 full NFT worth of tokens to that address.
        await f.contract
          .connect(f.signers[0])
          .transfer(targetAddress, transferAmount);

        expect(await f.contract.erc20BalanceOf(targetAddress)).to.equal(
          transferAmount
        );
        expect(await f.contract.erc721BalanceOf(targetAddress)).to.equal(0n);
      });
    });
  });

  describe("#erc20BalanceOf", function () {
    it("Returns the correct balance", async function () {
      const f = await loadFixture(deployHero404);

      const targetAddress = f.randomAddresses[0];
      const transferAmount = (f.deployConfig.units / 10n) * 9n; // 0.9 tokens

      expect(await f.contract.erc20BalanceOf(targetAddress)).to.equal(0n);

      await f.contract
        .connect(f.signers[0])
        .transfer(targetAddress, transferAmount);

      expect(await f.contract.erc20BalanceOf(targetAddress)).to.equal(
        transferAmount
      );

      await f.contract
        .connect(f.signers[0])
        .transfer(targetAddress, transferAmount);

      expect(await f.contract.erc20BalanceOf(targetAddress)).to.equal(
        transferAmount * 2n
      );
    });
  });

  describe("#minted", function () {
    it("Returns the total number of tokens minted for legacy support", async function () {
      const f = await loadFixture(
        deployHero404WithSomeTokensTransferredToRandomAddress
      );

      expect(await f.contract.minted()).to.eq(5n);
    });
  });

  describe("#setApprovalForAll", function () {
    context(
      "Granting approval to a valid address besides themselves",
      function () {
        it("Allows a user to set an operator who has approval for all their ERC-721 tokens", async function () {
          const f = await loadFixture(deployHero404);

          const msgSender = f.signers[0];
          const intendedOperator = f.signers[1];

          expect(
            await f.contract.isApprovedForAll(
              msgSender.address,
              intendedOperator.address
            )
          ).to.equal(false);

          // Add an operator for msgSender
          const approveForAllTx = await f.contract
            .connect(msgSender)
            .setApprovalForAll(intendedOperator.address, true);

          expect(
            await f.contract.isApprovedForAll(
              msgSender.address,
              intendedOperator.address
            )
          ).to.equal(true);

          await expect(approveForAllTx)
            .to.emit(f.contract, "ApprovalForAll")
            .withArgs(f.signers[0].address, f.signers[1].address, true);
        });

        it("Allows a user to remove an operator's approval for all", async function () {
          const f = await loadFixture(deployHero404);

          const msgSender = f.signers[0];
          const intendedOperator = f.signers[1];

          // Add an operator for msgSender
          await f.contract
            .connect(msgSender)
            .setApprovalForAll(intendedOperator.address, true);

          // Remove the operator
          await f.contract
            .connect(msgSender)
            .setApprovalForAll(intendedOperator.address, false);

          expect(
            await f.contract.isApprovedForAll(
              msgSender.address,
              intendedOperator.address
            )
          ).to.equal(false);
        });
      }
    );

    context("Granting approval to themselves", function () {
      it("Allows a user to set themselves as an operator who has approval for all their ERC-721 tokens", async function () {
        const f = await loadFixture(deployHero404);

        const msgSender = f.signers[0];

        expect(
          await f.contract.isApprovedForAll(
            msgSender.address,
            msgSender.address
          )
        ).to.equal(false);

        // Add an operator for msgSender
        await f.contract
          .connect(msgSender)
          .setApprovalForAll(msgSender.address, true);

        expect(
          await f.contract.isApprovedForAll(
            msgSender.address,
            msgSender.address
          )
        ).to.equal(true);
      });

      it("Allows a user to remove their own approval for all", async function () {
        const f = await loadFixture(deployHero404);

        const msgSender = f.signers[0];

        // Add an operator for msgSender
        await f.contract
          .connect(msgSender)
          .setApprovalForAll(msgSender.address, true);

        // Remove the operator
        await f.contract
          .connect(msgSender)
          .setApprovalForAll(msgSender.address, false);

        expect(
          await f.contract.isApprovedForAll(
            msgSender.address,
            msgSender.address
          )
        ).to.equal(false);
      });
    });

    context("Granting approval to 0x0", function () {
      it("Reverts if the user attempts to grant or revoke approval for all to 0x0", async function () {
        const f = await loadFixture(deployHero404);

        const msgSender = f.signers[0];

        await expect(
          f.contract
            .connect(msgSender)
            .setApprovalForAll(ethers.ZeroAddress, true)
        ).to.be.revertedWithCustomError(f.contract, "InvalidOperator");

        await expect(
          f.contract
            .connect(msgSender)
            .setApprovalForAll(ethers.ZeroAddress, false)
        ).to.be.revertedWithCustomError(f.contract, "InvalidOperator");
      });
    });
  });
});
