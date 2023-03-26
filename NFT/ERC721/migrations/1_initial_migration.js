const Migrations = artifacts.require("Migrations");
const Weapons = artifacts.require("Weapons");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Weapons);
};
