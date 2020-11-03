pragma solidity >=0.5.0 < 0.7.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenSocialUy is ERC20, Ownable {
    //string name = "Token Social Uruguay";
    //string symbol = "TSU";
    //uint8 decimals = 18;
    //uint  INITIAL_SUPPLY = 1000000;
    string Owner;


constructor() ERC20 ("Token Social Uruguay","TSU") public {
   
  }

function mint(address account, uint256 amount) onlyOwner public {
        _mint(account, amount);
    }

}