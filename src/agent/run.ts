import "dotenv/config";
import { generateText, type ModelMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import { tools } from "./tools/index.ts";
import { getTracer, Laminar } from "@lmnr-ai/lmnr";

import { SYSTEM_PROMPT } from "./system/prompt.ts";

import type { AgentCallbacks } from "../types.ts";
import { executeTool } from "./executeTools.ts";

const MODEL_NAME = "gpt-5-mini";

Laminar.initialize({
  projectApiKey: process.env.LMNR_PROJECT_API_KEY,
});

export async function runAgent(
  userMessage: string,
  conversationHistory: ModelMessage[],
  callbacks: AgentCallbacks,
): Promise<any> {
  const { text, toolCalls } = await generateText({
    model: openai(MODEL_NAME),
    prompt: userMessage,
    system: SYSTEM_PROMPT,
    tools,
    experimental_telemetry: {
      isEnabled: true,
      tracer: getTracer(),
    }
    //activeTools: [],
  });

  console.log(text, toolCalls);