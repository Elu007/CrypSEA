import axios from 'axios';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;

const CRYPTO_SYSTEM_PROMPT = {
  role: 'system',
  content: `
    You are CrypSea’s AI Assistant. You only answer questions about cryptocurrency:
    prices, market caps, chains, wallets, trading strategies, tokenomics, etc.
    If a user asks anything outside of crypto, you must politely reply:
    “Sorry, I’m here to answer only cryptocurrency-related questions.”
  `.trim()
};

export async function askBot(userMessages) {
  const messages = [CRYPTO_SYSTEM_PROMPT, ...userMessages];

  const payload = {
    model: 'gpt-3.5-turbo',
    messages
  };

  const response = await axios.post(
    OPENROUTER_URL,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      }
    }
  );

  return response.data.choices[0].message.content;
}
