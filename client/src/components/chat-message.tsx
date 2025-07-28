import { DogAvatar } from "./dog-avatar";
import type { ChatMessage } from "@shared/schema";

interface ChatMessageProps {
  message: ChatMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === "bot";

  if (isBot) {
    return (
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <DogAvatar size="sm" />
        </div>
        <div className="message-bubble bot-bubble border-[hsl(var(--dark-brown))] rounded-2xl p-4 max-w-sm shadow-lg bg-[#b8712ede] text-[#ffffff]">
          <p className="text-[hsl(var(--dark-brown))] leading-relaxed break-words font-medium">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-end space-x-3">
      <div className="message-bubble user-bubble border-[hsl(var(--dark-brown))] rounded-2xl p-4 max-w-sm shadow-lg bg-[#22e5d9]">
        <p className="text-[hsl(var(--dark-brown))] leading-relaxed break-words font-medium">
          {message.content}
        </p>
      </div>
      <div className="w-10 h-10 bg-[hsl(var(--creamy-beige))] rounded-full border-2 border-[hsl(var(--dark-brown))] flex items-center justify-center shadow-md">
        <span className="text-xs">👤</span>
      </div>
    </div>
  );
}
