// Load .env only during local development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const fetch = require('node-fetch');

const apiKey = process.env.CLAUDE_API_KEY;

exports.handler = async function(event, context) {
  const { message } = JSON.parse(event.body || '{}');

  const url = 'https://api.anthropic.com/v1/messages';

  const headers = {
    "x-api-key": apiKey,
    "content-type": "application/json",
    "anthropic-version": "2023-06-01"
  };

  const body = {
    model: "claude-3-opus-20240229",
    max_tokens: 1000,
    messages: [
      { role: "user", content: message || "Hello Claude!" }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error("Error calling Claude API:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
