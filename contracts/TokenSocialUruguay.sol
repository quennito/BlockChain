pragma solidity >=0.4.25 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenSocialUruguay is ERC20, Ownable {
    string Owner;
    //mapping (address => Token) tokens;
    




    constructor() ERC20 ("Token Social Uruguay",
        "TSU") public {
   
        }

    function crearToken(
        address account,
        uint256 amount
    )
        onlyOwner public {
            _mint(
                account,
                amount
            );
        }


        function AsignarBeneficio(
        address sender,
        address recipient,
        uint256 amount
        )
        onlyOwner public {
            _transfer(sender, recipient, amount);
        }

        //function balanceOf(address account) public returns (uint256)
          //  {
            //    return tokens[account].balance;
            //}
    
    
     


    

}