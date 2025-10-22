const express = require('express');
const router = express.Router();
const { getRedisClient } = require('../../config/redis');
const { getContract } = require('../../config/blockchain');
const CONTRACT_ABI = require('../../config/abi.json');

async function analyzeVideo(videoData) {
  // This is where you'd implement your AI analysis logic
  // For now, we'll use a simple scoring system
  const {
    viewCount,
    likeCount,
    commentCount
  } = videoData.statistics;

  const engagement = (parseInt(likeCount) + parseInt(commentCount)) / parseInt(viewCount);
  const score = Math.min(Math.floor(engagement * 1000), 100);

  return {
    score,
    metadata: 'engagement,trending,viral'
  };
}

router.post('/submit/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    const redis = getRedisClient();
    
    // Get video data from cache
    const videoData = await redis.get(`video:${videoId}`);
    if (!videoData) {
      return res.status(404).json({ error: 'Video data not found' });
    }

    // Analyze the video
    const analysis = await analyzeVideo(JSON.parse(videoData));

    // Submit to blockchain
    const contract = getContract(process.env.CONTRACT_ADDRESS, CONTRACT_ABI);
    const tx = await contract.submitAnalysis(
      videoId,
      analysis.metadata,
      analysis.score
    );
    await tx.wait();

    res.json({
      status: 'success',
      message: 'Analysis submitted',
      txHash: tx.hash,
      ...analysis
    });
  } catch (error) {
    console.error('Oracle Error:', error);
    res.status(500).json({ error: 'Failed to submit analysis' });
  }
});

module.exports = router;