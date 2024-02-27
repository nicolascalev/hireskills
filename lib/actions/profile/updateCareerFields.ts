"use server";

import { Career, Education, Experience, LoggedInUser } from "@/lib/types";
import {
  achievementsSchema,
  educationSchema,
  experienceSchema,
} from "@/lib/zod";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
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

export async function updateEducation(formEducation: Education[]) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }

  const validatedFields = z.array(educationSchema).safeParse(formEducation);
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
      education: formEducation,
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

export async function updateAchievements(formAchievements: string[]) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }

  const validatedFields = achievementsSchema.safeParse(formAchievements);
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
      achievements: formAchievements,
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

export async function updateUserTools(formTools: string[]) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }

  // we don't need to validate tool format because we are not adding it to the database

  try {
    const user = (await getCurrentUser()) as LoggedInUser;
    await prisma.user.update({
      where: { id: user.id },
      data: {
        tools: {
          set: formTools.map((tool) => ({
            name: tool,
          })),
        },
      },
    });
    revalidatePath("/profile");
    return {
      error: "",
      message: "Tools updated",
    };
  } catch (err) {
    return {
      error: "Internal server error",
      details: err,
    };
  }
}
