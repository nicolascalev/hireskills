"use server";
import prisma from "@/lib/prisma";
import { profileSchema } from "@/lib/zod";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function updateProfile(formData: Prisma.UserUpdateInput) {
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
