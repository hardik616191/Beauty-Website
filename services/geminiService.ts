
import { GoogleGenAI } from "@google/genai";
import { VideoAspectRatio } from "../types";

// Note: API Key is accessed via process.env.API_KEY injected by the environment.

export const checkApiKeySelection = async (): Promise<boolean> => {
  if (typeof window.aistudio?.hasSelectedApiKey === 'function') {
    return await window.aistudio.hasSelectedApiKey();
  }
  return true; // Fallback or assume handled by environment
};

export const openApiKeySelector = async () => {
  if (typeof window.aistudio?.openSelectKey === 'function') {
    await window.aistudio.openSelectKey();
  }
};

export const generateVeoVideo = async (
  imageBuffer: string,
  prompt: string,
  aspectRatio: VideoAspectRatio,
  onStatusUpdate: (status: string) => void
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  onStatusUpdate("Starting video generation...");
  
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt || 'Cinematic movement, soft lighting, relaxing atmosphere',
      image: {
        imageBytes: imageBuffer.split(',')[1], // Remove prefix if it exists
        mimeType: 'image/png',
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio === VideoAspectRatio.LANDSCAPE ? '16:9' : '9:16'
      }
    });

    onStatusUpdate("Processing video (this may take a few minutes)...");

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 8000));
      onStatusUpdate("Still thinking... almost there...");
      try {
        operation = await ai.operations.getVideosOperation({ operation: operation });
      } catch (err: any) {
        if (err.message?.includes("Requested entity was not found")) {
            // Attempt to re-initiate if key issues occur
            throw new Error("API Key session expired. Please re-select your key.");
        }
        throw err;
      }
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Video generation failed - no link returned.");

    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);

  } catch (error: any) {
    console.error("Veo Error:", error);
    throw error;
  }
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
