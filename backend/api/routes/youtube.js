const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const { getRedisClient } = require('../../config/redis');

// Initialize YouTube API
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

// Get video details
router.get('/video/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    const redis = getRedisClient();

    // Check cache first
    const cached = await redis.get(`video:${videoId}`);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    // Fetch from YouTube API
    const response = await youtube.videos.list({
      part: 'snippet,statistics',
      id: videoId
    });

    const videoData = response.data.items[0];
    
    // Cache the result
    await redis.setEx(`video:${videoId}`, 3600, JSON.stringify(videoData));

    res.json(videoData);
  } catch (error) {
    console.error('YouTube API Error:', error);
    res.status(500).json({ error: 'Failed to fetch video data' });
  }
});

module.exports = router;