import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod.js";
import { Schema } from "./schema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const aiParser = async (text: string) => {
  const response = await openai.responses.parse({
    model: "gpt-5-mini",
    input: [
      {
        role: "developer",
        content: "Extract structured data from the job description.",
      },
      {
        role: "user",
        content: text,
      },
    ],
    text: {
      format: zodTextFormat(Schema, "MatrixSchema"),
    },
  });

  return response.output_parsed;
};

export default aiParser;
