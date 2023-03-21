const DeFiProject = artifacts.require("DeFiProject");

module.exports = async (deployer, network, accounts) => {

    // truffle migrate -f 2 --reset --network goerli

    // ** Deployment with existing dai (goerli) **
    await deployer.deploy(DeFiProject, '0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60');

    // Get the deployed contract address after deployment
    // 0x701d82551ca4482ec90270e4D8C44EBCd5bd60E8

    // Go on Metamask
    // Send dai to the deployed contract

    // Open the truffle console on goerli
    // truffle console --network goerli

    // Get instance of the contract
    // const instance = await DeFiProject.deployed();

    // Use the DeFi project to send Dai to another account of metamask for example
    // await instance.transfert('0xF140e51f1c87a2B9715Dc98AD75B2c2Cda8C7Ae9', 5000);

    // Import jeton on the second account on Metamask and check the amount

    /*******************/



};
