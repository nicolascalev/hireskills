"use server";
import prisma from "@/lib/prisma";
import { deleteFile } from "@/lib/storage";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export default async function deleteUserResume(resumeId: string) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    const found = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId,
      },
    });

    if (found) {
      // if it is the default resume for user then delete it
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (user?.defaultResumeId === resumeId) {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            defaultResumeId: null,
          },
        });
      }
      await prisma.resume.delete({
        where: {
          id: resumeId,
        },
      });

      await deleteFile(found.key);
      revalidatePath("/profile");
      return {
        error: "",
        message: "Resume deleted",
      };
    }
  } catch (err) {
    return {
      error: "Failed to delete resume",
      details: err,
    };
  }
}
