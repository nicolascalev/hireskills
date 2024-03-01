"use client";
import {
  Box,
  Button,
  Group,
  Stack,
  Text,
  Avatar,
  Modal,
  Textarea,
} from "@mantine/core";
import { IconArrowForward } from "@tabler/icons-react";
import { ReactNode, useState } from "react";
import { timeAgo } from "@/lib/moment";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { CommentWithUser } from "@/lib/types";
import { useForm, zodResolver } from "@mantine/form";
import { commentSchema } from "@/lib/zod";
import { useAuth } from "@clerk/nextjs";
import { showNotification } from "@mantine/notifications";
import { postComment } from "@/lib/actions/project/manageComments";
import { useFormStatus } from "react-dom";

export default function Comment({
  comment,
  projectId,
}: {
  comment: CommentWithUser;
  projectId: string;
}) {
  const { isSignedIn } = useAuth();
  const [openedReplyModal, { open: openReplyModal, close: closeReplyModal }] =
    useDisclosure(false);
  const [
    showReplies,
    {
      open: openShowReplies,
      toggle: toggleShowReplies,
    },
  ] = useDisclosure(false);
  const [replies, setReplies] = useState<CommentWithUser[]>([]);
  const [count, setCount] = useState(comment._count.replies);
  const [cursor, setCursor] = useState<string | undefined>(undefined);

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
      const res = await postComment(projectId, form.values, comment.id);
      if (res.error) {
        showNotification({
          title: res.error,
          message: "Failed to post comment",
          color: "red",
        });
        return;
      }
      openShowReplies();
      setReplies([res.comment as any, ...replies]);
      setCount(count + 1);
      form.reset();
      closeReplyModal();
    } catch (err) {
      showNotification({
        title: "Failed to post comment",
        message: "An error occurred while posting your comment",
        color: "red",
      });
    }
  }

  return (
    <Box>
      <Group wrap="nowrap" gap="xs">
        <Avatar size="sm" src={comment.user.avatarUrl} />
        <Group gap={0} align="end">
          <Text size="sm" fw="500" mr="xs">
            {comment.user.fullName}
          </Text>
          <Text size="xs" c="dimmed">
            {timeAgo(comment.createdAt)}
          </Text>
        </Group>
      </Group>
      <Text size="sm" my="xs" style={{ whiteSpace: "pre-wrap" }}>
        {comment.content}
      </Text>
      <Group align="center">
        <Button
          size="xs"
          variant="transparent"
          onClick={() => toggleShowReplies()}
        >
          {count} replies
        </Button>
        <Button
          size="xs"
          variant="transparent"
          rightSection={<IconArrowForward size={14} />}
          onClick={() => openReplyModal()}
        >
          Reply
        </Button>
      </Group>
      {showReplies && (
        <Stack
          pl="xl"
          my="sm"
          style={{
            borderLeft: "1px solid var(--mantine-color-default-border)",
          }}
        >
          {replies.map((reply, i) => (
            <Comment key={i} comment={reply} projectId={projectId} />
          ))}
        </Stack>
      )}

      <Modal
        opened={openedReplyModal}
        onClose={closeReplyModal}
        title="Reply to comment"
      >
        <form action={onSubmitComment}>
          <Stack>
            <div>
              <Group wrap="nowrap" gap="xs">
                <Avatar size="sm" src={comment.user.avatarUrl} />
                <Group gap={0} align="end">
                  <Text size="sm" fw="500" mr="xs">
                    {comment.user.fullName}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {timeAgo(comment.createdAt)}
                  </Text>
                </Group>
              </Group>
              <Text size="sm" my="xs" style={{ whiteSpace: "pre-wrap" }}>
                {comment.content}
              </Text>
            </div>
            <Textarea
              placeholder="Type response..."
              minRows={2}
              autosize
              {...form.getInputProps("content")}
            />
            <Group justify="end">
              <SubmitButton />
            </Group>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="xs" type="submit" aria-disabled={pending} loading={pending}>
      Send
    </Button>
  );
}
