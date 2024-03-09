import { ProjectCardType } from "@/lib/types";
import { firstUpperCase } from "@/lib/utils";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconRosetteFilled,
  IconStar,
} from "@tabler/icons-react";
import Link from "next/link";

function ProjectCard({ project }: { project: ProjectCardType }) {
  return (
    <Card withBorder>
      <Stack gap="sm">
        <Group justify="space-between" align="start" wrap="nowrap" gap="xs">
          <div>
            <Text fw={500} lineClamp={1}>
              {project.label}
            </Text>
            <Text size="sm" lineClamp={1}>
              {project.summary}
            </Text>
            {(project.isVerified || project.isUsedByPeople) && (
              <Group gap="5px" wrap="nowrap" align="center" mt="sm">
                {project.isVerified && (
                  <>
                    <ThemeIcon variant="transparent" color="teal">
                      <IconRosetteFilled
                        style={{ width: "60%", height: "60%" }}
                      />
                    </ThemeIcon>
                    <Text size="xs" mr="5px">
                      Verified project
                    </Text>
                  </>
                )}
                {project.isUsedByPeople && (
                  <>
                    <ThemeIcon variant="transparent">
                      <IconRosetteFilled
                        style={{ width: "60%", height: "60%" }}
                      />
                    </ThemeIcon>
                    <Text size="xs">Used by people</Text>
                  </>
                )}
              </Group>
            )}
          </div>
        </Group>
        <Divider />
        <Anchor
          component={Link}
          href={`/developers/${project.developer.username}`}
          underline="never"
          c="inherit"
        >
          <Group>
            <Avatar size="sm" src={project.developer.avatarUrl} />
            <div>
              <Text size="sm">{project.developer.fullName}</Text>
              <Text size="sm" c="dimmed">
                {project.developer.role}
              </Text>
            </div>
          </Group>
        </Anchor>
        <Divider />
        <div>
          <Text size="sm" lineClamp={1}>
            Skills:{" "}
            {project.skills.map((skill) => skill.name).join(", ") ||
              "Not specified"}
          </Text>
          <Text size="sm" lineClamp={1}>
            Tools:{" "}
            {project.tools.map((tool) => tool.name).join(", ") ||
              "Not specified"}
          </Text>
          <Text size="sm" lineClamp={1}>
            Level: {firstUpperCase(project.level)}
          </Text>
        </div>
        <Group justify="space-between">
          <Group align="center" gap="2px">
            <ThemeIcon variant="transparent" color="gray" size="sm">
              <IconStar size={14} />
            </ThemeIcon>
            <Text size="sm">{project.likeCount}</Text>
          </Group>
          <Group gap="xs">
            {project.codeRepository && (
              <ActionIcon
                variant="default"
                component={Link}
                href={project.codeRepository}
                target="_blank"
              >
                <IconBrandGithub style={{ width: "60%", height: "60%" }} />
              </ActionIcon>
            )}
            <Button
              size="xs"
              variant="default"
              component={Link}
              href={`/projects/${project.id}`}
            >
              Details
            </Button>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}

export default ProjectCard;
