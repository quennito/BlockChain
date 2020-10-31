pragma solidity ^0.7.4;

    contract Comercios {

    struct Comercio {
        string nombreComercio;
        string rutComercio;
        string departamentoComercio;
        string direccionComercio;
        string telefonoComercio;
        uint numcuenta;
        address comercioAddress;
        uint IDlength;
        mapping (address => Beneficiario) beneficiaries;
        Beneficiario[] beneficiario;
    }
    
    mapping(address => Comercio) public comercios;

    struct Beneficiario {
        string nombreBeneficiario;
        string documuentoBeneficiario;
        string departamentoBeneficiario;
        string direccionBeneficiario;
        string telefonoBeneficiario;
        address beneficiarioAddress;
        uint ID;
        bool access;

    }
    
    event Message(string msgs);

    address owner;

    function comercio() public{
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    //Agregar comercio
    
    function addComercio(string memory _nombreComercio, string memory _rutComercio, string memory _departamentoComercio, string memory _direccionComercio, string memory _telefonoComercio, uint _numcuenta, address _comercioAddress) public
        onlyOwner {
        comercios[_comercioAddress].nombreComercio = _nombreComercio;
        comercios[_comercioAddress].rutComercio = _rutComercio;
        comercios[_comercioAddress].departamentoComercio = _departamentoComercio;
        comercios[_comercioAddress].direccionComercio = _direccionComercio;
        comercios[_comercioAddress].telefonoComercio = _telefonoComercio;
        comercios[_comercioAddress].numcuenta = _numcuenta;
        comercios[_comercioAddress].comercioAddress = _comercioAddress;
        emit Message("Comercio agregado correctamente");
    }
    
    //Ver información del comercio 
    function myInfo() public view returns (string memory, string memory, string memory, string memory, string memory, uint, address) {
        return ( comercios[msg.sender].nombreComercio,
        comercios[msg.sender].rutComercio,
        comercios[msg.sender].departamentoComercio,
        comercios[msg.sender].direccionComercio,
        comercios[msg.sender].telefonoComercio,
        comercios[msg.sender].numcuenta,
        comercios[msg.sender].comercioAddress);
    }
    
    //Comprobar si el comercio existe 
    
    function existComercio (address _comercioaddress) public view returns(uint) {
        if (comercios[_comercioaddress].IDlength == 0){  //PREGUNTAR AUNQUE COMPILE//
            return (1); // NO EXIST
        }
        else{
            return (0); // EXIST
        }
    }
    
    //Agregar un beneficiario a un comercio 
    function addBeneficiario(address _beneficiarioAddress, address _comercioAddress, string memory _nombreBeneficiario, string memory _documentoBeneficiario, string memory _departamentoBeneficiario, string memory _direccionBeneficiario, string memory _telefonoBeneficiario) external {

        if(comercios[_comercioAddress].beneficiaries[_beneficiarioAddress].access != true){
        uint id = comercios[_comercioAddress].IDlength;

        comercios[_comercioAddress].beneficiaries[_beneficiarioAddress].beneficiarioAddress = _beneficiarioAddress;
        comercios[_comercioAddress].beneficiaries[_beneficiarioAddress].access = true;
        comercios[_comercioAddress].beneficiaries[_beneficiarioAddress].ID = id;

        Beneficiario memory newBeneficiario = Beneficiario({
            
        nombreBeneficiario : _nombreBeneficiario,
        documuentoBeneficiario : _documentoBeneficiario,
        departamentoBeneficiario : _departamentoBeneficiario,
        direccionBeneficiario : _direccionBeneficiario,
        telefonoBeneficiario : _telefonoBeneficiario,
        beneficiarioAddress: _beneficiarioAddress,
        ID: id,
        access: true
        
    });
    
        comercios[_comercioAddress].beneficiario.push(newBeneficiario);
        comercios[_comercioAddress].IDlength += 1;
        Message("PatientAdded");
        
        }
    }
    
    //Eliminar un beneficiario de un comercio
        
    function delBeneficiario(address _beneficiarioAddress, address _comercioAddress) external {
        uint idP = comercios[_comercioAddress].beneficiaries[_beneficiarioAddress].ID;
        if(comercios[_comercioAddress].beneficiario[idP].beneficiarioAddress == _beneficiarioAddress && comercios[_comercioAddress].beneficiario[idP].access == true){
            comercios[_comercioAddress].beneficiario[idP].access=false;
            delete comercios[_comercioAddress].beneficiaries[_beneficiarioAddress];
            Message("Beneficiario eliminado");
            return;
        }
    }
        
        
    
    //FALTA ÚLTIMA FUNCION getAllComercio, ver primero problemas en Doctors 
    //Obtener la lista de los beneficiarios de un comercio 
    //problemas con el view y el storage por temas de version
    
    /*function getAllPatient() public view returns (address[] memory, uint[] memory) {
        address[] memory patientList ;
        uint[] memory patientListLevel ;

        patientList.length = 0;
        patientListLevel.length = 0;

        for (uint i=0;i<doctors[msg.sender].patient.length; i++ ){
            
            if(doctors[msg.sender].patient[i].access == true){
                patientList.push(doctors[msg.sender].patient[i].patientAddress);
                patientListLevel.push(doctors[msg.sender].patient[i].level);
            }
        }
        return (patientList, patientListLevel);
    }*/
        
        

    }