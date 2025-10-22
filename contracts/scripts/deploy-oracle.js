import hre from "hardhat";
const { ethers } = hre;

async function deployToNetwork(networkName) {
  try {
    console.log(`\n📡 Deploying to ${networkName}...`);

    // Deploy the contract
    const BaseXOracle = await ethers.getContractFactory("BaseXOracle");
    const oracle = await BaseXOracle.deploy();
    await oracle.waitForDeployment();
    
    const address = await oracle.getAddress();
    console.log(`✅ Deployed to ${networkName} at:`, address);

    // Print verification instructions
    const verifyUrl = networkName === "sepolia" 
      ? "https://sepolia.etherscan.io/address/" 
      : "https://sepolia.basescan.org/address/";
    console.log(`🔍 Verify contract at: ${verifyUrl}${address}`);
    console.log(`🛠  Run: npx hardhat verify --network ${networkName} ${address}`);
    
    return { network: networkName, address };
  } catch (error) {
    console.error(`❌ Failed to deploy to ${networkName}:`, error.message);
    return { network: networkName, address: null };
  }
}

async function main() {
  console.log("🚀 Deploying BaseXOracle to multiple networks...");

  // Check environment variables
  const requiredEnvVars = {
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    SEPOLIA_RPC_URL: process.env.SEPOLIA_RPC_URL,
    BASE_RPC_URL: process.env.BASE_RPC_URL
  };

  for (const [name, value] of Object.entries(requiredEnvVars)) {
    if (!value) {
      throw new Error(`Missing ${name} in environment. Add it to your .env file`);
    }
  }

  // Validate private key format
  const privateKey = requiredEnvVars.PRIVATE_KEY.startsWith('0x') 
    ? requiredEnvVars.PRIVATE_KEY.slice(2) 
    : requiredEnvVars.PRIVATE_KEY;
    
  if (privateKey.length !== 64) {
    throw new Error("Invalid PRIVATE_KEY format. Private key must be 64 characters (32 bytes) without '0x' prefix");
  }

  // Deploy to networks sequentially to avoid nonce issues
  console.log("\n🔄 Deploying to Sepolia...");
  const sepoliaDeployment = await deployToNetwork("sepolia");
  
  console.log("\n🔄 Deploying to Base Sepolia...");
  const baseDeployment = await deployToNetwork("base-sepolia");

  // Print deployment summary
  console.log("\n📊 Deployment Summary");
  console.log("==================");
  [sepoliaDeployment, baseDeployment].forEach(({ network, address }) => {
    console.log(`${network}: ${address || "Failed"}`);
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:", error.message);
    process.exit(1);
  });