"use server";

import { Career, Experience, LoggedInUser } from "@/lib/types";
import { experienceSchema } from "@/lib/zod";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateExperience(formExperience: Experience[]) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }

  const validatedFields = z.array(experienceSchema).safeParse(formExperience);
  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: "Validation error",
      fieldErrors,
    };
  }

  try {
    const user = (await getCurrentUser()) as LoggedInUser;
    const updatedCareer = {
      ...(user.career as Career),
      experience: formExperience,
    };
    await prisma.user.update({
      where: { id: user.id },
      data: {
        career: updatedCareer,
      },
    });
    revalidatePath("/profile");
    return {
      error: "",
    };
  } catch (err) {
    return {
      error: "Internal server error",
      details: err,
    };
  }
}
