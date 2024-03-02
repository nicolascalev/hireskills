"use client";
import { AuthContext } from "@/lib/AuthContextProvider";
import { postComment } from "@/lib/actions/project/manageComments";
import useComments from "@/lib/hooks/useComments";
import { timeAgo } from "@/lib/moment";
import { CommentWithUser } from "@/lib/types";
import { commentSchema } from "@/lib/zod";
import {
  Anchor,
  Avatar,
  Box,
  Button,
  Group,
  Loader,
  Modal,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconArrowForward } from "@tabler/icons-react";
import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";

export default function Comment({
  comment,
  projectId,
  level,
}: {
  comment: CommentWithUser;
  projectId: string;
  level: number;
}) {
  const { user } = useContext(AuthContext);
  const isSignedIn = useMemo(() => !!user, [user]);
  const [openedReplyModal, { open: openReplyModal, close: closeReplyModal }] =
    useDisclosure(false);
  const [showReplies, { open: openShowReplies, toggle: toggleShowReplies }] =
    useDisclosure(false);
  const [replies, setReplies] = useState<CommentWithUser[]>([]);
  const [justPosted, setJustPosted] = useState<CommentWithUser[]>([]);
  const [count, setCount] = useState(comment._count.replies);
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  const {
    comments: loadedReplies,
    commentsLoading,
    commentsError,
    commentsNextCursor,
  } = useComments(showReplies, projectId, comment.id, cursor);

  useEffect(() => {
    if (loadedReplies) {
      setReplies((prev) => [...prev, ...loadedReplies]);
    }
  }, [loadedReplies]);

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
      setJustPosted((prev) => [res.comment as any, ...prev]);
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
        <Avatar
          size="sm"
          src={comment.user.avatarUrl}
          component={Link}
          href={`/developers/${comment.user.username}`}
        />
        <Group gap={0} align="end">
          <Anchor
            size="sm"
            fw="500"
            mr="xs"
            c="inherit"
            underline="never"
            component={Link}
            href={`/developers/${comment.user.username}`}
          >
            {comment.user.fullName}
          </Anchor>
          <Text size="xs" c="dimmed">
            {timeAgo(comment.createdAt)}
          </Text>
        </Group>
      </Group>
      <Text size="sm" my="xs" style={{ whiteSpace: "pre-wrap" }}>
        {comment.content}
      </Text>
      {level < 4 && (
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
      )}

      {showReplies && (
        <Stack
          pl="xl"
          my="sm"
          style={{
            borderLeft: "1px solid var(--mantine-color-default-border)",
          }}
        >
          {/* if the user posts a comment we add it on top in a separate list because
        if we add it to the comments list, every comment's index will increase and they will
        get the child comments from the previous index */}
          {justPosted.map((comment, i) => (
            <Comment
              key={i}
              projectId={projectId}
              comment={comment}
              level={1}
            />
          ))}
          {replies.map((reply, i) => (
            <Comment
              key={i}
              comment={reply}
              projectId={projectId}
              level={level + 1}
            />
          ))}
          {!commentsLoading &&
            replies.length === 0 &&
            justPosted.length == 0 && (
              <Text size="sm" c="dimmed">
                No replies yet
              </Text>
            )}
          {commentsLoading && (
            <Group>
              <Loader size="xs" />
              <Text size="sm">Loading...</Text>
            </Group>
          )}
          {commentsNextCursor && (
            <div>
              <Button
                size="xs"
                onClick={() => setCursor(commentsNextCursor)}
                loading={commentsLoading}
                variant="default"
                maw={400}
              >
                Load more replies
              </Button>
            </div>
          )}
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
