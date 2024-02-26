"use server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { z } from "zod";

export async function createTool(name: string) {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Not authenticated",
    };
  }
  try {
    const exists = await prisma.tool.findFirst({
      where: {
        name,
      },
    });
    if (exists) {
      return {
        error: "",
        message: "Tool already exists",
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
    await prisma.tool.create({
      data: {
        name,
      },
    });
    return {
      error: "",
      message: "Tool created",
    };
  } catch (err) {
    return {
      error: "Internal server error",
      details: err,
    };
  }
}
