const Migrations = artifacts.require("Migrations");
const WeaponsSFT = artifacts.require("WeaponsSFT");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(WeaponsSFT);
};
