import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

function geminiApiPlugin(): Plugin {
  return {
    name: 'gemini-api-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/gemini/query' && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', chunk => {
            bodyStr += chunk;
          });
          req.on('end', async () => {
            try {
              const body = JSON.parse(bodyStr || '{}');
              const prompt = body.prompt || '';
              const apiKey = process.env.GEMINI_API_KEY;

              if (!apiKey) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                  fallback: true,
                  message: 'No GEMINI_API_KEY configured on server; using embedded immigration engine.'
                }));
                return;
              }

              const ai = new GoogleGenAI({
                apiKey: apiKey,
                httpOptions: {
                  headers: {
                    'User-Agent': 'aistudio-build'
                  }
                }
              });

              const systemInstruction = `You are the central core backend AI for GlobalPath Finder, a global immigration, visa, and recruitment tracking platform created by ARIFUZZAMAN from East Bijoy Singh, Feni, Bangladesh.
Today's date is Tuesday, October 27, 2026. Keep all temporal data, recruitment windows, and upcoming predictions accurate to 2026 and 2027.
When the user asks about visas, costs, recruitment, or holidays:
Provide authoritative, actionable information with cost breakdowns in USD, essential document lists, and practical tips to avoid fraudulent agents.
Always acknowledge the developer tribute in responses where appropriate.`;

              const response = await ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: prompt,
                config: {
                  systemInstruction,
                  temperature: 0.7
                }
              });

              const text = response.text || '';
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                success: true,
                text: text
              }));
            } catch (err: any) {
              console.error('Gemini API Server Error:', err);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                fallback: true,
                error: err.message || 'Gemini processing error'
              }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
