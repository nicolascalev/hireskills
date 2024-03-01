import { Box, Button, Group, Stack, Text, Avatar } from "@mantine/core";
import { IconArrowForward } from "@tabler/icons-react";
import { ReactNode } from "react";
import { timeAgo } from "@/lib/moment";

export default function Comment({
  comment,
  projectId,
  children,
}: {
  comment: any;
  projectId: string;
  children?: ReactNode;
}) {
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
        <Button size="xs" variant="transparent">
          5 replies
        </Button>
        <Button
          size="xs"
          variant="transparent"
          rightSection={<IconArrowForward size={14} />}
        >
          Reply
        </Button>
      </Group>
      {children ? (
        <Stack
          pl="xl"
          my="sm"
          style={{
            borderLeft: "1px solid var(--mantine-color-default-border)",
          }}
        >
          {children}
        </Stack>
      ) : null}
    </Box>
  );
}
