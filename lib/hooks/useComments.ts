import useSWR from "swr";
import { fetcherWithConfig } from "../api";
import { CommentWithUser } from "../types";

export default function useComments(
  shouldFetch: boolean,
  projectId: string,
  replyToId: string | null,
  cursor: string | undefined
) {
  const { data, isLoading, error } = useSWR(
    shouldFetch
      ? [
          `/api/projects/${projectId}/comments`,
          {
            params: {
              replyToId,
              cursor,
            },
          },
        ]
      : null,
    fetcherWithConfig
  );

  const comments = data as CommentWithUser[] | null;
  const last = comments ? comments[comments.length - 1] : null;

  return {
    comments: data as CommentWithUser[],
    commentsLoading: isLoading,
    commentsError: error,
  };
}
