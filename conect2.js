///var contractAddress = '0xa3d57dc6c1a4951b51f6afa50132d578b2254257';
//var Web3 = require('web3'); 
var contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "msgs",
          "type": "string"
        }
      ],
      "name": "Message",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "totalBeneficiarios",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "beneficiario",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_nombre",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_documento",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_departamento",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_direccion",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_telefono",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_estatus",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_beneficiarioAddress",
          "type": "address"
        }
      ],
      "name": "crearBeneficiario",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "_beneficiarioaddres",
            "type": "address"
          }
        ],
        "name": "existBeneficiario",
        "outputs": [
          {
            "internalType": "string",
            "name": "_nombre",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_documento",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_estatus",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_beneficiarioaddres",
          "type": "address"
        }
      ],
      "name": "existBeneficiario",
      "outputs": [
        {
          "internalType": "string",
          "name": "_nombre",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_documento",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_estatus",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_beneficiarioaddres",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_estatus",
          "type": "string"
        }
      ],
      "name": "updateCBene",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
var contractAddress = '0xa3d57dc6c1a4951b51f6afa50132d578b2254257';
var web3 = new Web3('http://localhost:9545');
//var simpleSmartContract = new web3.eth.Contract(contractABI, contractAddress);
window.Beneficiarios = new window.web3.eth.Contract(contractABI, contractAddress);

//console.log(Comercios);
//.then(console.log);

async function crear() {
    var nombre = document.getElementById('nombre').value;
    var documento = document.getElementById('documento').value;
    var departamento = document.getElementById('departamento').value;
    var direccion = document.getElementById('direccion').value;
    var telefono = document.getElementById('telefono').value;
    var estatus = 'Preactivo';
    var address   = document.getElementById('address').value;
    var accounts = await window.web3.eth.getAccounts();
    var result = await window.Comercios.methods.crearBeneficiario(nombre, documento, departamento,direccion, telefono, estatus, address ).send({from: accounts[0], gasPrice: web3.utils.toHex(2 * 1e9), gasLimit: web3.utils.toHex(210000)});
    
    if(result){
      document.getElementById('nombre').value = "";
      document.getElementById('documento').value = "";
      document.getElementById('departamento').value = "";
      document.getElementById('direccion').value = "";
      document.getElementById('telefono').value = "";
      document.getElementById('address').value = "";
    }
    
    console.log(result);
  }
  
  
async function consutar(){
    var address = document.getElementById('read-address').value; 
    var result = await window.Beneficiarios.methods.existBeneficiario(`${address}`).call();
    
    if(result){
      document.getElementById('cardnombre').innerHTML = result._nombre;
      document.getElementById('carddoc').innerHTML = result._documento;
      document.getElementById('cardestatus').innerHTML = result._estatus;
    }
    // console.log(result._nombre);
}

async function actualizar(){
  var address = document.getElementById('edit-address').value; 
  var estatus = document.getElementById('edit-estatus').value; 
  var accounts = await window.web3.eth.getAccounts();
  var result = await window.Beneficiarios.methods.updateComer(`${address}`, estatus).send({from: accounts[0], gasPrice: web3.utils.toHex(2 * 1e9), gasLimit: web3.utils.toHex(210000)});
  console.log(result)
}