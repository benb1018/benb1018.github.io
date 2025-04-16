export async function handler(event, context) {
  const { message } = JSON.parse(event.body);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a financial planning assistant. Ask the user questions to understand their retirement goals and offer helpful insights."
        },
        { role: "user", content: message }
      ]
    }),
  });

  const data = await response.json();

  const reply = data?.choices?.[0]?.message?.content || "Sorry, I couldn't understand the response.";

  return {
    statusCode: 200,
    body: JSON.stringify({ reply }),
  };
}
