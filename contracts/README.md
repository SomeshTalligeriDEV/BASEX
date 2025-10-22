# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

## Deploy BaseXOracle

To deploy the BaseXOracle contract to both Sepolia and Base Sepolia networks:

1. Set up environment variables in `.env`:
```shell
PRIVATE_KEY=your_wallet_private_key
SEPOLIA_RPC_URL=your_sepolia_rpc_url
BASE_RPC_URL=your_base_sepolia_rpc_url
```

2. Run the deployment script:
```shell
npx hardhat run scripts/deploy-oracle.js
```

The script will:
- Deploy to Sepolia testnet
- Deploy to Base Sepolia testnet
- Print the deployed contract addresses
- Provide verification URLs
