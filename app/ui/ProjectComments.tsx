"use client";
import { postComment } from "@/lib/actions/project/manageComments";
import useComments from "@/lib/hooks/useComments";
import { commentSchema } from "@/lib/zod";
import { useAuth } from "@clerk/nextjs";
import { Button, Group, Stack, Text, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import ProjectComment from "./ProjectComment";

function ProjectComments({
  projectId,
  commentCount,
}: {
  projectId: string;
  commentCount: number;
}) {
  const { isSignedIn } = useAuth();
  const [comments, setComments] = useState<any[]>([]);
  const [count, setCount] = useState(commentCount);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const {
    comments: loadedComments,
    commentsLoading,
    commentsError,
    commentsNextCursor,
  } = useComments(projectId, null, cursor);

  useEffect(() => {
    if (loadedComments) {
      setComments((prev) => [...prev, ...loadedComments]);
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
      setComments([res.comment as any, ...comments]);
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
        {comments.map((comment, i) => (
          <ProjectComment key={i} projectId={projectId} comment={comment} />
        ))}
        {commentsNextCursor && (
          <Group justify="center" grow>
            <Button
              size="xs"
              onClick={() => setCursor(commentsNextCursor)}
              loading={commentsLoading}
              variant="default"
              maw={400}
            >
              Load more
            </Button>
          </Group>
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
