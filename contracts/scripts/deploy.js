import hre from "hardhat";

async function main() {
  console.log("Network:", hre.network.name);

  // Deploy OracleView
  const BaseXOracle = await hre.ethers.getContractFactory("BaseXOracle");
  const oracleView = await BaseXOracle.deploy();
  await oracleView.waitForDeployment();
  const oracleAddress = await oracleView.getAddress();
  console.log("BaseXOracle deployed at:", oracleAddress);

  // Deploy OracleViewCaller with OracleView address
  const OracleViewCaller = await hre.ethers.getContractFactory("OracleViewCaller");
  const caller = await OracleViewCaller.deploy(oracleAddress);
  await caller.waitForDeployment();
  const callerAddress = await caller.getAddress();
  console.log("OracleViewCaller deployed at:", callerAddress);

  // Output JSON for downstream tooling if needed
  console.log(JSON.stringify({ oracleAddress, callerAddress }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
