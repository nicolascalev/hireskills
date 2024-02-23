"use server";
import prisma from "@/lib/prisma";
import uploadSingleFile from "@/lib/upload";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export default async function uploadUserResume(formData: FormData) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }

  const file = formData.get("file") as File;

  if (!file) {
    return {
      error: "No file provided",
    };
  }

  if (!file.type.includes("pdf")) {
    return {
      error: "Only PDF files are allowed",
    };
  }

  if (file.size / 1024 / 1000 > 4) {
    return { error: "The file is bigger than " + 4 + "MB" };
  }

  try {
    const resume = await uploadSingleFile({
      size: file.size,
      mimetype: file.type,
      originalFilename: file.name,
      buffer: Buffer.from(await file.arrayBuffer()),
    });
    await prisma.user.update({
      where: { id: userId },
      data: {
        resumes: {
          create: {
            url: resume.url,
            originalFilename: resume.originalFilename,
            key: resume.key,
          }
        }
      }
    });
    revalidatePath("/profile");
    return {
      error: "",
      message: "Resume uploaded",
    };
  } catch (err) {
    return {
      error: "Failed to upload resume",
      details: err,
    };
  }
}
