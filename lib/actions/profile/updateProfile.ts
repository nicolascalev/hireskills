"use server";
import prisma from "@/lib/prisma";
import {
  linksAndSocialsSchema,
  profilePreferences,
  profileSchema,
} from "@/lib/zod";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: Prisma.UserUpdateInput) {
  const { userId } = auth();
  if (!userId) {
    return Promise.reject({
      message: "Not authenticated",
    });
  }

  const validatedFields = profileSchema.safeParse(formData);
  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return Promise.reject({
      message: "Validation error",
      fieldErrors,
    });
  }

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: validatedFields.data,
    });
    revalidatePath("/profile");
    return updated;
  } catch (err) {
    return Promise.reject({
      message: "Internal server error",
      error: err,
    });
  }
}

export async function updateProfileLinksAndSocials(
  formData: Prisma.UserUpdateInput
) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }

  const validatedFields = linksAndSocialsSchema.safeParse(formData);
  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: "Validation error",
      details: fieldErrors,
    };
  }

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: validatedFields.data,
    });
    revalidatePath("/profile");
    return {
      error: "",
      updated,
    };
  } catch (err) {
    return {
      error: "Internal server error",
      details: err,
    };
  }
}

export async function updateProfilePreferences(
  formData: Prisma.UserUpdateInput
) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }

  const validatedFields = profilePreferences.safeParse(formData);
  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: "Validation error",
      details: fieldErrors,
    };
  }

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: validatedFields.data,
    });
    revalidatePath("/profile");
    return {
      error: "",
      updated,
    };
  } catch (err) {
    return {
      error: "Internal server error",
      details: err,
    };
  }
}
