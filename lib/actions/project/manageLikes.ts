"use server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function likeProject(projectId: string, like: boolean) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    if (like == true) {
      await prisma.projectLike.create({
        data: {
          userId: userId,
          projectId: projectId,
        },
      });
      await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      });
      return {
        error: "",
        message: "Project liked",
      };
    }
    await prisma.projectLike.deleteMany({
      where: {
        userId: userId,
        projectId: projectId,
      },
    });
    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        likeCount: {
          decrement: 1,
        },
      },
    });
    return {
      error: "",
      message: "Project unliked",
    };
  } catch (err) {
    return {
      error: "Internal server error",
    };
  }
}
