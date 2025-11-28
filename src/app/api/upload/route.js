import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req) {
  try {
    const { image, mimeType } = await req.json();

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: "Google API Key not configured" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const prompt = `Analyze this prescription image. 
    
    IMPORTANT INSTRUCTION: You MUST reply in Pashto language (پښتو).

    1. Identify the drug names.
    2. Identify the dosage instructions.
    3. Provide a brief summary of what this medication is typically used for.
    
    Disclaimer: Start with a clear medical disclaimer in Pashto that this is AI analysis and not a substitute for professional pharmacist verification.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: image,
          mimeType: mimeType
        }
      }
    ]);
    
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ analysis: text });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze prescription" },
      { status: 500 }
    );
  }
}
