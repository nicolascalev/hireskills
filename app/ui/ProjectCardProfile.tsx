import { ProfileProjectCard } from "@/lib/types";
import { Button, Card, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import {
  IconChevronRight,
  IconEdit,
  IconRosetteFilled,
  IconStar,
} from "@tabler/icons-react";
import Link from "next/link";

function firstUpperCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ProjectCardProfile({ project }: { project: ProfileProjectCard }) {
  return (
    <Card withBorder>
      <Stack gap="sm">
        <Group justify="space-between" align="start" wrap="nowrap" gap="xs">
          <div>
            <Text fw={500}>{project.label}</Text>
            <Text size="sm">{project.summary}</Text>
            {(project.isVerified || project.isUsedByPeople) && (
              <Group gap="5px" wrap="nowrap" align="center" mt="sm">
                {project.isVerified && (
                  <>
                    <ThemeIcon variant="transparent" color="green">
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
            <Text size="sm">{project._count.likes}</Text>
          </Group>
          <Group gap="xs">
            <Button
              size="xs"
              variant="default"
              rightSection={<IconEdit size={14} />}
              component={Link}
              href={`/profile/projects/${project.id}/edit`}
            >
              Edit
            </Button>
            <Button
              size="xs"
              variant="default"
              rightSection={<IconChevronRight size={14} />}
              component={Link}
              href={`/profile/projects/${project.id}`}
            >
              Details
            </Button>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}

export default ProjectCardProfile;
