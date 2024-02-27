import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const exclude = searchParams.get("exclude")?.split(",") || [];
  try {
    const skills = await prisma.skill.findMany({
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
      take: 5,
    });
    return Response.json(skills);
  } catch (err) {
    return new Response("Internal server error", { status: 500 });
  }
}
