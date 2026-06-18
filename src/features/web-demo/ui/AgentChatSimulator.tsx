"use client";

import { useChat } from "@ai-sdk/react";
import { Send, Bot, User, Sparkles, TerminalSquare, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/shared/lib/utils";

export function AgentChatSimulator() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedPrompts = [
    "Write a test to verify the Localization Switcher",
    "How to mock API requests in Playwright?",
    "Write a negative test for the login page",
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f172a] font-sans flex flex-col h-[600px]">
      {/* Header */}
      <div className="bg-black/40 px-4 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-accent-purple" />
          <span className="font-bold text-white font-space-grotesk text-sm">Playwright Agentic AI</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Live Gemini 1.5
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-accent-purple to-accent-blue p-0.5">
              <div className="w-full h-full bg-[#0f172a] rounded-[14px] flex items-center justify-center">
                <Bot size={32} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Hello, I'm your QA Automation Agent!</h3>
              <p className="text-text-secondary max-w-sm text-sm">
                I am powered by Google Gemini and specialized in Playwright. Ask me to generate any E2E test scenario.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-md">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => append({ role: "user", content: prompt })}
                  className="text-left text-sm text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-3 transition-colors flex items-center justify-between"
                >
                  <span>{prompt}</span>
                  <TerminalSquare size={14} className="text-accent-cyan" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={cn("flex gap-4 max-w-4xl mx-auto", m.role === "user" ? "flex-row-reverse" : "flex-row")}>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                m.role === "user" ? "bg-accent-blue/20 text-accent-blue" : "bg-accent-purple/20 text-accent-purple"
              )}>
                {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={cn(
                "px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed",
                m.role === "user" ? "bg-accent-blue text-white rounded-tr-sm" : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm"
              )}>
                {/* Render Markdown-like text simply for now (ideally use react-markdown) */}
                <div className="whitespace-pre-wrap font-sans">
                  {m.content}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex gap-4 max-w-4xl mx-auto">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-accent-purple/20 text-accent-purple">
              <Loader2 size={16} className="animate-spin" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-200 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/20 border-t border-white/10">
        <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto flex items-center">
          <input
            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-500 rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all text-sm"
            value={input}
            placeholder="Type your testing scenario prompt here..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 rounded-full bg-accent-blue hover:bg-blue-600 text-white disabled:opacity-50 transition-colors"
          >
            <Send size={16} />
          </button>
        </form>
        <p className="text-center text-[10px] text-gray-500 mt-3">
          Powered by Vercel AI SDK & Google Gemini 1.5. Output is strictly limited to Playwright code generation.
        </p>
      </div>
    </div>
  );
}
