import { ReadonlyURLSearchParams } from "next/navigation";
import useSWR from "swr";
import { basicFetcher } from "../api";
import { ProjectCardType } from "../types";

export default function useProjects(
  searchParams: ReadonlyURLSearchParams,
  cursor?: string,
  isSpotlight?: boolean
) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/projects?${searchParams.toString()}${
      cursor ? `&cursor=${cursor}` : ""
    }${isSpotlight !== undefined ? `&isSpotlight=${isSpotlight}` : ""}`,
    basicFetcher
  );

  return {
    projects: data as ProjectCardType[] | undefined,
    projectsError: error,
    projectsLoading: isLoading,
    projectsRevalidate: mutate,
  };
}
