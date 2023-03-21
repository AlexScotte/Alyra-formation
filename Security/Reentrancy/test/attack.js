const ethers = require('ethers');

describe("Test reentrancy on non secure contract", function () {
    it("", async function () {

        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Attacker");
        const attacker = await Token.deploy();

        attacker.attack({ value: 1 });

        // const ownerBalance = await hardhatToken.balanceOf(owner.address);
        // expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
});