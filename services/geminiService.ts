
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateLoveMessage = async (recipientName: string = "Eli", senderName: string = "Carlos"): Promise<string> => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Escribe un mensaje de amor muy corto, dulce y poético (máximo 2 líneas) de parte de ${senderName} para su novia ${recipientName}. Que sea tierno y romántico.`,
      config: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
      },
    });
    return response.text?.trim() || "Eres mi lugar favorito en el mundo.";
  } catch (error) {
    console.error("Error generating love message:", error);
    return "Desde que llegaste, mi vida tiene más color. Te amo.";
  }
};
