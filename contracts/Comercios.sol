//Version de Solidity
pragma solidity >=0.4.25 <0.7.0;

//import "@openzeppelin/contracts/access/Ownable.sol";
//Contrato de Comercios
contract Comercios {
    //Datos de Comercio
    struct Comercio{
        string nombre;
        string rut;
        string departamento;
        string direccion;
        string telefono;
        uint256 numcuenta;
        address comercioAddress;
        //uint IDlength;
    }

    uint256 public totalComercios;

    event Message(string msgs);

    address owner;

    function comercio() public{
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    mapping (address => Comercio) comercios;
    //Funcion de Crear Comercio
    function crearComercio(
        string memory _nombre,
        string memory _rut,
        string memory _departamento,
        string memory _direccion,
        string memory _telefono,
        uint256 _numcuenta,
        address _comercioAddress
    ) 
       onlyOwner public{
            comercios[_comercioAddress] = Comercio(
                _nombre,
                _rut,
                _departamento,
                _direccion,
                _telefono,
                _numcuenta,
                _comercioAddress);
        }
    //Funcion Mostrar Informacion del Ultimo Comercio Creado
    function myInfo() public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        uint,
        address) {
        return (
        comercios[msg.sender].nombre,
        comercios[msg.sender].rut,
        comercios[msg.sender].departamento,
        comercios[msg.sender].direccion,
        comercios[msg.sender].telefono,
        comercios[msg.sender].numcuenta,
        comercios[msg.sender].comercioAddress);
    }
    
    
    //Funcion para consultar Comercion, Imput address
    function existComercio(address _comercioaddres) public view returns(
        string memory _nombre, 
        string memory _rut
    ){
            return(
                comercios[_comercioaddres].nombre,
                comercios[_comercioaddres].rut
            );
}

 


}