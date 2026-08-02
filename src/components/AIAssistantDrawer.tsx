import { useState, useRef, useEffect, FormEvent } from "react";
import { ChatMessage } from "../types";
import { Sparkles, X, Send, Cpu, Trash2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: string[];
  projectScale: string;
}

export default function AIAssistantDrawer({
  isOpen,
  onClose,
  selectedServices,
  projectScale,
}: AIAssistantDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with a welcome message from the AI Advisor
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "model",
          content: `¡Bienvenido a **NOVA group**! Soy tu asesor tecnológico personal. 

He detectado que estás explorando nuestros servicios premium de vanguardia. Puedo ayudarte a:
- Diseñar la arquitectura ideal de tu proyecto.
- Configurar agentes de IA con **OpenClaw** y **Hermes Agent**.
- Estimar presupuestos ajustados a tu nivel de escala (**${projectScale.toUpperCase()}**).
- Trazar una hoja de ruta con fases de implementación claras.

¿De qué trata tu proyecto o idea de negocio? Cuéntame los detalles y con gusto estructuraré una propuesta para ti.`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [projectScale, messages]);

  // Handle auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    setErrorMsg(null);
    const userText = inputValue.trim();
    setInputValue("");

    // Create unique IDs
    const userMsgId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const chatHistoryForServer = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          history: chatHistoryForServer,
          selectedServices,
          projectScale,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Ocurrió un error en la comunicación con la consultoría IA.");
      }

      const resData = await response.json();
      
      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: "model",
        content: resData.text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      console.error("Error asking NOVA advisor:", err);
      setErrorMsg(err.message || "No pudimos conectar con NOVA group Advisor. Por favor, revisa tus secretos o recarga.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm("¿Seguro que deseas limpiar el historial de la conversación?")) {
      setMessages([]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            id="advisor-backdrop"
          />

          {/* Sliding Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[60] flex h-[100dvh] w-full flex-col border-l border-white/20 bg-[#0d031b]/95 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.95)] md:max-w-xl lg:max-w-2xl"
            style={{
              paddingTop: "max(0px, env(safe-area-inset-top))",
              paddingBottom: "calc(max(0px, env(safe-area-inset-bottom)) + 0px)",
              isolation: "isolate",
              transform: "translateZ(0)",
              contain: "layout",
            }}
            id="advisor-drawer"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/15 px-5 sm:px-6 py-3.5 sm:py-4 bg-[#140628]/85 backdrop-blur-xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7e22ce] text-white border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_0_15px_rgba(168,85,247,0.5)]">
                  <Cpu className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide font-display">
                    NOVA group Advisor AI
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a855f7] animate-ping" />
                    <span className="text-[10px] text-gray-300">Consultor en Línea</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {messages.length > 1 && (
                  <button
                    id="btn-clear-chat"
                    onClick={clearChat}
                    title="Limpiar Conversación"
                    className="cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                
                <button
                  id="btn-close-advisor"
                  onClick={onClose}
                  className="cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Context Widget (Sync Indicator) */}
            <div className="shrink-0 bg-[#1c0a33]/60 px-5 sm:px-6 py-2.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-gray-300">
                <span className="text-gray-400">Escala:</span>
                <span className="font-mono text-[#c084fc] liquid-glass-pill px-2 py-0.5 rounded-full uppercase text-[10px] font-bold">
                  {projectScale}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <span className="text-gray-400">Servicios Contexto:</span>
                <span className="font-semibold text-white font-mono liquid-glass-pill px-2 py-0.5 rounded-full text-[10px]">
                  {selectedServices.length}
                </span>
              </div>
            </div>

            {/* Chat Messages Screen */}
            <div
              className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-6 py-5 sm:py-6 space-y-4 no-scrollbar"
              id="chat-messages-container"
              style={{
                isolation: "isolate",
                transform: "translateZ(0)",
                contain: "strict",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex w-full ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] sm:max-w-[85%] rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-lg ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[#a855f7] to-[#7e22ce] text-white rounded-tr-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_0_15px_rgba(168,85,247,0.4)] border border-white/30"
                        : "liquid-glass text-gray-100 rounded-tl-none border-white/20"
                    }`}
                  >
                    {msg.role === "model" ? (
                      <div className="markdown-body text-[11px] sm:text-xs md:text-sm prose prose-invert">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-[11px] sm:text-xs md:text-sm font-medium whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    )}
                    
                    <span
                      className={`block text-[9px] mt-1.5 sm:mt-2 opacity-80 ${
                        msg.role === "user" ? "text-purple-100 text-right font-mono" : "text-gray-400 font-mono"
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Loader indicator while stream/fetch API is working */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl rounded-tl-none liquid-glass px-3.5 sm:px-4 py-2.5 sm:py-3.5 text-[11px] sm:text-xs text-gray-200 border-white/20 max-w-[88%] sm:max-w-[85%]">
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#c084fc]" />
                    <span className="leading-snug">NOVA Advisor está modelando tu arquitectura...</span>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 sm:p-4 text-[11px] sm:text-xs text-red-300">
                  <p className="font-bold">Fallo de Comunicación</p>
                  <p className="mt-1">{errorMsg}</p>
                  <p className="mt-2 text-[10px] text-gray-400">
                    Asegúrate de que la clave de la API esté configurada.
                  </p>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Suggestions */}
            <div className="shrink-0 px-4 sm:px-6 py-2.5 border-t border-white/10 bg-[#0d031b]/90 overflow-x-auto flex gap-2 no-scrollbar backdrop-blur-md">
              <button
                id="btn-prompt-suggest-1"
                onClick={() => setInputValue("¿Cómo estructurarías un e-commerce premium con agentes de recomendación IA?")}
                className="cursor-pointer shrink-0 rounded-full liquid-glass-pill hover:border-white/50 px-3 py-1.5 text-[10px] sm:text-[11px] text-gray-200 hover:text-white transition-all active:scale-95"
              >
                E-commerce + IA
              </button>
              <button
                id="btn-prompt-suggest-2"
                onClick={() => setInputValue("Quiero automatizar la atención al cliente usando agentes OpenClaw y Hermes Agent.")}
                className="cursor-pointer shrink-0 rounded-full liquid-glass-pill hover:border-white/50 px-3 py-1.5 text-[10px] sm:text-[11px] text-gray-200 hover:text-white transition-all active:scale-95"
              >
                OpenClaw & Hermes
              </button>
              <button
                id="btn-prompt-suggest-3"
                onClick={() => setInputValue("¿Cuánto tiempo y qué infraestructura en AWS requiero para un proyecto enterprise elástico?")}
                className="cursor-pointer shrink-0 rounded-full liquid-glass-pill hover:border-white/50 px-3 py-1.5 text-[10px] sm:text-[11px] text-gray-200 hover:text-white transition-all active:scale-95"
              >
                Escala Cloud AWS
              </button>
            </div>

            {/* Message Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="shrink-0 border-t border-white/10 bg-[#140628]/85 px-4 sm:px-6 py-3 sm:py-4 flex gap-2 items-center backdrop-blur-xl"
              style={{
                paddingBottom: "calc(12px + max(0px, env(safe-area-inset-bottom)))",
              }}
              id="chat-form"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e as unknown as React.FormEvent);
                  }
                }}
                disabled={isLoading}
                placeholder="Pregunta sobre servicios, agentes o cotizaciones..."
                className="flex-1 min-w-0 rounded-xl border border-white/20 bg-[#0d031b]/80 px-3.5 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs md:text-sm text-white placeholder-gray-400 focus:border-[#c084fc]/70 focus:ring-2 focus:ring-[#a855f7]/30 focus:outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
              />
              <button
                type="submit"
                id="btn-submit-chat"
                disabled={isLoading || !inputValue.trim()}
                className="cursor-pointer flex h-[42px] w-[42px] sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7e22ce] text-white hover:from-[#b866ff] hover:to-[#8e2ce0] disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500 disabled:border-gray-600 transition-all font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_0_15px_rgba(168,85,247,0.5)] border border-white/30 active:scale-95"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
