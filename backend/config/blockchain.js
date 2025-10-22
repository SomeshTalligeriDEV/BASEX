const { ethers } = require('ethers');

const getProvider = () => {
  return new ethers.providers.JsonRpcProvider(process.env.BASE_RPC_URL);
};

const getSigner = () => {
  const provider = getProvider();
  return new ethers.Wallet(process.env.PRIVATE_KEY, provider);
};

const getContract = (address, abi) => {
  const signer = getSigner();
  return new ethers.Contract(address, abi, signer);
};

module.exports = {
  getProvider,
  getSigner,
  getContract
};