"use client";
import { AuthContext } from "@/lib/AuthContextProvider";
import { likeProject } from "@/lib/actions/project/manageLikes";
import { useProjectLikes } from "@/lib/hooks/useProjectLikes";
import { Group, Text, ActionIcon } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useContext, useEffect, useMemo, useState } from "react";

function ProjectLikeButton({ projectId }: { projectId: string }) {
  const { user } = useContext(AuthContext);
  const isSignedIn = useMemo(() => !!user, [user]);
  const [liked, setLiked] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const {
    liked: likedByUser,
    likeCount,
    likeCountLoading,
    likeCountRevalidate,
  } = useProjectLikes(projectId);

  useEffect(() => {
    if (typeof likedByUser === "boolean") {
      setLiked(likedByUser);
    }
  }, [likedByUser]);

  const loading = useMemo(
    () => loadingAction || likeCountLoading,
    [loadingAction, likeCountLoading]
  );

  async function toggleLike() {
    if (!isSignedIn) {
      showNotification({
        title: "You need to be signed in to like a project",
        message: "Sign in or create an account to like a project",
        color: "red",
      });
      return;
    }

    setLoadingAction(true);
    try {
      const res = await likeProject(projectId, !liked);
      if (res.error) {
        showNotification({
          title: "Failed to like project",
          message: res.error,
          color: "red",
        });
        return;
      }
      setLiked(!liked);
      likeCountRevalidate();
    } catch (err) {
      showNotification({
        title: "Failed to like project",
        message: "Try again later",
        color: "red",
      });
    } finally {
      setLoadingAction(false);
    }
  }

  return (
    <Group gap={3} wrap="nowrap">
      {/* TODO: load users who liked the project */}
      <Text size="xs" fw={500}>
        {likeCount}
      </Text>
      <ActionIcon
        size={30}
        variant="transparent"
        color={
          liked && !loading
            ? "var(--mantine-color-red-6)"
            : "var(--mantine-color-text)"
        }
        loading={loading}
        onClick={toggleLike}
        className="like__button"
      >
        {liked ? <IconHeartFilled size={14} /> : <IconHeart size={14} />}
      </ActionIcon>
    </Group>
  );
}

export default ProjectLikeButton;
