# BaseX - AI-Powered YouTube Content Analysis Platform

BaseX is a decentralized platform built on Base that leverages AI to analyze YouTube content and predi## 📋 Deployed Contract Addresses

### Ethereum Sepolia
- Address: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- Verify: https://sepolia.etherscan.io/address/0x5FbDB2315678afecb367f032d93F642f64180aa3
- Verification Command:
  ```bash
  npx hardhat verify --network sepolia 0x5FbDB2315678afecb367f032d93F642f64180aa3
  ```

### Base Sepolia
- Address: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
- Verify: https://sepolia.basescan.org/address/0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
- Verification Command:
  ```bash
  npx hardhat verify --network base-sepolia 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
  ```

## 🌐 Environment Variables

Create a `.env` file with the following:viral potential. The platform combines blockchain technology with machine learning to provide transparent and reliable content analysis.

## 🌟 Features

- 🎥 YouTube Video Analysis
- 🤖 AI-Powered Predictions
- ⛓️ Blockchain-Based Storage
- 📊 Real-time Analytics
- 🔄 Multi-Chain Support
- 🎯 Viral Potential Scoring

## 🏗️ Tech Stack

### Frontend
- **Framework**: React.js
- **Styling**: 
  - TailwindCSS
  - Custom CSS with animations
  - Material-UI components
- **Web3 Integration**:
  - Web3Modal
  - Ethers.js
  - MetaMask connectivity
- **State Management**:
  - React Hooks
  - Context API

### Backend
- **Server**: Node.js with Express
- **Oracle Service**: 
  - Custom implementation for YouTube data fetching
  - Real-time data processing
- **APIs**:
  - YouTube Data API
  - Base Chain RPC
  - Neynar API for notifications

### Smart Contracts
- **Language**: Solidity
- **Network**: Base Testnet (Sepolia)
- **Features**:
  - Analysis Request/Response
  - Decentralized Storage
  - Multi-chain Oracle Support

### Storage
- **Cache**: Redis (KV Store)
- **Permanent Storage**: Base Blockchain
- **Data Format**: JSON

### DevOps
- **Version Control**: Git
- **Package Manager**: npm/yarn
- **Testing**: Jest
- **Smart Contract Testing**: Hardhat

## 📁 Project Structure

\`\`\`
KamiBase Prophet/
├── frontend/                   # Frontend application
│   └── oracle-view/
│       ├── public/            # Static assets
│       └── src/
│           ├── components/    # React components
│           ├── assets/        # Images and static files
│           ├── styles/        # CSS modules
│           └── utils/         # Helper functions
├── backend/                   # Backend services
│   ├── oracle-service/       # YouTube data oracle
│   ├── api/                  # REST API endpoints
│   └── config/               # Configuration files
├── contracts/                # Smart contracts
│   ├── BaseXView.sol        # Main contract
│   ├── BaseXViewCaller.sol  # Oracle caller
│   └── BaseXViewRouter.sol  # Router contract
└── scripts/                  # Deployment scripts
\`\`\`

## 🔗 Base Integration

BaseX leverages Base's infrastructure in several ways:

1. **Smart Contract Deployment**
   - Main contracts deployed on Base Sepolia
   - Optimized for Base's EVM environment

2. **Oracle Integration**
   - Custom oracle service for YouTube data
   - Secure data transmission to Base contracts

3. **Transaction Management**
   - Efficient gas optimization
   - Quick transaction confirmations

4. **Storage Solution**
   - Decentralized storage on Base
   - Permanent record of predictions

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn
- MetaMask wallet
- Base Sepolia testnet connection

### Installation

1. Clone the repository:
\`\`\`bash
git clone [repository-url]
\`\`\`

2. Install frontend dependencies:
\`\`\`bash
cd frontend/oracle-view
npm install
\`\`\`

3. Install backend dependencies:
\`\`\`bash
cd ../../backend
npm install
\`\`\`

4. Set up environment variables:
\`\`\`bash
cp .env.example .env
# Edit .env with your configurations
\`\`\`

5. Start the development server:
\`\`\`bash
# Frontend
cd frontend/oracle-view
npm start

# Backend
cd ../../backend
npm run dev
\`\`\`

### Smart Contract Deployment

1. Configure Hardhat:
\`\`\`bash
cd contracts
npm install
\`\`\`

2. Deploy contracts:
\`\`\`bash
npx hardhat run scripts/deploy.js --network base-sepolia
\`\`\`

### 🚀 Latest Deployment Logs

```bash
🔄 Deploying to Sepolia...

📡 Deploying to sepolia...
✅ Deployed to sepolia at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
🔍 Verify contract at: https://sepolia.etherscan.io/address/0x5FbDB2315678afecb367f032d93F642f64180aa3
🛠  Run: npx hardhat verify --network sepolia 0x5FbDB2315678afecb367f032d93F642f64180aa3

🔄 Deploying to Base Sepolia...

📡 Deploying to base-sepolia...
✅ Deployed to base-sepolia at: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
🔍 Verify contract at: https://sepolia.basescan.org/address/0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
🛠  Run: npx hardhat verify --network base-sepolia 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

📊 Deployment Summary
==================
sepolia: 0x5FbDB2315678afecb367f032d93F642f64180aa3
base-sepolia: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

## 🌐 Environment Variables

Create a \`.env\` file with the following:

\`\`\`env
# API Keys
YOUTUBE_API_KEY=your_youtube_api_key
NEYNAR_API_KEY=your_neynar_api_key

# Blockchain
BASE_RPC_URL=your_base_rpc_url
PRIVATE_KEY=your_private_key

# Redis
REDIS_URL=your_redis_url

# Server
PORT=3000
NODE_ENV=development
\`\`\`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Future Enhancements

- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Machine learning model improvements
- [ ] Cross-chain integration
- [ ] Mobile app development

## 🤝 Support

For support, email [support@basex.com](mailto:support@basex.com) or join our Discord server.


