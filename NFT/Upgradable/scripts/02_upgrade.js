const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const StorageV1 = artifacts.require('StorageV1');

const StorageV2 = artifacts.require('StorageV2');

module.exports = async function (deployer) {

    const existing = await StorageV1.deployed();

    const instance = await upgradeProxy(existing.address, StorageV2, { deployer });

    console.log("Upgraded", instance.address);

};