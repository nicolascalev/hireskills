import prisma from "@/lib/prisma";
import { DEFAULT_PAGE_SIZE, getDateRanges } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get("cursor");

  const name = searchParams.get("name");
  const role = searchParams.get("role");
  const yearsCoding = searchParams.getAll("yearsCoding");
  const skills = searchParams.getAll("skills");
  const tools = searchParams.getAll("tools");
  const onlyQueryJobSeeking =
    searchParams.get("isJobSeeking") === "true" ? true : undefined;

  const dateRangesFilters = getDateRanges(yearsCoding);

  try {
    const developers = await prisma.user.findMany({
      where: {
        fullName: name
          ? {
              contains: name,
            }
          : undefined,
        role: role
          ? {
              contains: role,
            }
          : undefined,
        skills:
          skills.length > 0
            ? {
                some: {
                  name: {
                    in: skills,
                  },
                },
              }
            : undefined,
        tools:
          tools.length > 0
            ? {
                some: {
                  name: {
                    in: tools,
                  },
                },
              }
            : undefined,
        jobSeeking: onlyQueryJobSeeking,
        OR: dateRangesFilters,
      },
      take: DEFAULT_PAGE_SIZE,
      skip: cursor ? 1 : 0,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
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
    });
    return Response.json(developers);
  } catch (err) {
    return new Response("Internal server error", { status: 500 });
  }
}
