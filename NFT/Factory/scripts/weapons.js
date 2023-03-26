
const factory = artifacts.require("NFTCollectionFactory");
const weapons = artifacts.require("Weapons");

module.exports = async (deployer, network) => {

    const accounts = await web3.eth.getAccounts();

    const test = await deployer.dploy(factory);
    const factoryInstance = await test.deployed();

    // const address = await factoryInstance.createNFTCollection("Test", "T", { from: accounts[0] });

    // console.log(address);
    console.log(accounts[0]);
};
