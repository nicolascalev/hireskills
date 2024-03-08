import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

const CRON_KEY = process.env.CRON_KEY;
if (!CRON_KEY) {
  throw new Error("Missing CRON_KEY");
}

export async function POST(request: NextRequest) {
  const { key } = await request.json();

  if (!key) {
    return new Response("Missing key", { status: 400 });
  }

  if (key !== CRON_KEY) {
    return new Response("Invalid key", { status: 401 });
  }

  try {
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

    const spotlight = await prisma.spotlight.create({
      data: {
        startsAt,
        finishesAt,
      },
    });

    return Response.json(spotlight);
  } catch (err) {
    console.error("ERR_CRON_RESTART_SPOTLIGHT", err);
    return new Response((err as any).message, { status: 500 });
  }
}
