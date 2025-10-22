/**
 * Simple test client that sends an OpenAI-style request to the proxy.
 *
 * Usage:
 * node groq-proxy-test.js
 */

const axios = require('axios');

async function runTest() {
  try {
    const resp = await axios.post('http://localhost:4567/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Test proxy' },
        { role: 'user', content: 'Hello from test client' }
      ],
      temperature: 0.5
    }, { timeout: 20000 });

    console.log('Proxy test response status:', resp.status);
    console.log('Response data:', resp.data);
  } catch (err) {
    if (err.response) {
      console.error('Proxy test received error response:', err.response.status, err.response.data);
    } else {
      console.error('Proxy test error:', err.message);
    }
  }
}

runTest();
