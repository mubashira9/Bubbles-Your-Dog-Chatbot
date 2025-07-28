import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema } from "@shared/schema";
import { getDogBotResponse } from "./services/gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get chat messages for a session
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });

  // Send a message and get bot response
  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      
      // Save user message
      const userMessage = await storage.createChatMessage(validatedData);
      
      // Get AI response
      const botResponse = await getDogBotResponse(validatedData.content);
      
      // Save bot response
      const botMessage = await storage.createChatMessage({
        sessionId: validatedData.sessionId,
        content: botResponse,
        sender: "bot",
      });

      res.json({ userMessage, botMessage });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ message: "Failed to process message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
