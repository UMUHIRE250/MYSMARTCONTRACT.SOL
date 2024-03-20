// scripts/deploy.js
async function main() {
    const ContractManager = await ethers.getContractFactory("ContractManager");
    const contractManager = await ContractManager.deploy(100); // Set an initial fine amount
  
    await contractManager.deployed();
  
    console.log("ContractManager deployed to:", contractManager.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  