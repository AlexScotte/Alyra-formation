const Migrations = artifacts.require("Migrations");
const NFTCollectionFactory = artifacts.require("NFTCollectionFactory");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(NFTCollectionFactory);
};
