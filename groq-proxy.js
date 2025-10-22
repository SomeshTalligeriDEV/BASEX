/**
 * Simple proxy that accepts OpenAI-style POST requests and forwards them to a GROQ provider.
 *
 * Usage:
 * GROQ_PROVIDER_URL=https://api.groq.example.com/v1/infer GROQ_API_KEY=xxx node groq-proxy.js
 *
 * The proxy listens on port 4567 by default and logs incoming requests and provider responses.
 */

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '1mb' }));

const PORT = process.env.GROQ_PROXY_PORT || 4567;
const PROVIDER_URL = process.env.GROQ_PROVIDER_URL;
const PROVIDER_KEY = process.env.GROQ_API_KEY;

if (!PROVIDER_URL || !PROVIDER_KEY) {
  console.warn('Warning: GROQ_PROVIDER_URL and GROQ_API_KEY are not set. Proxy will still start but forwarding will fail until configured.');
}

app.post('/v1/chat/completions', async (req, res) => {
  console.log('\n[PROXY] Incoming request to /v1/chat/completions');
  console.log('[PROXY] Headers:', Object.keys(req.headers).reduce((acc, k) => {
    acc[k] = req.headers[k];
    return acc;
  }, {}));
  console.log('[PROXY] Body:', JSON.stringify(req.body).slice(0, 1000));

  try {
    const response = await axios.post(PROVIDER_URL, req.body, {
      headers: {
        'Authorization': `Bearer ${PROVIDER_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    console.log('[PROXY] Provider response status:', response.status);
    // Forward the raw provider response back to the caller
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('[PROXY] Forward error:', error.message);
    if (error.response) {
      console.error('[PROXY] Provider response data:', error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Proxy failed to forward request', message: error.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`GROQ proxy listening on http://localhost:${PORT}`);
  console.log('Forwarding to:', PROVIDER_URL || '<not configured>');
});
