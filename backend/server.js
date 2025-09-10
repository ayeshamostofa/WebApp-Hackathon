const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Hugging Face API configuration
const HF_API_KEY = process.env.HF_API_KEY;
const HF_API_URL = 'https://api-inference.huggingface.models/models/';

// Available models (you can change these)
const MODELS = {
  LLAMA: 'meta-llama/Llama-2-7b-chat-hf',
  MISTRAL: 'mistralai/Mistral-7B-Instruct-v0.1',
  ZEPHYR: 'HuggingFaceH4/zephyr-7b-beta'
};

// Current model
let currentModel = MODELS.ZEPHYR;

// Enhanced prompt engineering
function createPrompt(userMessage, chatHistory = []) {
  const systemPrompt = `You are a helpful, respectful, and honest assistant. Always provide accurate and thoughtful responses. Keep your answers concise but informative.`;

  let prompt = `<|system|>\n${systemPrompt}</s>\n`;

  // Add chat history for context
  if (chatHistory.length > 0) {
    chatHistory.slice(-4).forEach((chat) => {
      prompt += `<|user|>\n${chat.user}</s>\n`;
      prompt += `<|assistant|>\n${chat.assistant}</s>\n`;
    });
  }

  prompt += `<|user|>\n${userMessage}</s>\n<|assistant|>\n`;

  return prompt;
}

// Hugging Face API call
async function queryHuggingFace(prompt) {
  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${currentModel}`,
      {
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 512,
            temperature: 0.7,
            top_p: 0.9,
            repetition_penalty: 1.1,
            return_full_text: false
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result[0]?.generated_text || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('Hugging Face API error:', error);
    throw new Error('Failed to get response from AI service');
  }
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, chatHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const prompt = createPrompt(message, chatHistory);
    const response = await queryHuggingFace(prompt);

    res.json({
      response: response.trim(),
      timestamp: new Date().toISOString(),
      model: currentModel
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Get available models
app.get('/api/models', (req, res) => {
  res.json({ models: MODELS, currentModel });
});

// Change model
app.post('/api/model', (req, res) => {
  const { model } = req.body;
  
  if (Object.values(MODELS).includes(model)) {
    currentModel = model;
    res.json({ message: `Model changed to ${model}`, currentModel });
  } else {
    res.status(400).json({ error: 'Invalid model' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    model: currentModel 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Hugging Face models available:`);
  Object.entries(MODELS).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
});