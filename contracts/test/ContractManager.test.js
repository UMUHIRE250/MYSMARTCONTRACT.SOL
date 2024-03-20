// test/ContractManager.test.js
const { expect } = require("chai");

describe("ContractManager", function () {
  it("Should set fine amount", async function () {
    const ContractManager = await ethers.getContractFactory("ContractManager");
    const contractManager = await ContractManager.deploy(100); // Set an initial fine amount

    await contractManager.deployed();
    expect(await contractManager.fineAmount()).to.equal(100);

    await contractManager.setFineAmount(200);
    expect(await contractManager.fineAmount()).to.equal(200);
  });

  it("Should create subcontract and pay fine", async function () {
    const ContractManager = await ethers.getContractFactory("ContractManager");
    const contractManager = await ContractManager.deploy(100);

    await contractManager.deployed();

    const subcontractAddress = await contractManager.createSubcontract();
    const subcontract = await ethers.getContractAt("Subcontract", subcontractAddress);

    // Attempt to pay the fine (it should fail due to insufficient funds)
    await expect(subcontract.payFine({ value: 50 })).to.be.revertedWith("Insufficient funds to pay the fine");

    // Successfully pay the fine
    await subcontract.payFine({ value: 200 });
  });
});
