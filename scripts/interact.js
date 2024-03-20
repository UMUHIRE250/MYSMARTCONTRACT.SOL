
async function main() {
    const ContractManager = await ethers.getContractFactory("ContractManager");
    const contractManager = await ContractManager.attach("<deployed_contract_address>");
  
    const fineAmount = await contractManager.fineAmount();
    console.log("Current fine amount:", fineAmount);
  
   
    await contractManager.setFineAmount(150);
    console.log("New fine amount set.");
  
    const subcontractAddress = await contractManager.createSubcontract();
    console.log("Subcontract created at:", subcontractAddress);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  