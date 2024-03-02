import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();

  try {
    const project = await prisma.project.findFirst({
      where: {
        id: params.id,
      },
      select: {
        likeCount: true,
      },
    });

    const count = project?.likeCount || 0;

    if (userId) {
      const liked = await prisma.projectLike.findFirst({
        where: {
          projectId: params.id,
          userId: userId,
        },
      });
      return Response.json({
        count,
        liked: !!liked,
      });
    }
    return Response.json({
      count,
      liked: false,
    });
  } catch (err) {
    return new Response("Internal server error", { status: 500 });
  }
}
