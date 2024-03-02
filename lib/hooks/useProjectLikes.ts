import useSWR from "swr";
import { basicFetcher } from "../api";

export function useProjectLikes(projectId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/projects/${projectId}/liked`,
    basicFetcher
  );

  return {
    liked: data?.liked,
    likeCount: data?.count || 0,
    likeCountError: error,
    likeCountLoading: isLoading,
    likeCountRevalidate: mutate,
  };
}
