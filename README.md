<div align="center">
<h1>
  <span style="font-size: 3rem; font-weight: 900; letter-spacing: -0.05em; font-family: 'Space Grotesk', sans-serif;">
    <span style="background: linear-gradient(135deg, #ffffff 0%, #c084fc 50%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
      NOVA group
    </span>
  </span>
</h1>
<p style="font-size: 1.1rem; color: #a7a2bd; max-width: 700px; font-family: 'Inter', sans-serif;">
  Agentes Autónomos OpenClaw & Hermes Agent · E-commerce Elástico · Automatización Cloud
</p>

<div>
  <kbd style="background: #1c0a33; border: 1px solid rgba(168,85,247,0.35); color: #c084fc; padding: 4px 10px; border-radius: 8px; font-family: 'JetBrains Mono', monospace; font-size: 12px;">
    ✨ Liquid Glass UI
  </kbd>
  <kbd style="background: #1c0a33; border: 1px solid rgba(168,85,247,0.35); color: #c084fc; padding: 4px 10px; border-radius: 8px; font-family: 'JetBrains Mono', monospace; font-size: 12px; margin-left: 6px;">
    🤖 NOVA Advisor AI
  </kbd>
  <kbd style="background: #1c0a33; border: 1px solid rgba(168,85,247,0.35); color: #c084fc; padding: 4px 10px; border-radius: 8px; font-family: 'JetBrains Mono', monospace; font-size: 12px; margin-left: 6px;">
    🧩 Planificador Inteligente
  </kbd>
</div>
</div>

---

## 🚀 NOVA group — AI & Technology Boutique

Firma consultora y agencia boutique de software premium. Orquestamos sistemas de agentes cognitivos autónomos con **OpenClaw** y **Hermes Agent**, desarrollamos plataformas e-commerce de alto rendimiento y automatizamos flujos de trabajo elásticos.

**Stack del sitio:**
- React 19 + TypeScript 5.8 + Vite 6
- Tailwind CSS 4 (Zero-Config)
- Framer Motion (motion/react) — animaciones & parallax
- Lucide Icons — iconografía pixel-perfect
- React Markdown — rendering de respuestas del asesor IA
- Express backend con endpoint `/api/advisor` (integración LLM agnóstica)

---

## ⚙️ Ejecutar en Local

**Prerrequisitos:** Node.js ≥ 18

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   Copia `.env.example` a `.env.local` y configura tu clave:
   ```bash
   cp .env.example .env.local
   ```
   Edita `.env.local` y coloca tu API Key del proveedor LLM que desees integrar.

3. **Levantar el entorno (frontend + API Express):**
   ```bash
   npm run dev
   ```
   Abre `http://localhost:3000` en tu navegador.

4. **Build para producción:**
   ```bash
   npm run build
   npm start
   ```

---

## ✨ Características Principales

| Módulo | Descripción |
|---|---|
| 🔮 **NOVA Advisor AI** | Asesor tecnológico conversacional con Markdown, contexto de servicios seleccionados y escala de proyecto |
| 🧱 **Planificador Inteligente** | Configurador dinámico con rango de presupuesto, plazos y selección de servicios en tiempo real |
| 📱 **Mobile Bottom Nav** | Navegación fija estilo Apple Liquid Glass con tracking de sección activa |
| 🎨 **Liquid Glass System** | Design system completo: `.liquid-glass`, `.liquid-glass-interactive`, `.liquid-glass-pill`, `.glow-card` |
| 🪐 **Planet 3D Ecosystem** | Visualización holográfica del ecosistema OpenClaw + Hermes Agent |
| ⚡ **Tech Stack Explorer** | Explorador interactivo con categorías (IA, Cloud, Frontend, DevOps) |
| 🎯 **Service Cards 3D** | Tarjetas con efecto 3D tilt + integración one-click al planificador |
| 📊 **Animated Metrics** | Contadores de métricas con animación on-scroll |
| 🌠 **Cursor Spotlight** | Iluminación dinámica siguiendo el mouse (solo pointer:fine) |

---

## 🏗️ Arquitectura de Carpetas

```
src/
├── components/
│   ├── AIAssistantDrawer.tsx     # Drawer chat asesor IA
│   ├── MobileBottomNav.tsx       # Bottom nav móvil (portal en <body>)
│   ├── ServiceCard.tsx           # Tarjeta servicio con tilt 3D
│   ├── TechStackExplorer.tsx     # Explorador stack tecnológico
│   ├── Planet3D.tsx              # Planeta holográfico ecosystem
│   ├── CursorSpotlight.tsx       # Iluminación cursor
│   ├── PageBeam.tsx              # Barra de luz central animada
│   ├── MarqueeBanner.tsx         # Marquee clientes/servicios
│   ├── MetricCard.tsx            # Tarjeta métrica animada
│   └── Title3D.tsx               # Componente título con relieve
├── App.tsx                       # Composición de secciones
├── data.ts                       # Servicios, tech stack, FAQ, testimonios
├── types.ts                      # Interfaces TypeScript
├── index.css                     # Design system (tokens + liquid-glass)
└── main.tsx                      # Entry point React
```

---

## 🔩 Integración del Endpoint IA (`/api/advisor`)

El backend Express (`server.ts`) expone `POST /api/advisor` y espera un body JSON:
```json
{
  "message": "Consulta del usuario",
  "history": [{ "role": "user|model", "content": "..." }],
  "selectedServices": ["ai-automation", "ecommerce"],
  "projectScale": "startup | growth | enterprise"
}
```

Devuelve `{ "text": "respuesta del modelo" }`. Puedes conectar **cualquier proveedor LLM** (OpenAI, Anthropic, Groq, modelos open-source via Ollama, etc.) modificando `server.ts`; el código está desacoplado del proveedor.

---

## 📦 Deploy Ready

- **Docker/ACR ready**: estructura preparada para empaquetar (Vite build + esbuild del server en `dist/server.cjs`)
- **100% Responsive**: breakpoints `sm / md / lg` con `md:hidden` para nav móvil
- **Mobile Safe Areas**: `env(safe-area-inset-*)` aplicado en drawer y barra de chat
- **Accesibilidad**: aria-labels, semantic HTML, focus states preservados

