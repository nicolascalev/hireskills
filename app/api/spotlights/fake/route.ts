import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

const CRON_KEY = process.env.CRON_KEY;
if (!CRON_KEY) {
  throw new Error("Missing CRON_KEY");
}

// this is an endpoint that is only accessible by the cron job
// we will use to fake weekly spotlight participants
// if this projects was a real app in production this endpoint would not be necessary
// but as a portfolio project, it's useful to have a way to fake spotlight participants every week
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { key, userIdsForSpotlight } = body;

  if (!key) {
    return new Response("Missing key", { status: 400 });
  }

  if (key !== CRON_KEY) {
    return new Response("Invalid key", { status: 401 });
  }

  try {
    // check that the userIdsForSpotlight are for existing users
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIdsForSpotlight,
        },
        jobSeeking: true,
      },
      select: {
        id: true,
      },
    });

    // check that every userIdsForSpotlight is in users[]
    for (const userId of userIdsForSpotlight) {
      if (!users.find((user) => user.id === userId)) {
        return new Response(
          `User with id ${userId} that's also job seeking not found`,
          {
            status: 404,
          }
        );
      }
    }

    // reset all user spotlight participant status
    await prisma.user.updateMany({
      where: {
        isSpotlightParticipant: true,
      },
      data: {
        isSpotlightParticipant: false,
      },
    });

    // create a new spotlight week
    const startsAt = new Date();
    //  finishes one week after startsAt
    const finishesAt = new Date(startsAt.getTime() + 7 * 24 * 60 * 60 * 1000);

    // get job seeking users that have at least one project
    const jobSeekingUsers = await prisma.user.findMany({
      where: {
        jobSeeking: true,
        projects: {
          some: {
            isPublic: true,
          },
        },
      },
      select: {
        id: true,
      },
    });

    // select a random subset of size 10 from jobSeekingUsers to be spotlight participants
    const randomSubset = jobSeekingUsers
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    const allSpotlightParticipants = [...users, ...randomSubset];

    const spotlight = await prisma.spotlight.create({
      data: {
        startsAt,
        finishesAt,
        participants: {
          connect: allSpotlightParticipants,
        },
      },
      include: {
        _count: {
          select: {
            participants: true,
          },
        },
      },
    });

    // update users status to be spotlight participants
    await prisma.user.updateMany({
      where: {
        id: {
          in: allSpotlightParticipants.map((user) => user.id),
        },
      },
      data: {
        isSpotlightParticipant: true,
      },
    });

    return Response.json(spotlight);
  } catch (err) {
    console.error("ERR_CRON_FAKE_RESTART_SPOTLIGHT", err);
    return new Response((err as any).message, { status: 500 });
  }
}
