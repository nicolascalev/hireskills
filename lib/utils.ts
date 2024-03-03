export function stringArraysAreEqual(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((value) => arr2.includes(value));
}

export function firstUpperCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const PROJECT_SORT_OPTIONS = {
  "Popular top": '{"likeCount": "desc"}',
  "Least popular top": '{"likeCount": "asc"}',
  "Newest top": '{"createdAt": "desc"}',
  "Oldest top": '{"createdAt": "asc"}',
};

export const PROJECT_DEFAULT_SORT = PROJECT_SORT_OPTIONS["Popular top"];

export const PROJECT_SORT_INPUT_OPTIONS = Object.entries(
  PROJECT_SORT_OPTIONS
).map(([label, value]) => ({
  label,
  value,
}));

export function isValidProjectSortOrDefault(value: string | null) {
  if (!value) return PROJECT_DEFAULT_SORT;
  return value in PROJECT_SORT_OPTIONS ? value : PROJECT_DEFAULT_SORT;
}

export const PROJECT_DEFAULT_LEVEL = ["basic", "intermediate", "advanced"];
