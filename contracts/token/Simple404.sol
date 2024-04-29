//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC404} from "../ERC404.sol";

contract Simple404 is Ownable, ERC404 {
  // string public dataURI;
  string public baseTokenURI;
  uint256 private idPrefix = 1 << 255;
  // string public metaDescription;

  constructor(
    string memory name_,
    string memory symbol_,
    uint8 decimals_,
    uint256 maxTotalSupplyERC721_,
    address initialOwner_,
    address initialMintRecipient_
  ) ERC404(name_, symbol_, decimals_) Ownable(initialOwner_) {
    // Do not mint the ERC721s to the initial owner, as it's a waste of gas.
    _setERC721TransferExempt(initialMintRecipient_, true);
    _mintERC20(initialMintRecipient_, maxTotalSupplyERC721_ * units);
  }

  // function setDataURI(string memory _dataURI) public onlyOwner{
  //   dataURI = _dataURI;
  // }

  function setTokenURI(string memory _tokenURI) public onlyOwner {
    baseTokenURI = _tokenURI;
  }


  //  function setMetaDescription(string memory _metaDesc) public onlyOwner {
  //   metaDescription = _metaDesc;
  //  }


  // function getNFTImg(uint256 id) internal pure returns (string[2] memory) {
  //   uint8 idSeed = uint8(bytes1(keccak256(abi.encodePacked(id))));
  //   string memory image;
  //   string memory color;

  //   if (idSeed <= 100) {
  //       image = "Qmd12YoLSyHUPPDKttHfWejWYZyq1KoAwTbAnvdm3z1g5J";
  //       color = "Green";
  //   } else if (idSeed <= 130) {
  //       image = "QmdFWEBLVvt9Eariv467WDY3a3xXJUYwpN7ebyoL2dPV4n";
  //       color = "Blue";
  //   } else if (idSeed <= 160) {
  //       image = "QmbmaEvvbV2eNXcvnVwsdUA6BpvxqAczoB6hbcRanZp3BD";
  //       color = "Purple";
  //   } else if (idSeed <= 220) {
  //       image = "QmQBF8oqBcj8TuGBFKkJybNsqy8WxmHXqBRZLGoow1H5ZK";
  //       color = "Red";
  //   } else if (idSeed <= 255) {
  //       image = "Qmd6BRRtNwcvahb3F1wKmGY5c8thvA2Hc9HuPXKp6zhjkH";
  //       color = "Orange";
  //   }
  //   return [image, color];
  // }

  function tokenURI(uint256 id) public view override returns (string memory) {
    if (bytes(baseTokenURI).length > 0) {
      // return string.concat(baseTokenURI, Strings.toString(id - idPrefix));
      return string.concat(baseTokenURI, Strings.toString(id - idPrefix), ".json");
    } else {
      // string memory image =  getNFTImg(id)[0];
      // string memory color =  getNFTImg(id)[1];
      // string memory nftMetaOpen = string.concat(
      //   string.concat(
      //     string.concat('{"name": "Hero404 #', Strings.toString(id - idPrefix)),
      //     '","description":''"', metaDescription, '","external_url":"https://www.fit.uet.vnu.edu.vn/","image":"'),
      //   string.concat(dataURI, image)
      // );

      // string memory nftMetaPoperty = string.concat(
      //   '","attributes":[{"trait_type":"Color","value":"',
      //   color
      // );

      // string memory nftMetaClose = '"}]}';

      // return
      //   string.concat(
      //     "data:application/json;utf8,",
      //     string.concat(
      //       string.concat(nftMetaOpen, nftMetaPoperty),
      //       nftMetaClose
      //     )
      //   );
      return "";
    }
  }

  function setERC721TransferExempt(address account_, bool value_) external onlyOwner {
    _setERC721TransferExempt(account_, value_);
  }
}
