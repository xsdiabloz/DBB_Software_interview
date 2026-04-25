import aiParser from "@/app/src/lib/ai-service";
import { fallbackParser } from "@/app/src/lib/fallback-parser";
import { Schema } from "@/app/src/lib/schema";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const text = body.text;

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    let rawData;
    let AI_API_KEY = process.env.OPENAI_API_KEY;

    if (AI_API_KEY) {
      try {
        rawData = await aiParser(text);
      } catch (error) {
        console.log("Cannot get acces to AI", error);
        rawData = fallbackParser(text);
      }
    } else {
      rawData = fallbackParser(text);
    }

    const validatedData = Schema.parse(rawData);

    return NextResponse.json(validatedData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
