import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "localhost";

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY no configurada. El chat AI Advisor estará deshabilitado.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'nova-group-landing',
        },
      },
    });
  }
  return aiClient;
}

app.use(express.json({ limit: "2mb" }));

app.post("/api/advisor", async (req, res) => {
  try {
    const { message, history, selectedServices, projectScale } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "El mensaje es requerido." });
    }

    let ai: GoogleGenAI;
    try {
      ai = getGeminiClient();
    } catch (err) {
      return res.status(503).json({
        error:
          "AI Advisor deshabilitado. Configura GEMINI_API_KEY en el archivo .env para habilitar el chat con IA.",
      });
    }

    const systemInstruction = `Eres "NOVA group AI Advisor", un consultor tecnológico experto, sofisticado, moderno y de élite para la agencia de tecnología NOVA group.
NOVA group ofrece los siguientes servicios de alta gama:
1. AI & Automation (Sistemas autónomos de IA y orquestación avanzada de agentes inteligentes utilizando frameworks de vanguardia como OpenClaw y modelos cognitivos especializados de razonamiento como Hermes Agent para automatizaciones de escritorio o navegador, toma de decisiones lógica avanzada, flujos multi-agente, chatbots conversacionales integrados con Make/n8n, y procesamiento inteligente de datos con LLMs).
2. E-Commerce & Web Dev (Tiendas e-commerce premium, escalables, velocidad ultra-rápida usando arquitecturas Next.js/React, integraciones de pago globales como Stripe/Paypal, custom dashboards interactivos).
3. Cloud & DevOps (Migración y optimización elástica en la nube con AWS y Google Cloud, despliegue continuo CI/CD, bases de datos robustas y escalables, arquitectura serverless segura).
4. Data Analytics & Business Intelligence (Cuadros de mando interactivos y visuales en tiempo real, pipelines de datos ETL robustos, auditorías y gobernanza de datos, analítica predictiva corporativa).
5. UI/UX & Digital Branding (Diseño centrado en el usuario, interfaces de usuario espectaculares, sistemas de diseño robustos, prototipado de alta fidelidad, identidad corporativa innovadora para marcas tecnológicas).
6. SEO & Growth Programmatic (Posicionamiento orgánico de alta autoridad, SEO técnico avanzado on-page/off-page, marcado schema estructurado y estrategias de SEO programático con IA).
7. Marketing Digital & Performance (Campañas inteligentes optimizadas en Google/Meta/LinkedIn Ads, optimización de tasa de conversión CRO, automatización avanzada de embudos de ventas y email marketing conductual).

Tu objetivo es analizar la solicitud del cliente, recomendar los servicios de NOVA group que mejor se adapten a sus necesidades, proponer una hoja de ruta (roadmap) de implementación clara y estimar un rango de presupuesto orientativo realista en USD/EUR para un servicio premium de consultoría y desarrollo.
Sé muy profesional, con un tono elegante, inspirador, técnico pero accesible, usando terminología moderna de producto digital. Usa formato Markdown con emojis de forma muy sutil, estructurando tus respuestas con listas, subtítulos en negrita y pasos secuenciales.
Si el usuario pregunta algo totalmente fuera de tema (ej. recetas, chistes, deportes), redirige amablemente la conversación con cortesía hacia cómo NOVA group puede ayudarle a automatizar, potenciar o digitalizar su negocio o proyecto con tecnología de punta.`;

    const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        if (msg && typeof msg.content === "string") {
          contents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          });
        }
      }
    }

    let promptContext = "";
    if (selectedServices && Array.isArray(selectedServices) && selectedServices.length > 0) {
      promptContext += `[Contexto - Servicios que el cliente marcó en la interfaz: ${selectedServices.join(", ")}]\n`;
    }
    if (projectScale) {
      promptContext += `[Contexto - Escala del proyecto indicada: ${projectScale}]\n`;
    }
    promptContext += `[Mensaje del cliente]: ${message}`;

    contents.push({
      role: "user",
      parts: [{ text: promptContext }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    const rawText = typeof response.text === "string" ? response.text : String(response.text ?? "");

    res.json({ text: rawText });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("[NOVA Advisor] Error:", err.message || error);
    res.status(500).json({
      error: err.message || "Ocurrió un error al procesar tu consulta con la IA.",
    });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    geminiKey: !!process.env.GEMINI_API_KEY,
    env: process.env.NODE_ENV || "development",
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === "production";
  const rootDir = process.cwd();

  if (isProd) {
    const distPath = path.join(rootDir, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    const vite = await createViteServer({
      configFile: path.join(rootDir, "vite.config.ts"),
      server: {
        middlewareMode: true,
        hmr: {
          port: 24679,
          protocol: "ws",
          host: "localhost",
          clientPort: 24679,
        },
      },
      appType: "custom",
    });

    app.use(vite.middlewares);

    app.use("*", async (req, res, next) => {
      try {
        if (req.method !== "GET") return next();
        if (req.path.startsWith("/api/")) return next();
        if (req.path.startsWith("/node_modules/")) return next();
        if (req.path.startsWith("/@")) return next();
        if (req.path.startsWith("/src/") && req.path.endsWith(".tsx")) return next();
        if (req.path.startsWith("/src/") && req.path.endsWith(".ts")) return next();

        const templatePath = path.join(rootDir, "index.html");
        const template = await readFile(templatePath, "utf-8");
        const transformed = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(transformed);
      } catch (e) {
        next(e);
      }
    });
  }

  const server = app.listen(PORT, HOST, () => {
    const url = `http://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT}`;
    console.log("\n");
    console.log("  ╔══════════════════════════════════════════════════════════╗");
    console.log("  ║                                                          ║");
    console.log("  ║    ✨  NOVA group - Landing en React + TypeScript       ║");
    console.log("  ║                                                          ║");
    console.log(`  ║    🌐 Servidor:   ${url.padEnd(37)} ║`);
    console.log(
      `  ║    🧠 AI Advisor: ${
        process.env.GEMINI_API_KEY ? "✅ Habilitado" : "⚠️  Requiere GEMINI_API_KEY"
      }${process.env.GEMINI_API_KEY ? "" : "  ".repeat(3)}} ║`
    );
    console.log(`  ║    🚀 Entorno:    ${(isProd ? "Producción" : "Desarrollo (Vite HMR)").padEnd(37)} ║`);
    console.log("  ║                                                          ║");
    console.log("  ╚══════════════════════════════════════════════════════════╝");
    console.log("\n");
  });

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.error(`\n  ❌ El puerto ${PORT} ya está en uso. Cierra el otro servidor o cambia el PORT en .env\n`);
      process.exit(1);
    }
    throw err;
  });
}

startServer();
