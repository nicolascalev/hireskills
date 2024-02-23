"use server";
import prisma from "@/lib/prisma";
import { profileSchema } from "@/lib/zod";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import uploadSingleFile from "../upload";

export default async function updateProfile(formData: FormData) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }

  const file = formData.get("photo") as File;

  if (!file) {
    return {
      error: "No photo provided",
    };
  }

  if (file.size / 1024 / 1000 > 4) {
    return { error: "The file is bigger than " + 4 + "MB" };
  }

  try {
    const photo = await uploadSingleFile({
      size: file.size,
      mimetype: file.type,
      originalFilename: file.name,
      buffer: Buffer.from(await file.arrayBuffer()),
    });
    await prisma.user.update({
      where: { id: userId },
      data: {
        avatarUrl: photo.url,
      },
    });
    revalidatePath("/profile");
    return {
      error: "",
      message: "Photo uploaded",
    };
  } catch (err) {
    return {
      error: "Failed to upload photo",
      details: err,
    };
  }
}
