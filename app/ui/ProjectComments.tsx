"use client";
import { postComment } from "@/lib/actions/project/manageComments";
import { commentSchema } from "@/lib/zod";
import { useAuth } from "@clerk/nextjs";
import { Text, Textarea, Button, Group } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useFormStatus } from "react-dom";

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
      <pre>{JSON.stringify(comments, null, 2)}</pre>
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
