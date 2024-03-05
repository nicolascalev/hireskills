import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import { ProjectCardType } from "./types";

export async function getDeveloperProjects(developerId: string) {
  noStore();
  try {
    const projects = (await prisma.project.findMany({
      where: {
        developerId,
        isPublic: true,
      },
      include: {
        skills: true,
        tools: true,
        developer: {
          select: {
            id: true,
            username: true,
            fullName: true,
            avatarUrl: true,
            role: true,
          },
        },
      },
      orderBy: [
        {
          likeCount: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    })) as ProjectCardType[];
    return { error: "", projects };
  } catch (err) {
    return {
      error: (err as any).message,
    };
  }
}
