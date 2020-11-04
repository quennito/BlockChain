const Beneficiarios = artifacts.require("Beneficiarios");
const Comercios = artifacts.require("Comercios");
const TokenSocialUruguay = artifacts.require("TokenSocialUruguay");

module.exports = function(deployer){
deployer.deploy(Beneficiarios);
deployer.deploy(Comercios);
deployer.deploy(TokenSocialUruguay);
};