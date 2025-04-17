// Load environment variables (for local development)
if (typeof process !== "undefined" && process.env) {
  require('dotenv').config();
}

const apiKey = process.env.CLAUDE_API_KEY;

async function askClaude(userMessage) {
  const url = 'https://api.anthropic.com/v1/messages';

  const headers = {
    "x-api-key": apiKey,
    "content-type": "application/json",
    "anthropic-version": "2023-06-01"
  };

  const body = {
    model: "claude-3-opus-20240229", // or haiku/sonnet if you prefer
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

    if (!res.ok) {
      throw new Error(`Claude API error: ${JSON.stringify(data)}`);
    }

    console.log("Claude's reply:", data);
    return data;
  } catch (err) {
    console.error("Error calling Claude API:", err.message);
  }
}

// Example usage (for dev testing)
askClaude("What is the future of AI in wealth management?");
