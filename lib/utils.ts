import { Prisma } from "@prisma/client";

export function stringArraysAreEqual(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((value) => arr2.includes(value));
}

export function firstUpperCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const DEFAULT_PAGE_SIZE = 15;

export const PROJECT_SORT_OPTIONS = new Map<
  string,
  Prisma.ProjectOrderByWithRelationInput
>([
  ["Popular top", { likeCount: "desc" }],
  ["Least popular top", { likeCount: "asc" }],
  ["Newest top", { createdAt: "desc" }],
  ["Oldest top", { createdAt: "asc" }],
]);

export const PROJECT_DEFAULT_SORT = "Newest top";

export const PROJECT_SORT_INPUT_OPTIONS = Array.from(
  PROJECT_SORT_OPTIONS.keys()
);

export function isValidProjectSortOrDefault(value: string | null) {
  if (!value) return PROJECT_DEFAULT_SORT;
  return PROJECT_SORT_OPTIONS.has(value) ? value : PROJECT_DEFAULT_SORT;
}

export const PROJECT_DEFAULT_LEVEL = ["basic", "intermediate", "advanced"];
