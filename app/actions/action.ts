"use server";

import { toast } from "react-toastify";
import aiParser from "../src/lib/ai-service";
import { fallbackParser } from "../src/lib/fallback-parser";
import { Schema } from "../src/lib/schema";

export const analyzeVacancy = async (text: string) => {
  if (!text || text.trim().length < 10) {
    throw new Error("Vacancy text is too short or empty");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!process.env.OPENAI_API_KEY) {
    return Schema.parse(fallbackParser(text));
  }

  try {
    const aiResult = await aiParser(text);
    return Schema.parse(aiResult);
  } catch (error) {
    console.error("Validation or Parsing error:", error);
    const fallbackResult = fallbackParser(text);
    return Schema.parse(fallbackResult);
  }
};
