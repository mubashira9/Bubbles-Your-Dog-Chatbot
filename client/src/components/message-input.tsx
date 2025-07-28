import { useState } from "react";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t-4 border-[hsl(var(--dark-brown))] p-6 shadow-lg bg-[#cc9ded]">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <div className="flex-1 relative bg-[#20a8ab00]">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about dogs... 🐕"
            disabled={disabled}
            className="dog-bowl-input w-full px-6 py-4 pl-10 text-[hsl(var(--dark-brown))] placeholder-[hsl(var(--dark-brown))] placeholder:opacity-60 focus:outline-none focus:ring-3 focus:ring-[hsl(var(--golden-retriever))] transition-all disabled:opacity-50 font-medium bg-[#ffffff]"
          />
        </div>
        
        {/* Paw Send Button */}
        <button 
          type="submit"
          disabled={!message.trim() || disabled}
          className="paw-button w-14 h-14 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xl"
        >
          🐾
        </button>
      </form>
    </div>
  );
}
