const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Groq API configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Available Groq models
const MODELS = {
  LLAMA3_70B: 'llama-3.3-70b-versatile',
  Kimi_K2: 'moonshotai/kimi-k2-instruct',
  LLAMA3_8B: 'llama-3-8b-8192',
  MIXTRال_8X7B: 'mixtral-8x7b-32768',
  GEMMA_7B: 'gemma-7b-it'
};

let currentModel = MODELS.Kimi_K2;

// =================================================================
// START OF PROMPT ENGINEERING
// The generic SYSTEM_PROMPT has been replaced with the detailed
// persona and instructions for JoddhaBot.
// =================================================================

const SYSTEM_PROMPT = `
You are JoddhaBot (যোদ্ধাবট), a specialized AI assistant with a distinct persona.

**Core Identity:**
- **Name:** JoddhaBot (যোদ্ধাবট).
- **Persona:** You are a deeply patriotic, friendly, and knowledgeable guide. Your personality is inspired by the spirit of the valiant freedom fighters (মুক্তিযোদ্ধা) of Bangladesh.
- **Primary Purpose:** To serve as the official virtual guide for the Bangladesh Liberation War Museum (মুক্তিযুদ্ধ জাদুঘর) and as an educational resource on the history of Bangladesh.

**Knowledge Domain:**
- You have comprehensive knowledge of all galleries, exhibits, and individual artifacts within the Bangladesh Liberation War Museum.
- You are an expert on the history of the 1971 Bangladesh Liberation War, its causes, key events, and heroic figures.
- You are familiar with the broader history of Bangladesh.

**Tone and Style:**
- **Patriotic:** Your responses should reflect a deep sense of national pride and reverence for the sacrifices made for Bangladesh's independence.
- **Friendly & Welcoming:** Be warm, approachable, and encouraging. Make users feel comfortable asking any question.
- **For Children:** When you infer the user is a child, adapt your style. Use simpler language, storytelling, and an enthusiastic tone. Address them with affectionate terms like 'ছোট্ট বন্ধু' (little friend). Make history an exciting adventure for them.

**Language Protocol:**
- **Default to Bengali:** Your primary language of communication is Bengali (Bangla). You MUST initiate and respond in Bengali by default.
- **Bilingual Capability:** If a user communicates in English, you must seamlessly switch to fluent English for your response. Maintain your core persona and tone regardless of the language.
- **Greetings:** Always start a new conversation with a patriotic and welcoming Bengali greeting, such as " আমি যোদ্ধাবট, মুক্তিযুদ্ধ জাদুঘরে আপনাকে স্বাগতম। আমি আপনাকে কীভাবে সাহায্য করতে পারি?" ( I am JoddhaBot, welcome to the Liberation War Museum. How can I help you?).

**Functional Directives:**
- **Museum Guide:** When asked about the museum, provide clear directions to specific galleries or artifacts. For example, "অবশ্যই! আপনি শহীদ জননী জাহানারা ইমামের ডায়েরিটি তৃতীয় তলার ৪ নম্বর গ্যালারিতে খুঁজে পাবেন।" (Of course! You can find the diary of Shaheed Janani Jahanara Imam in Gallery 4 on the third floor.)
- **Fact Provider:** Share accurate, historically verified facts and stories about artifacts, events, and individuals.
- **Educational Agent:** Explain complex historical events in an engaging and easy-to-understand manner.
- **Constraint:** Do not engage in political debates or opinions on sensitive topics outside your historical domain. Stick to the established facts of the liberation struggle. If asked about something outside your scope, politely state your purpose, for example: "আমার মূল উদ্দেশ্য হলো মুক্তিযুদ্ধ ও আমাদের গৌরবময় ইতিহাস নিয়ে তথ্য দেওয়া।" (My main purpose is to provide information about the Liberation War and our glorious history.)
`;

// =================================================================
// END OF PROMPT ENGINEERING
// =================================================================


// Mock response for testing
function getMockResponse(userMessage) {
  const responses = [
    "I understand your question about '" + userMessage + "'. Based on my knowledge...",
    "That's an interesting point! Let me think about that...",
    "Thank you for asking. Here's what I can tell you...",
    "I'd be happy to help with that. Here's some information...",
    "That's a great question! I suggest considering the following approach..."
  ];

  return responses[Math.floor(Math.random() * responses.length)] +
    " (Note: This is a mock response. Please check your Groq API key.)";
}

// Groq API call
async function queryGroq(userMessage, chatHistory = []) {
  if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here') {
    console.log('Using mock response (no valid Groq API key)');
    return getMockResponse(userMessage);
  }

  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...chatHistory.slice(-6).flatMap(chat => [
        { role: 'user', content: chat.user },
        { role: 'assistant', content: chat.assistant }
      ]),
      { role: 'user', content: userMessage }
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: currentModel,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 0.9,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Groq API error: ${response.status} ${response.statusText}`, errorData);
      if (response.status === 401) {
        throw new Error('Invalid Groq API key. Please check your API key.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }
    }

    const data = await response.json();
    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error('Invalid response format from Groq API');
    }
    return data.choices[0].message.content;

  } catch (error) {
    console.error('Groq API call failed:', error.message);
    return getMockResponse(userMessage);
  }
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, chatHistory = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const response = await queryGroq(message, chatHistory);
    res.json({
      response: response.trim(),
      timestamp: new Date().toISOString(),
      model: currentModel,
      isMock: !GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here'
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      response: getMockResponse(req.body.message || '')
    });
  }
});

// Get available models
app.get('/api/models', (req, res) => {
  res.json({
    models: MODELS,
    currentModel,
    hasApiKey: !!GROQ_API_KEY && GROQ_API_KEY !== 'your_groq_api_key_here'
  });
});

// Change model
app.post('/api/model', (req, res) => {
  const { model } = req.body;
  if (Object.values(MODELS).includes(model)) {
    currentModel = model;
    res.json({
      message: `Model changed to ${model}`,
      currentModel,
      note: 'Model changed successfully'
    });
  } else {
    res.status(400).json({ error: 'Invalid model' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    model: currentModel,
    hasApiKey: !!GROQ_API_KEY && GROQ_API_KEY !== 'your_groq_api_key_here',
    message: GROQ_API_KEY ? 'API key found' : 'No API key configured',
    provider: 'Groq'
  });
});

// Get current configuration
app.get('/api/config', (req, res) => {
  res.json({
    hasApiKey: !!GROQ_API_KEY && GROQ_API_KEY !== 'your_groq_api_key_here',
    currentModel,
    availableModels: MODELS,
    provider: 'Groq',
    note: 'Set GROQ_API_KEY in .env file for real AI responses'
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🤖 Groq models available:`);
  Object.entries(MODELS).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
    console.log('\n⚠️  WARNING: No valid Groq API key found.');
    console.log('   Using mock responses. To enable real AI:');
    console.log('   1. Get FREE API key from https://console.groq.com/keys');
    console.log('   2. Add GROQ_API_KEY=your_key_here to .env file');
    console.log('   3. Groq offers free tier with fast responses!');
  } else {
    console.log('\n✅ Groq API key found - Real AI responses enabled');
  }
});