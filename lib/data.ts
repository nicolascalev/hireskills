import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import { DeveloperCardType, ProjectCardType } from "./types";
import { Prisma, Spotlight } from "@prisma/client";

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

export async function getProjectsSample(where: Prisma.ProjectWhereInput) {
  noStore();
  try {
    const projects = (await prisma.project.findMany({
      where: {
        isPublic: true,
        ...where,
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
      orderBy: {
        createdAt: "desc",
      },
      take: 2,
    })) as ProjectCardType[];

    const count = await prisma.project.count({
      where: {
        isPublic: true,
        ...where,
      },
    });

    return { error: "", projects, count };
  } catch (err) {
    return {
      error: (err as any).message,
    };
  }
}

export async function getDevelopersSample(where: Prisma.UserWhereInput) {
  noStore();
  try {
    const developers = (await prisma.user.findMany({
      where,
      select: {
        id: true,
        username: true,
        fullName: true,
        avatarUrl: true,
        role: true,
        githubUsername: true,
        linkedinUsername: true,
        startedCoding: true,
        jobSeeking: true,
        displayJobSeeking: true,
        _count: {
          select: {
            projects: {
              where: {
                isPublic: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 2,
    })) as DeveloperCardType[];

    const count = await prisma.user.count({
      where,
    });

    return { error: "", developers, count };
  } catch (err) {
    return {
      error: (err as any).message,
    };
  }
}

// this gets the last created spotlight not this week's spotlight so
// you have to make sure you use a cron to create a new spotlight every week
export async function getWeekSpotlight() {
  noStore();
  try {
    const spotlight = (await prisma.spotlight.findFirst({
      orderBy: {
        startsAt: "desc",
      },
    })) as Spotlight;

    return {
      error: "",
      spotlight,
    };
  } catch (err) {
    return {
      error: (err as any).message,
    };
  }
}
