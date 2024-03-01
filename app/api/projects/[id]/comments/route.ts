import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, params: { id: string }) {
  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get("cursor");
  const replyToId = searchParams.get("replyToId");
  try {
    const comments = await prisma.projectComment.findMany({
      where: {
        projectId: params.id,
        repliedToId: replyToId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
            avatarUrl: true,
          },
        },
      },
      skip: cursor ? 1 : 0,
      take: 1,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
    });
    return Response.json(comments);
  } catch (err) {
    return new Response("Internal server error", { status: 500 });
  }
}
