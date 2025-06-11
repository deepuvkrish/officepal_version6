import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    if (!input) {
      return NextResponse.json({ error: "Input text is required." }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: input,
    });

    return NextResponse.json({ output: response.text });
  } catch (error) {
    console.error("Error generating summary:", error);
    return NextResponse.json({ error: "Failed to generate summary." }, { status: 500 });
  }
}
