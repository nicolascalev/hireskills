"use server";
import prisma from "@/lib/prisma";
import { profileSchema } from "@/lib/zod";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export default async function updateProfile(
  prevState: any,
  formData: FormData
) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("You must be signed in to update your profile.");
  }

  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = profileSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return fieldErrors;
  }

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: validatedFields.data,
    });
    revalidatePath("/profile");
    return updated;
  } catch (err) {
    throw new Error("Failed to update profile");
  }
}
