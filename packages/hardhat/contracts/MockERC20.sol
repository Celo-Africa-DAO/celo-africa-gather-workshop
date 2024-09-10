// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor() ERC20("Celo Kenya Shiling", "cKes") {}

    function mint(address recipient) public {
        _mint(recipient, 1000 * 10**18); // Mint tokens with 18 decimal places
    }

    function balanceOf(address _user) public view override returns (uint256) {
        return super.balanceOf(_user);
    }

    // Corrected approve function
    function approve(address spender, uint256 amount) public override returns (bool) {
        return super.approve(spender, amount);
    }
}
