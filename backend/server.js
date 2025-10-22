const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { setupRedis } = require('./config/redis');
const youtubeRoutes = require('./api/routes/youtube');
const oracleRoutes = require('./api/routes/oracle');
const baseRoutes = require('./api/routes/base');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/youtube', youtubeRoutes);
app.use('/api/oracle', oracleRoutes);
app.use('/api/base', baseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: 'Something went wrong!'
  });
});

// Initialize Redis
setupRedis();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});