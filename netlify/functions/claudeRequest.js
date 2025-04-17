// Load environment variables (for local dev)
if (typeof process !== "undefined" && process.env) {
  require('dotenv').config();
}

const fetch = require('node-fetch'); // You need this if running locally or testing in Node
const apiKey = process.env.CLAUDE_API_KEY;

exports.handler = async function(event, context) {
  const userMessage = JSON.parse(event.body).message || "Hello Claude";

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
      { role: "user", content: userMessage }
    ]
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
