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

export const DEVELOPER_DEFAULT_EXPERIENCE = [
  "lt1",
  "1to3",
  "3to5",
  "5to10",
  "gt10",
];

// a function that returns the intersection of two arrays
export function intersect(a: string[], b: string[]) {
  return a.filter((value) => b.includes(value));
}

// a function that checks if every item of userInput is in DEVELOPER_DEFAULT_EXPERIENCE
export function userInputAllowsAllExperience(userInput: string[]) {
  for (let i = 0; i < DEVELOPER_DEFAULT_EXPERIENCE.length; i++) {
    if (!DEVELOPER_DEFAULT_EXPERIENCE.includes(userInput[i])) {
      return false;
    }
  }
  return true;
}

export function getDateRanges(
  userInput: string[]
): undefined | Prisma.UserWhereInput[] {
  // only take valid dates from user input
  const intersection = intersect(userInput, DEVELOPER_DEFAULT_EXPERIENCE);

  // if the userInput length is 0 then return undefined, if the userInput has every value in DEVELOPER_DEFAULT_EXPERIENCE return undefined
  // otherwise return the intersection
  if (userInput.length === 0 || userInputAllowsAllExperience(intersection)) {
    return undefined;
  }

  const dateRangesFilters: Prisma.UserWhereInput[] = [];
  // For less than one year, calculate the date one year ago
  if (intersection.includes("lt1")) {
    const now = new Date();
    now.setFullYear(now.getFullYear() - 1);
    dateRangesFilters.push({ startedCoding: { gte: now } });
  }

  // for 1 to 3 years, calculate the date 3 years ago and the date 1 year ago and return the range
  if (intersection.includes("1to3")) {
    const now = new Date();
    now.setFullYear(now.getFullYear() - 1);
    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
    dateRangesFilters.push({ startedCoding: { gte: threeYearsAgo, lt: now } });
  }

  // for 3 to 5 years, calculate the date 5 years ago and the date 3 years ago and return the range
  if (intersection.includes("3to5")) {
    const now = new Date();
    now.setFullYear(now.getFullYear() - 3);
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
    dateRangesFilters.push({ startedCoding: { gte: fiveYearsAgo, lt: now } });
  }

  // for 5 to 10 years, calculate the date 10 years ago and the date 5 years ago and return the range
  if (intersection.includes("5to10")) {
    const now = new Date();
    now.setFullYear(now.getFullYear() - 5);
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
    dateRangesFilters.push({ startedCoding: { gte: tenYearsAgo, lt: now } });
  }

  // for greater than 10 years, calculate the date 10 years ago
  if (intersection.includes("gt10")) {
    const now = new Date();
    now.setFullYear(now.getFullYear() - 10);
    dateRangesFilters.push({ startedCoding: { lt: now } });
  }

  return dateRangesFilters;
}
