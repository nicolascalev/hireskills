"use server";

import { projectSchema, projectSchemaType } from "@/lib/zod";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { LEVEL, Prisma } from "@prisma/client";

export async function createProject(formValues: projectSchemaType) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }

  const validatedFields = projectSchema.safeParse(formValues);
  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: "Validation error",
      fieldErrors,
    };
  }

  const tools = { connect: formValues.tools.map((tool) => ({ name: tool })) };
  const skills = {
    connect: formValues.skills.map((skill) => ({ name: skill })),
  };

  try {
    const createdProject =
      await prisma.project.create<Prisma.ProjectCreateArgs>({
        data: {
          ...formValues,
          tools,
          skills,
          developer: {
            connect: {
              id: userId,
            },
          },
        },
      });
    return {
      error: "",
      message: "Project created",
      projectId: createdProject.id,
    };
  } catch (err) {
    return {
      error: "Internal server error",
    };
  }
}

export async function updateProject(
  projectId: string,
  formValues: projectSchemaType
) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    const found = await prisma.project.findFirst({
      where: {
        developerId: userId,
      },
    });

    if (!found) {
      return {
        error: "Not found",
      };
    }

    if (found.developerId !== userId) {
      return {
        error: "Unauthorized",
      };
    }

    const validatedFields = projectSchema.safeParse(formValues);
    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      return {
        error: "Validation error",
        fieldErrors,
      };
    }

    const tools = { set: formValues.tools.map((tool) => ({ name: tool })) };
    const skills = {
      set: formValues.skills.map((skill) => ({ name: skill })),
    };

    const createdProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        ...formValues,
        tools,
        skills,
        developer: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return {
      error: "",
      message: "Project updated",
    };
  } catch (err) {
    return {
      error: "Internal server error",
    };
  }
}
