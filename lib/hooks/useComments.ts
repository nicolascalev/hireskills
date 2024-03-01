import useSWR from "swr";
import { fetcherWithConfig } from "../api";
import { CommentWithUser } from "../types";

export default function useComments(
  projectId: string,
  replyToId: string | null,
  cursor: string | undefined
) {
  const { data, isLoading, error } = useSWR(
    [
      `/api/projects/${projectId}/comments`,
      {
        params: {
          replyToId,
          cursor,
        },
      },
    ],
    fetcherWithConfig
  );

  const comments = data as CommentWithUser[] | null;
  const last = comments ? comments[comments.length - 1] : null;
  const nextCursor = last ? last.id : undefined;

  return {
    comments: data as CommentWithUser[],
    commentsLoading: isLoading,
    commentsError: error,
    commentsNextCursor: nextCursor,
  };
}
