"use client";
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DogAvatar } from "@/components/dog-avatar";
import { ChatMessage } from "@/components/chat-message";
import { MessageInput } from "@/components/message-input";
import { apiRequest } from "@/lib/queryClient";
import type { ChatMessage as ChatMessageType } from "@shared/schema";

export default function Chat() {
  const [sessionId] = useState(
    () => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  );
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Fetch chat messages
  const { data: messages = [], isLoading } = useQuery<ChatMessageType[]>({
    queryKey: ["/api/chat", sessionId],
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        sessionId,
        content,
        sender: "user",
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat", sessionId] });
    },
  });

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (content: string) => {
    sendMessageMutation.mutate(content);
  };

  // Welcome message for empty chat
  const welcomeMessage: ChatMessageType = {
    id: -1,
    sessionId,
    content:
      "Woof! 🐕 I'm Bubbles, your friendly pup! Ask me anything about dogs - health, training, food, or just say hello!",
    sender: "bot",
    timestamp: new Date(),
  };

  const displayMessages = messages.length === 0 ? [welcomeMessage] : messages;

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#cc9ded] via-[#b32be06b] to-[#cc9ded] opacity-20"></div>

      {/* Header with Paw Pattern */}
      <header className="relative z-10 border-b-4 border-[hsl(var(--dark-brown))] p-6 shadow-lg bg-[#cc9ded] overflow-hidden">
        {/* Header Paw Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <svg
            className="absolute top-2 left-4"
            width="12"
            height="15"
            viewBox="0 0 12 15"
            style={{ transform: "rotate(20deg)" }}
          >
            <ellipse cx="6" cy="12" rx="3" ry="4" fill="white" />
            <circle cx="3" cy="3" r="1.5" fill="white" />
            <circle cx="6" cy="2" r="1.5" fill="white" />
            <circle cx="9" cy="3" r="1.5" fill="white" />
            <circle cx="6" cy="6" r="1" fill="white" />
          </svg>
          <svg
            className="absolute top-4 right-8"
            width="10"
            height="13"
            viewBox="0 0 10 13"
            style={{ transform: "rotate(-30deg)" }}
          >
            <ellipse cx="5" cy="10" rx="2.5" ry="3.5" fill="white" />
            <circle cx="2.5" cy="2.5" r="1.2" fill="white" />
            <circle cx="5" cy="1.5" r="1.2" fill="white" />
            <circle cx="7.5" cy="2.5" r="1.2" fill="white" />
            <circle cx="5" cy="5" r="1" fill="white" />
          </svg>
          <svg
            className="absolute bottom-2 left-1/3"
            width="14"
            height="17"
            viewBox="0 0 14 17"
            style={{ transform: "rotate(45deg)" }}
          >
            <ellipse cx="7" cy="13" rx="3.5" ry="4.5" fill="white" />
            <circle cx="3.5" cy="3" r="1.5" fill="white" />
            <circle cx="7" cy="2" r="1.5" fill="white" />
            <circle cx="10.5" cy="3" r="1.5" fill="white" />
            <circle cx="7" cy="6.5" r="1.2" fill="white" />
          </svg>
          <svg
            className="absolute top-1 right-1/4"
            width="11"
            height="14"
            viewBox="0 0 11 14"
            style={{ transform: "rotate(-15deg)" }}
          >
            <ellipse cx="5.5" cy="11" rx="3" ry="4" fill="white" />
            <circle cx="2.5" cy="2.5" r="1.3" fill="white" />
            <circle cx="5.5" cy="1.5" r="1.3" fill="white" />
            <circle cx="8.5" cy="2.5" r="1.3" fill="white" />
            <circle cx="5.5" cy="5.5" r="1" fill="white" />
          </svg>
        </div>

        <div className="flex items-center justify-center relative z-10">
          <div className="flex items-center space-x-4">
            <DogAvatar size="md" />
            <div className="text-center">
              <h1 className="text-[hsl(var(--dark-brown))] font-bold text-2xl">
                Bubbles ♡
              </h1>
              <p className="text-[hsl(var(--dark-brown))] text-sm opacity-70 font-medium">
                ｡꩜˚⋆ Your Pup Assistant ⋆˚꩜｡
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages Container */}
      <div
        ref={chatContainerRef}
        className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 bg-[#b32be06b] chat-background"
        style={{ maxHeight: "calc(100vh - 140px)" }}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-bounce-gentle">
              <DogAvatar size="lg" />
            </div>
          </div>
        ) : (
          displayMessages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        {sendMessageMutation.isPending && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <DogAvatar size="sm" />
            </div>
            <div className="message-bubble bot-bubble bg-[hsl(var(--warm-peach))] border-[hsl(var(--dark-brown))] rounded-2xl p-4 max-w-sm shadow-lg">
              <p className="text-[hsl(var(--dark-brown))] leading-relaxed font-medium">
                <span className="animate-pulse">Thinking... 🤔</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Message Input with Paw Accents */}
      <div className="relative z-10">
        {/* Paw accents around input */}
        <div className="absolute -top-6 left-4 opacity-20 pointer-events-none">
          <svg width="16" height="20" viewBox="0 0 16 20">
            <ellipse cx="8" cy="16" rx="4" ry="5" fill="#cc9ded" />
            <circle cx="4" cy="4" r="2" fill="#cc9ded" />
            <circle cx="8" cy="2" r="2" fill="#cc9ded" />
            <circle cx="12" cy="4" r="2" fill="#cc9ded" />
            <circle cx="8" cy="8" r="1.5" fill="#cc9ded" />
          </svg>
        </div>
        <div className="absolute -top-4 right-6 opacity-20 pointer-events-none">
          <svg
            width="14"
            height="18"
            viewBox="0 0 14 18"
            style={{ transform: "rotate(25deg)" }}
          >
            <ellipse cx="7" cy="14" rx="3.5" ry="4.5" fill="#cc9ded" />
            <circle cx="3.5" cy="3" r="1.5" fill="#cc9ded" />
            <circle cx="7" cy="2" r="1.5" fill="#cc9ded" />
            <circle cx="10.5" cy="3" r="1.5" fill="#cc9ded" />
            <circle cx="7" cy="7" r="1.2" fill="#cc9ded" />
          </svg>
        </div>
        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={sendMessageMutation.isPending}
        />
      </div>

      {/* Enhanced Floating Decorative Elements */}
      <div className="fixed bottom-32 left-6 opacity-30 pointer-events-none z-0">
        <div
          className="text-3xl emoji-float"
          style={{ animationDelay: "0.5s" }}
        >
          🦴
        </div>
      </div>
      <div className="fixed top-24 right-6 opacity-30 pointer-events-none z-0">
        <div className="text-2xl emoji-float" style={{ animationDelay: "1s" }}>
          🐾
        </div>
      </div>
      <div className="fixed top-1/3 left-4 opacity-25 pointer-events-none z-0">
        <div className="text-xl sparkle" style={{ animationDelay: "2s" }}>
          ✨
        </div>
      </div>
      <div className="fixed bottom-1/3 right-4 opacity-25 pointer-events-none z-0">
        <div className="text-2xl sparkle" style={{ animationDelay: "1.5s" }}>
          🌟
        </div>
      </div>
      <div className="fixed top-1/2 right-8 opacity-20 pointer-events-none z-0">
        <div className="text-lg emoji-float" style={{ animationDelay: "3s" }}>
          🏠
        </div>
      </div>

      {/* Additional Paw Decorations */}
      <div className="fixed bottom-20 right-20 opacity-15 pointer-events-none z-0">
        <div
          className="text-4xl animate-bounce-gentle"
          style={{ animationDelay: "2.5s" }}
        >
          🐾
        </div>
      </div>
      <div className="fixed top-40 left-20 opacity-15 pointer-events-none z-0">
        <div
          className="text-3xl animate-pulse"
          style={{ animationDelay: "1.8s" }}
        >
          🐾
        </div>
      </div>
    </div>
  );
}
