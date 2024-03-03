import { ReadonlyURLSearchParams } from "next/navigation";
import useSWR from "swr";
import { basicFetcher } from "../api";
import { ProjectCardType } from "../types";

export default function useProjects(
  searchParams: ReadonlyURLSearchParams,
  cursor?: string
) {
  const { data, error, isLoading } = useSWR(
    `/api/projects?${searchParams.toString()}${
      cursor ? `&cursor=${cursor}` : ""
    }`,
    basicFetcher
  );

  return {
    projects: data as ProjectCardType[] | undefined,
    projectsError: error,
    projectsLoading: isLoading,
  };
}
