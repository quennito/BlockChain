pragma solidity ^0.7.4;

//import "./Comercio.sol"; //¿ES COMERCIO O COMERCIOS?

    
    contract Beneficiarios {
    
    struct Beneficiario {
        address beneficiarioAddress;
        string nombreBeneficiario;
        string documentoBeneficario;
        string departamentoBeneficiario;
        string direccionBeneficiario;
        string telefonoBeneficario;
        Info[] info;
        mapping (address => uint) myshop;
        Comercio[] comercio;
    }
    
    struct Info {
        string info;
        uint date;
        address comercioAddress;
    }
    
    struct Comercio {
        address comercioAddress;
        uint level;
        bool access;
    }
    
    mapping(address => Beneficiario) private beneficiarios;

    event MessageExistComercio(string msgs);
    event MessageError(string msgs);
    event Message(string msgs);
    event MessageChangeData(uint msgs);
        
    //CREO QUE NO COMPILA POR EL TEMA DE IMPORTAR COMERCIOS
    //Comercios shop;
    //function beneficiarios(address _comercioContract) public {
    //    shop = Comercios(_comercioContract);
    // }
     
    //////////////////////////////BENEFICIARIO//////////////////////////////
    
    //Agregar beneficiario
    
    function addBeneficiario(string memory _nombreBeneficiario, string memory  _documentoBeneficiario, string memory  _departamentoBeneficiario, string memory _direccionBeneficiario, string memory _telefonoBeneficiario) public {
        beneficiarios[msg.sender].beneficiarioAddress = msg.sender;
        beneficiarios[msg.sender].nombreBeneficiario = _nombreBeneficiario;
        beneficiarios[msg.sender].documentoBeneficario = _documentoBeneficiario;
        beneficiarios[msg.sender].departamentoBeneficiario = _departamentoBeneficiario;
        beneficiarios[msg.sender].direccionBeneficiario = _direccionBeneficiario;
        beneficiarios[msg.sender].telefonoBeneficario = _telefonoBeneficiario;
       emit  Message("Added Correctly");
    }
    
    //Ver información del beneficiario
    
    function myInfo() public view returns (address, string memory, string memory , string memory , string memory , string memory){
        return (beneficiarios[msg.sender].beneficiarioAddress,
        beneficiarios[msg.sender].nombreBeneficiario,
        beneficiarios[msg.sender].documentoBeneficario,
        beneficiarios[msg.sender].departamentoBeneficiario,
        beneficiarios[msg.sender].direccionBeneficiario,
        beneficiarios[msg.sender].telefonoBeneficario);
    }
    
    //LUEGO DE ESTA function myInfo(), ESTÁ myInfoDoctor (del pdf) DONDE EL COMENTARIO ES "COMPROBAR". 
    //NO ME PARECIÓ NECESARIO PONERLO, PERO LO DEJO A CRITERIO DE USTEDES. 
    
    //AÑADIR UN COMERCIO 
    
    function addComercio(address _comercioAddress, uint _level) public{
        if(doc.existComercio(_comercioAddress) == 0 && beneficiarios[msg.sender].mybeneficiaries[_comercioAddress] == 0){  //TIRA ERROR POR NO IMPORTAR COMERCIOS
             if (_level == 1 || _level == 2){ 
                beneficiarios[msg.sender].mybeneficiaries[_comercioAddress] = _level;
                Comercio memory newComercio = Comercio({
                comercioAddress : _comercioAddress ,
                level: _level,
                access: true
                });
                
            beneficiarios[msg.sender].comercio.push(newComercio);

            doc.addBeneficiario(msg.sender, _comercioAddress, _level); // TIRA ERROR POR NO IMPORTAR COMERCIO
            Message("Comercio agregado");
            }else{
                MessageError("Error-01");
                return;
            }
        }
        else{
            MessageExistComercio("El comercio no existe");
        }
        
    
        //LUEGO SEGUIRÍA LA FUNCION DE OBTENER TODA LA LISTA DE COMERCIOS, SI SE PONE TIENE EL MISMO PROBLEMA QUE EL get DEL FINAL DE COMERCIOS
        //EN DONDE HAY QUE VER QUE PONER BIEN POR TEMAS DE VERSION. 
    
    
    
}