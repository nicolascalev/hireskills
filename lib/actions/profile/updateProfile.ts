"use server";
import prisma from "@/lib/prisma";
import {
  linksAndSocialsSchema,
  profilePreferences,
  profileSchema,
  updateDefaultResumeSchema,
} from "@/lib/zod";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: Prisma.UserUpdateInput) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }

  const validatedFields = profileSchema.safeParse(formData);
  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: "Validation error",
      fieldErrors,
    };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: validatedFields.data,
    });
    revalidatePath("/profile");
    return {
      error: "",
      message: "Profile updated",
    };
  } catch (err) {
    const error: any = err;
    if (error.code === "P2002") {
      return {
        error: "Username already taken",
        code: "P2002",
      };
    }
    return {
      error: "Internal server error",
    };
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

export async function updateDefaultResume(formData: Prisma.UserUpdateInput) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }

  const validatedFields = updateDefaultResumeSchema.safeParse(formData);
  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: "Validation error",
      details: fieldErrors,
    };
  }

  try {
    // if the resume id is provided, make sure it exists and belongs to the user
    if (formData.defaultResumeId) {
      const found = await prisma.resume.findUnique({
        where: {
          id: formData.defaultResumeId as string,
        },
      });
      if (!found || found.userId !== userId) {
        return {
          error: "Resume not found",
        };
      }
    }

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
