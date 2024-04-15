// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract USDT is ERC20, ERC20Burnable, AccessControl {

  address public owner;
  using Math for uint256;
  using SafeERC20 for ERC20;

  constructor() ERC20("Tether USD", "USDT") {
    owner = payable(msg.sender);
  }

  modifier onlyOwner() {
        require(address(msg.sender) == owner, "Access Denied");
        _;
    }

  function mint(address to, uint256 amount) external onlyOwner {
    _mint(to, amount);
  }

}