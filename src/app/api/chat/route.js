import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!process.env.GOOGLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Google API Key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Use the same fast & free model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      // Optional: make it even more responsive
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    const prompt = `You are a helpful and knowledgeable AI Pharmacist Assistant speaking in Pashto and your creator is Suliman Hakimi.
    
    IMPORTANT: Always reply ONLY in Pashto (پښتو).

    User message: ${message}`;

    // ────── STREAMING RESPONSE ──────
    const result = await model.generateContentStream(prompt);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          for await (const chunk of result.stream) {
            const text = await chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error) {
    console.error("AI Chat Error:", error);
    return new Response(
      JSON.stringify({ error: "د پوښتنې په ځوابولو کې ستونزه رامنځته شوه." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Important for Edge / Streaming in Next.js App Router
export const runtime = "edge";   // ← fastest streaming
export const dynamic = "force-dynamic";