"use server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { z } from "zod";

export async function createSkill(name: string) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }
  try {
    const exists = await prisma.skill.findFirst({
      where: {
        name,
      },
    });
    if (exists) {
      return {
        error: "",
        message: "Skill already exists",
      };
    }
    // validate the parameter
    const validName = z.string().min(1).max(50).safeParse(name);
    if (!validName.success) {
      return {
        error: "Validation error",
        fieldErrors: validName.error.flatten().fieldErrors,
      };
    }

    // create
    await prisma.skill.create({
      data: {
        name,
      },
    });
    return {
      error: "",
      message: "Skill created",
    };
  } catch (err) {
    return {
      error: "Internal server error",
      details: err,
    };
  }
}

export async function findAllSkills() {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    const skills = await prisma.skill.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    return {
      error: "",
      skills,
    };
  } catch (err) {
    return {
      error: "Internal server error",
      details: err,
    };
  }
}
