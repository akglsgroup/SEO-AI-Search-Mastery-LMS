import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini SDK with custom user-agent and key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes FIRST
app.post("/api/chat", async (req, res) => {
  try {
    const { message, category, history } = req.body;
    
    // Build context prompt
    const systemInstruction = `You are Amrish, a high-authority SEO, GEO, AEO, and AI search ranking expert, and mentor for digital marketers, founders, developers, and career transitioners.
You run AskAmrish.com, a leading optimization and learning ecosystem.
Your tone is incredibly helpful, highly practical, professional, and structured. Use concrete bullet points, clear actionable takeaways, and a friendly, encouraging personality.
The user is asking a question related to: ${category || "General Advice"}.
Respond thoroughly but concisely, giving 3-4 specific steps or insights. Focus on modern 2026 search trends (like Google Search Generative Experience, ChatGPT search, Perplexity citations, Gemini search grounding, schema optimization, and entity mapping). At the end, warmly suggest that if they need personalized deep strategy, they can book a 1-on-1 Consultation Session or connect with the AskAmrish public Q&A community.`;

    const chatHistory = history ? history.map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }]
    })) : [];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...chatHistory,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response from Amrish" });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
