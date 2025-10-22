const express = require('express');
const router = express.Router();
const { getContract } = require('../../config/blockchain');
const CONTRACT_ABI = require('../../config/abi.json');

router.post('/analyze', async (req, res) => {
  try {
    const { videoId } = req.body;
    const contract = getContract(process.env.CONTRACT_ADDRESS, CONTRACT_ABI);
    
    const tx = await contract.requestAnalysis(videoId);
    await tx.wait();

    res.json({ 
      status: 'success',
      message: 'Analysis requested',
      txHash: tx.hash 
    });
  } catch (error) {
    console.error('Base Contract Error:', error);
    res.status(500).json({ error: 'Failed to request analysis' });
  }
});

router.get('/result/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    const contract = getContract(process.env.CONTRACT_ADDRESS, CONTRACT_ABI);
    
    const result = await contract.getAnalysis(videoId);
    
    res.json({
      metadata: result.metadata,
      score: result.score.toNumber(),
      exists: result.exists
    });
  } catch (error) {
    console.error('Base Contract Error:', error);
    res.status(500).json({ error: 'Failed to fetch analysis' });
  }
});

module.exports = router;