export function stringArraysAreEqual(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((value) => arr2.includes(value));
}
