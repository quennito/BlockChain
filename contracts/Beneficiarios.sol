//Version de Solidity
pragma solidity >=0.4.25 <0.7.0;

//Import de contratos openzeppelin
//import "@openzeppelin/contracts/access/Ownable.sol";

//Declaracion del contrato
contract Beneficiarios {

    //definicio de los datos
    struct Beneficiario{
        
            string nombreB;
            string documentoB;
            string departamentoB;
            string direccionB;
            string telefonoB;
            address beneficiarioAddress;
    }

    uint256 public totalComercios;

    event Message(string msgs);

    address owner;

    function beneficiario() public{
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    mapping (address => Beneficiario) beneficiarios;

    //funcion de Crear Beneficiario
    function crearBeneficiario(
        string memory _nombreB,
        string memory _documentoB, 
        string memory _departamentoB, 
        string memory _direccionB, 
        string memory _telefonoB, 
        address _beneficiarioAddress) 
        onlyOwner public{

            beneficiarios[_beneficiarioAddress] = Beneficiario(
            _nombreB,
            _documentoB,
            _departamentoB,
            _direccionB,
            _telefonoB,
            _beneficiarioAddress);
         }

    //Funcion de Obtener informacion Beneficiario
    function myInfo() public view returns (string memory, string memory, string memory, string memory, string memory, address) {
            return (
            beneficiarios[msg.sender].nombreB,
            beneficiarios[msg.sender].documentoB,
            beneficiarios[msg.sender].departamentoB,
            beneficiarios[msg.sender].direccionB,
            beneficiarios[msg.sender].telefonoB,
            beneficiarios[msg.sender].beneficiarioAddress);
        }
    
    
    //Funcion de Consultar Beneficiario
    function existBeneficiario(address _beneficiarioAddress) public view returns(
        string memory _nombreB, 
        string memory _documentoB)
        {
            return(
                beneficiarios[_beneficiarioAddress].nombreB,
                beneficiarios[_beneficiarioAddress].documentoB);
        }

}