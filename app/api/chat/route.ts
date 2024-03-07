import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import prisma from "@/lib/prisma";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { messages, developerId } = body;

  if (!developerId) {
    return new Response("Missing developerId", { status: 400 });
  }

  const developerObject = await prisma.user.findUnique({
    where: {
      id: developerId,
    },
    include: {
      projects: {
        where: {
          isPublic: true,
        },
        select: {
          label: true,
          summary: true,
          publishDate: true,
          tools: true,
          skills: true,
          isUsedByPeople: true,
          level: true,
          likeCount: true,
          timeSpent: true,
          codeRepository: true,
          url: true,
        },
      },
      tools: true,
      skills: true,
    },
  });

  if (!developerObject) {
    return new Response("Developer not found", { status: 404 });
  }

  // delete developerObject.email
  delete (developerObject as { email?: string }).email;

  const promptMessages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "I'm an AI that gives you information relevant to your question. You can provide the JSON object of a developer's portfolio and I will give you the information that is important to you. I give you all the information relevant to your questions. If the developer does not have the experience, I say so.",
    },
    {
      role: "user",
      content: "Here's the object of the developer's portfolio:",
    },
    {
      role: "user",
      content: JSON.stringify(developerObject),
    },
    ...messages,
  ];

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: promptMessages,
    max_tokens: 4000,
    temperature: 0.2,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
