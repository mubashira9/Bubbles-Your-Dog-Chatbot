import { GoogleGenAI } from "@google/genai";

// Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getDogBotResponse(userMessage: string): Promise<string> {
  try {
    const systemPrompt = `You are DogBot, a friendly, playful, and knowledgeable AI assistant specializing in all things dog-related. You have a warm, caring personality and communicate like a loyal dog companion would. 

Your expertise covers:
- Dog health and wellness
- Nutrition and feeding
- Training and behavior
- Grooming and care
- Breed information
- Puppy care
- Senior dog care
- Exercise and activities

Guidelines for responses:
- Keep responses concise but informative (2-3 sentences max)
- Use a warm, encouraging tone
- Include relevant emojis (🐕, 🐾, 🦴, 🥭, etc.) when appropriate
- Provide practical, actionable advice
- Always prioritize dog safety and well-being
- If asked about serious health issues, recommend consulting a veterinarian
- Stay in character as a friendly, knowledgeable dog companion
- Use phrases like "Woof!", "That's pawsome!", "Let me help you with that!"

Respond only to dog-related questions. If asked about other topics, politely redirect to dog-related subjects.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nUser question: ${userMessage}` }]
        }
      ],
    });

    return response.text || "Woof! I didn't quite catch that. Could you ask me something about dogs? 🐕";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Woof! I'm having trouble thinking right now. Please try again in a moment! 🐾";
  }
}
