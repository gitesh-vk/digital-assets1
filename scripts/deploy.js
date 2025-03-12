const hre = require("hardhat");

async function main() {
    const DigitalAssetMarketplace = await hre.ethers.getContractFactory("DigitalAssetMarketplace");
    
    console.log("Deploying DigitalAssetMarketplace...");
    const marketplace = await DigitalAssetMarketplace.deploy(); // Deploy contract

    await marketplace.waitForDeployment(); // ✅ Corrected deployment handling

    console.log("DigitalAssetMarketplace deployed to:", await marketplace.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
