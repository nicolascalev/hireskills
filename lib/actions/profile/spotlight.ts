"use server";

import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Spotlight } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function joinSpotlight() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        error: "You need to be logged in to join the spotlight",
      };
    }

    if (!user.jobSeeking) {
      return {
        error:
          "The spotlight is only for developers who are currently looking for new opportunities.",
      };
    }

    if (user.isSpotlightParticipant) {
      return {
        error: "You are already a participant in this week's spotlight",
      };
    }

    // get the last spotlight (this week's spotlight) is the cron job ran successfully
    const spotlight = (await prisma.spotlight.findFirst({
      orderBy: {
        startsAt: "desc",
      },
    })) as Spotlight;

    // join spotlight
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isSpotlightParticipant: true,
        joinedSpotlights: {
          connect: {
            id: spotlight.id,
          },
        },
      },
    });

    revalidatePath("/spotlight");
    return {
      error: "",
      message: "You have successfully joined this week's spotlight",
    };
  } catch (err) {
    return {
      error: (err as any).message,
    };
  }
}
