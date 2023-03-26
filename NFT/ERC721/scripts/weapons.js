
const Weapons = artifacts.require("Weapons");

module.exports = async (deployer, network) => {

    const accounts = await web3.eth.getAccounts();
    const tokenURI = "https://gateway.pinata.cloud/ipfs/QmaYXNwqJSbJ8de65ncqo2z8hZBJA7XPZiS4bnscNdD1EP/1.json";

    const weaponsInstance = await Weapons.deployed();

    await weaponsInstance.MintWeapon(accounts[0], tokenURI, 5, 1, { from: accounts[0] });

    console.log(accounts[0]);
};
