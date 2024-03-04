import prisma from "@/lib/prisma";
import {
  DEFAULT_PAGE_SIZE,
  PROJECT_DEFAULT_SORT,
  PROJECT_SORT_OPTIONS,
  isValidProjectSortOrDefault,
} from "@/lib/utils";
import { LEVEL } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get("cursor");

  const sort = isValidProjectSortOrDefault(searchParams.get("sort"));
  const search = searchParams.get("search");
  const level = searchParams.getAll("level");
  const skills = searchParams.getAll("skills");
  const tools = searchParams.getAll("tools");
  const onlyQueryUsedByPeople =
    searchParams.get("isUsedByPeople") === "true" ? true : undefined;
  const onlyQueryVerified =
    searchParams.get("isVerified") === "true" ? true : undefined;

  const parsedSort = PROJECT_SORT_OPTIONS.has(sort)
    ? PROJECT_SORT_OPTIONS.get(sort)
    : PROJECT_SORT_OPTIONS.get(PROJECT_DEFAULT_SORT);

  try {
    const projects = await prisma.project.findMany({
      where: {
        isPublic: true,
        label: !search
          ? undefined
          : {
              contains: search,
            },
        summary: !search
          ? undefined
          : {
              contains: search,
            },
        level:
          level.length === 0
            ? undefined
            : {
                in: level as LEVEL[],
              },
        skills:
          skills.length === 0
            ? undefined
            : {
                some: {
                  name: {
                    in: skills,
                  },
                },
              },
        tools:
          tools.length === 0
            ? undefined
            : {
                some: {
                  name: {
                    in: tools,
                  },
                },
              },
        isUsedByPeople: onlyQueryUsedByPeople,
        isVerified: onlyQueryVerified,
      },
      orderBy: parsedSort,
      take: DEFAULT_PAGE_SIZE,
      skip: cursor ? 1 : 0,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
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
    });
    return Response.json(projects);
  } catch (err) {
    return new Response("Internal server error", { status: 500 });
  }
}
