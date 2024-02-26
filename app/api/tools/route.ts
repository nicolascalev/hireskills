import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const exclude = searchParams.get("exclude")?.split(",") || [];
  try {
    const tools = await prisma.tool.findMany({
      where: {
        name: {
          contains: searchParams.get("searchString") || "",
        },
        NOT: {
          name: {
            in: exclude,
          },
        },
      },
      take: 10,
    });
    return Response.json(tools);
  } catch (err) {
    return new Response("Internal server error", { status: 500 });
  }
}
