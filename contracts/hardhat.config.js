import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Load .env from contracts/ (current dir)
dotenv.config();
// Also try to load from repo root if exists
const rootEnvPath = path.resolve(process.cwd(), "..", ".env");
if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
}

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const BASE_RPC_URL = process.env.BASE_RPC_URL || process.env.BASEX_RPC_URL;

/** @type import('hardhat/config').HardhatUserConfig */
const networks = {};
if (SEPOLIA_RPC_URL) {
  networks.sepolia = {
    url: SEPOLIA_RPC_URL,
    accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    chainId: 11155111,
  };
}
if (BASE_RPC_URL) {
  networks["base-sepolia"] = {
    url: BASE_RPC_URL,
    accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    chainId: 84531,
    verify: {
      etherscan: {
        apiUrl: "https://api-sepolia.basescan.org",
      },
    },
  };
}

const config = {
  solidity: "0.8.27",
  networks,
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY,
      "base-sepolia": process.env.BASESCAN_API_KEY,
    },
  },
};

export default config;
