import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req) {
  try {
    const { drugs } = await req.json();

    if (!drugs || !Array.isArray(drugs) || drugs.length === 0) {
      return NextResponse.json({ error: "No drugs provided" }, { status: 400 });
    }

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: "Google API Key not configured" },
        { status: 500 }
      );
    }

    // Free-tier stable model for streaming
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Analyze the potential interactions between the following drugs: ${drugs.join(", ")}.

IMPORTANT INSTRUCTION: You MUST reply in Pashto language (پښتو) and short answer.

Please provide:
1. A summary of whether these drugs are safe to take together.
2. Specific interaction details (severity, mechanism).
3. Side effects to watch out for.
4. Recommendations.

Disclaimer: Start with a clear medical disclaimer in Pashto. This is not medical advice—consult a doctor.`;

    // Start streaming generation
    const result = await model.generateContentStream(prompt);

    // Convert Gemini's async iterable stream to a ReadableStream
    // (Encodes chunks as UTF-8 for text streaming)
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Iterate over each chunk from Gemini
          for await (const chunk of result.stream) {
            const chunkText = await chunk.text();
            if (chunkText) {
              // Enqueue the chunk as Uint8Array (UTF-8 encoded)
              controller.enqueue(new TextEncoder().encode(chunkText));
            }
          }
          // Stream complete
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    // Return the stream as a Response (no Content-Type needed; defaults to text/plain)
    return new Response(stream, {
      headers: {
        // Optional: For SSE-like behavior in clients
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { error: `Failed to analyze interactions: ${error.message}` },
      { status: 500 }
    );
  }
}