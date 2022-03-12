const { expect, assert } = require("chai");
const { ethers, artifacts } = require("hardhat");

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("TEST...", function() {

    before(async function() {
        [account1, account2, account3, account4, account5] = await ethers.getSigners();
    });

    let nft;

    describe("NFT Test", function() {
        it("Deployment.", async function() {
            const NFT = await ethers.getContractFactory("NFT");
            nft = await NFT.connect(account1).deploy("TEST TOKEN","TEST",ethers.utils.parseEther("10.0"),"https://test.com/");
            assert.equal(await nft.name(),"TEST TOKEN");
            assert.equal(await nft.symbol(),"TEST");
        });
        it("Not for Sale", async function(){
            await expect(nft.connect(account2).buy({value:ethers.utils.parseEther("10.0")}))
                .to.be.revertedWith("now not on sale.");
        });
        it("Buy token.", async function() {
            await nft.connect(account1).controlTokenSale(true);
            await nft.connect(account2).buy({value:ethers.utils.parseEther("10.0")});
            assert.equal(await nft.balanceOf(account2.address),1);
            assert.equal(await nft.ownerOf(0),account2.address);
            assert.equal(await nft.tokenURI(0),"https://test.com/0");
        });
    
    })
});