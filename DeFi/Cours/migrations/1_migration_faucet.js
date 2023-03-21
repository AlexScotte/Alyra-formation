const Dai = artifacts.require("Dai");
const DeFiProject = artifacts.require("DeFiProject");

module.exports = async (deployer, network, accounts) => {

  // truffle migrate -f 1 --reset


  // ** Deployment with faucet dai **

  await deployer.deploy(Dai);
  const dai = await Dai.deployed();

  await deployer.deploy(DeFiProject, dai.address);
  const deFiProject = await DeFiProject.deployed();

  // Mint 100 token and send to defi project
  await dai.faucet(deFiProject.address, 100);
  const balance00 = await dai.balanceOf(deFiProject.address);
  console.log(balance00.toString());

  // Send tokens to personnal account
  await deFiProject.transfert(accounts[1], 100);

  const balance0 = await dai.balanceOf(deFiProject.address);
  const balance1 = await dai.balanceOf(accounts[1]);

  console.log(balance0.toString());
  console.log(balance1.toString());

  /****************/
};
