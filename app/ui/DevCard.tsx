import { onlyTimeAgo } from "@/lib/moment";
import { DeveloperCardType } from "@/lib/types";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Card,
  Group,
  Stack,
  Text
} from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import Link from "next/link";

function DevCard({ developer }: { developer: DeveloperCardType }) {
  return (
    <Card withBorder>
      <Stack gap="sm">
        <Anchor
          underline="never"
          c="inherit"
          component={Link}
          href={`/developers/${developer.username}`}
        >
          <Avatar src={developer.avatarUrl} mb="xs" />
          <div>
            <Text fw={500}>{developer.fullName}</Text>
            {developer.role && (
              <Text size="sm" c="dimmed">
                {developer.role}
              </Text>
            )}
          </div>
        </Anchor>
        <Group justify="space-between" align="center" gap="xs">
          <Group>
            {developer.startedCoding && (
              <Text size="sm">{onlyTimeAgo(developer.startedCoding)}</Text>
            )}
            <Text size="sm">{developer._count.projects} projects</Text>
            {developer.jobSeeking && developer.displayJobSeeking && (
              <Text size="sm">Job seeking</Text>
            )}
          </Group>
          <Group gap="xs" justify="end" className="flex-grow-1">
            {developer.linkedinUsername && (
              <ActionIcon
                variant="default"
                component="a"
                href={`https://linkedin.com/in/${developer.linkedinUsername}`}
                target="_blank"
              >
                <IconBrandLinkedin style={{ width: "60%", height: "60%" }} />
              </ActionIcon>
            )}
            {developer.githubUsername && (
              <ActionIcon
                variant="default"
                component="a"
                href={`https://github.com/${developer.githubUsername}`}
                target="_blank"
              >
                <IconBrandGithub style={{ width: "60%", height: "60%" }} />
              </ActionIcon>
            )}
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}

export default DevCard;
