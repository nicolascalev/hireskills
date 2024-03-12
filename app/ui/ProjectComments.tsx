"use client";
import { AuthContext } from "@/lib/AuthContextProvider";
import { postComment } from "@/lib/actions/project/manageComments";
import useComments from "@/lib/hooks/useComments";
import { CommentWithUser } from "@/lib/types";
import { commentSchema } from "@/lib/zod";
import { Button, Group, Loader, Stack, Text, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useContext, useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import ProjectComment from "./ProjectComment";
import { DEFAULT_PAGE_SIZE } from "@/lib/utils";
import MessageCard from "./MessageCard";
import { IconMessageOff } from "@tabler/icons-react";

function ProjectComments({
  projectId,
  commentCount,
}: {
  projectId: string;
  commentCount: number;
}) {
  const { user } = useContext(AuthContext);
  const isSignedIn = useMemo(() => !!user, [user]);
  const [comments, setComments] = useState<CommentWithUser[]>([]);
  const [justPosted, setJustPosted] = useState<CommentWithUser[]>([]);
  const [count, setCount] = useState(commentCount);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const {
    comments: loadedComments,
    commentsLoading,
    commentsError,
  } = useComments(true, projectId, null, cursor);

  useEffect(() => {
    if (loadedComments) {
      setComments((prev) => [...prev, ...loadedComments]);
      if (loadedComments.length == DEFAULT_PAGE_SIZE) {
        setNextCursor(loadedComments[loadedComments.length - 1].id);
      } else {
        setNextCursor(undefined);
      }
    }
  }, [loadedComments]);

  const form = useForm({
    initialValues: {
      content: "",
    },
    validate: zodResolver(commentSchema),
    validateInputOnChange: true,
  });

  async function onSubmitComment() {
    if (!isSignedIn) {
      showNotification({
        title: "Please sign in to comment",
        message: "You must be signed in to comment",
        color: "blue",
      });
      return;
    }
    if (form.validate().hasErrors) {
      showNotification({
        title: "Invalid comment",
        message: "Comment must be between 1 and 1000 characters",
        color: "red",
      });
      return;
    }
    try {
      const res = await postComment(projectId, form.values);
      if (res.error) {
        showNotification({
          title: res.error,
          message: "Failed to post comment",
          color: "red",
        });
        return;
      }
      setJustPosted((prev) => [res.comment as any, ...prev]);
      setCount(count + 1);
      form.reset();
    } catch (err) {
      showNotification({
        title: "Failed to post comment",
        message: "An error occurred while posting your comment",
        color: "red",
      });
    }
  }

  return (
    <div>
      <Text fw={500} mb="sm">
        Comments {count}
      </Text>
      <form action={onSubmitComment}>
        <Textarea
          size="sm"
          placeholder="Type comment..."
          autosize
          minRows={2}
          mb="sm"
          {...form.getInputProps("content")}
        />
        <Group justify="end">
          <SubmitButton />
        </Group>
      </form>
      <Stack>
        {/* if the user posts a comment we add it on top in a separate list because
        if we add it to the comments list, every comment's index will increase and they will
        get the child comments from the previous index */}
        {justPosted.map((comment, i) => (
          <ProjectComment
            key={i}
            projectId={projectId}
            comment={comment}
            level={1}
          />
        ))}
        {comments.map((comment, i) => (
          <ProjectComment
            key={i}
            projectId={projectId}
            comment={comment}
            level={1}
          />
        ))}
        {!commentsLoading &&
          comments.length === 0 &&
          justPosted.length == 0 && (
            <Text size="sm" c="dimmed">
              No comments yet
            </Text>
          )}
        {commentsLoading && (
          <Group>
            <Loader size="xs" />
            <Text size="sm">Loading comments...</Text>
          </Group>
        )}
        {nextCursor && !commentsLoading && (
          <Group justify="center" grow>
            <Button
              size="xs"
              onClick={() => setCursor(nextCursor)}
              variant="default"
              maw={400}
            >
              Load more comments
            </Button>
          </Group>
        )}
        {!loadedComments && commentsError && (
          <MessageCard
            icon={<IconMessageOff />}
            title="Error loading comments"
            message="Please try again later"
          />
        )}
      </Stack>
    </div>
  );
}

export default ProjectComments;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="xs" type="submit" aria-disabled={pending} loading={pending}>
      Post
    </Button>
  );
}
