import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// In-memory data store for live simulation
let attendanceRecords: { [dateStr: string]: { status: string; punchTime: string } } = {
  '2026-10-01': { status: 'present', punchTime: '08:30 AM' },
  '2026-10-02': { status: 'present', punchTime: '09:15 AM' },
};

let liveChatMessages = [
  { id: '1', user: 'Rohan Sharma', avatar: '👨‍💻', time: '10:02 AM', message: 'Sir, what is the time complexity of QuickSort in worst case?', type: 'doubt' },
  { id: '2', user: 'Mayank Sir', avatar: '👨‍🏫', isTeacher: true, time: '10:05 AM', message: 'In worst case when array is already sorted, it is O(N^2). We avoid it using randomized pivots!', type: 'teacher' },
];

// --- 1. CodeGuru AI Doubt Solver ---
app.post('/api/ai/doubt', async (req: Request, res: Response) => {
  try {
    const { question, codeSnippet, language, context } = req.body;
    if (!question) return res.status(400).json({ error: 'Question is required' });

    if (aiClient) {
      const prompt = `You are "CodeGuru AI", the senior coding educator on Mayank Sir's platform ("Learn With Mayank").
Question: "${question}"
${codeSnippet ? `Student's Code (${language || 'programming'}):\n\`\`\`${language || ''}\n${codeSnippet}\n\`\`\`` : ''}
Provide a world-class, encouraging breakdown with concept explanation, optimal code snippet, Big-O complexity, and interview tips.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { temperature: 0.3 },
      });
      return res.json({ reply: response.text, source: 'gemini-3.8-flash' });
    }

    return res.json({
      reply: `### 🎯 Mayank Sir's CodeGuru Solution\n\n**Concept Breakdown:**\nGreat question regarding: **${question}**!\n\n**Key Takeaway:** Ensure boundary edge cases are guarded and maintain an optimal O(N) or O(N log N) runtime.\n\nKeep your streak alive! 🔥`,
      source: 'offline-smart-tutor',
    });
  } catch (error: any) {
    return res.json({
      reply: `### 🎯 CodeGuru Recommendation\nVerify time complexity targets and test edge cases. Keep your streak glowing! 🔥`,
      source: 'offline-smart-tutor',
    });
  }
});

// --- 2. SAATHI (साथी) Mental Wellness & Motivation ---
app.post('/api/ai/saathi', async (req: Request, res: Response) => {
  try {
    const { message, mood } = req.body;
    if (aiClient) {
      const prompt = `You are "SAATHI" (साथी), the empathetic personal mentor and wellness coach on Learn With Mayank platform.
Student's input: "${message}". Current mood: ${mood || 'Not specified'}.
Provide compassionate, grounded guidance to overcome distraction, fear of failure, or burnout. Suggest a practical 5-minute action.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { temperature: 0.7 },
      });
      return res.json({ reply: response.text, source: 'gemini-3.8-flash' });
    }

    return res.json({
      reply: `Dost, take a deep breath right now. Inhale for 4 seconds, hold, and let it out softly. 🌿\n\nYou are not behind. You are building your future brick by brick. Mayank Sir and I are right here with you! 💙`,
      source: 'offline-saathi-mentor',
    });
  } catch (error: any) {
    return res.json({
      reply: `Dost, take a slow breath. Commit to 25 minutes of deep focus with our Saathi Water Bubble Pomodoro. 💙`,
      source: 'offline-saathi-mentor',
    });
  }
});

// --- 3. Real Server-Side Python 3 Sandbox Execution ---
app.post('/api/run/python', async (req: Request, res: Response) => {
  const { code } = req.body;
  if (typeof code !== 'string') return res.status(400).json({ error: 'Code must be string' });

  const startTime = Date.now();
  let stdoutData = '';
  let stderrData = '';
  let isDone = false;

  const pyProcess = spawn('python3', ['-u', '-c', code], {
    timeout: 5000,
    env: { ...process.env, PYTHONUNBUFFERED: '1' },
  });

  pyProcess.stdout.on('data', (d) => { stdoutData += d.toString(); });
  pyProcess.stderr.on('data', (d) => { stderrData += d.toString(); });

  pyProcess.on('close', (code, signal) => {
    if (!isDone) {
      isDone = true;
      const executionTimeMs = Date.now() - startTime;
      if (signal === 'SIGTERM') {
        return res.json({ success: false, stdout: stdoutData, stderr: '⏱️ Timeout (5s limit)', executionTimeMs });
      }
      return res.json({ success: code === 0, stdout: stdoutData, stderr: stderrData, exitCode: code, executionTimeMs });
    }
  });
});

// Attendance & Live Chat routes
app.get('/api/attendance', (req, res) => {
  const todayStr = new Date().toISOString().split('T')[0];
  res.json({
    isPresentToday: !!attendanceRecords[todayStr],
    currentStreak: 14,
    codeCoins: 850,
  });
});

app.post('/api/attendance/punch', (req, res) => {
  const todayStr = new Date().toISOString().split('T')[0];
  attendanceRecords[todayStr] = { status: 'present', punchTime: '09:15 AM' };
  res.json({ success: true, message: 'Attendance recorded! +50 CodeCoins' });
});

// Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'dist', 'index.html')));
  }
  app.listen(PORT, '0.0.0.0', () => console.log(`Server on port ${PORT}`));
}
startServer();
