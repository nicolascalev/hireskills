"use server";
import { commentSchema, commentSchemaType } from "@/lib/zod";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export async function postComment(
  projectId: string,
  formValues: commentSchemaType,
  replyTo?: string
) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    // check if project exists
    const found = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!found) {
      return {
        error: "Project not found",
      };
    }

    // if repliedTo is provided, check if it exists
    if (replyTo) {
      const foundParentComment = await prisma.projectComment.findUnique({
        where: {
          id: replyTo,
        },
      });

      if (!foundParentComment) {
        return {
          error: "Parent comment not found, it was deleted.",
        };
      }
    }

    // validate comment
    const validatedFields = commentSchema.safeParse(formValues);
    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      return {
        error: "Validation error",
        fieldErrors,
      };
    }

    // create comment
    const createdComment = await prisma.projectComment.create({
      data: {
        content: formValues.content,
        project: {
          connect: {
            id: projectId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        repliedTo: replyTo
          ? {
              connect: {
                id: replyTo,
              },
            }
          : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
            avatarUrl: true,
          },
        },
      },
    });

    return {
      error: "",
      message: "Comment created",
      comment: createdComment,
    };
  } catch (err) {
    return {
      error: "Internal server error",
    };
  }
}
