import { GoogleGenAI } from "@google/genai";
import { ImageConfig } from '../types';

// We assume process.env.API_KEY is managed by the window.aistudio selection flow.
// We must create the instance just before calling to ensure we get the latest key.

export const generateImageWithGemini = async (config: ImageConfig): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please select a key.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Construct a detailed prompt based on user inputs
  let detailedPrompt = `Create a high-quality image.
  Subject/Description: ${config.prompt}
  Art Style: ${config.style}
  Aspect Ratio requested: ${config.aspectRatio}`;

  if (config.primaryColor) {
    detailedPrompt += `\nPrimary Tone/Color: ${config.primaryColor}`;
    if (config.isGradient) {
      detailedPrompt += ` (Apply a gradient effect using this color)`;
    }
  }

  if (config.removeBackground) {
    detailedPrompt += `\nBackground: Plain, simple, or transparent friendly (white/black solid) to allow easy extraction. Keep the subject isolated.`;
  }

  // Prepare content parts
  const parts: any[] = [];
  
  // If there is a reference image, add it
  if (config.referenceImage) {
    // config.referenceImage is "data:image/png;base64,..."
    // We need to strip the prefix for the API if passing raw bytes, 
    // but the SDK usually handles inlineData nicely if formatted correctly.
    // However, the SDK example uses raw base64 string in `data`.
    
    const base64Data = config.referenceImage.split(',')[1];
    const mimeType = config.referenceImage.split(';')[0].split(':')[1];

    parts.push({
      inlineData: {
        mimeType: mimeType,
        data: base64Data
      }
    });
  }

  // Add the text prompt
  parts.push({ text: detailedPrompt });

  try {
    // Using the specialized image model for high quality
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: parts,
      },
      config: {
        imageConfig: {
          aspectRatio: config.aspectRatio as any, // Cast to avoid strict enum mismatch if SDK differs slightly
          imageSize: "2K", // High quality
        },
        // If the user wants to remove background, strictly speaking the model generates an image. 
        // Background removal is usually a post-process, but we prompt for it.
      },
    });

    // Extract the image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        // We assume PNG for high quality, though API might return JPEG depending on requested params (defaults usually PNG for images)
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }

    throw new Error("No image data found in response.");

  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};
