import { dateFormat, onlyTimeAgo } from "@/lib/moment";
import { ProjectPage } from "@/lib/types";
import {
  Anchor,
  Avatar,
  Button,
  Divider,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  Textarea,
  ThemeIcon,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconCalendar,
  IconClockCode,
  IconDiscountCheck,
  IconExternalLink,
  IconFolderCode,
  IconGrowth,
  IconHeart,
  IconMessageCircle,
  IconStackPop,
  IconTimeDuration10,
} from "@tabler/icons-react";
import Link from "next/link";
import { ReactNode } from "react";
import ProjectComments from "./ProjectComments";
import ProjectLikeButton from "./ProjectLikeButton";

function firstUpperCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ProjectPageContent({
  project,
  action,
}: {
  project: ProjectPage;
  action?: ReactNode;
}) {
  return (
    <Grid gutter={{ base: "md", sm: "xl" }}>
      <GridCol span={{ base: 12, sm: 3 }}>
        <Stack gap="sm" pos="sticky" top="76px">
          <Text fw={500}>{project.label}</Text>
          <Group wrap="nowrap" gap="xs">
            <ThemeIcon variant="transparent" size="xs">
              <IconCalendar />
            </ThemeIcon>
            <div>
              <Text size="sm">Publish date</Text>
              <Text size="sm">{dateFormat(project.publishDate)}</Text>
            </div>
          </Group>
          <Group wrap="nowrap" gap="xs">
            <ThemeIcon variant="transparent" size="xs">
              <IconTimeDuration10 />
            </ThemeIcon>
            <div>
              <Text size="sm">Time spent</Text>
              <Text size="sm">{project.timeSpent}</Text>
            </div>
          </Group>
          <Group wrap="nowrap" gap="xs">
            <ThemeIcon variant="transparent" size="xs">
              <IconStackPop />
            </ThemeIcon>
            <Text size="sm">{firstUpperCase(project.level)}</Text>
          </Group>
          {project.isUsedByPeople && (
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="transparent" size="xs">
                <IconDiscountCheck />
              </ThemeIcon>
              <Text size="sm">Used by people</Text>
            </Group>
          )}
          {project.isVerified && (
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="transparent" size="xs" color="teal">
                <IconDiscountCheck />
              </ThemeIcon>
              <Text size="sm">Verified project</Text>
            </Group>
          )}
          {action}
          <Divider />
          <Anchor
            underline="never"
            c="inherit"
            component={Link}
            href={`/developers/${project.developer.username}`}
          >
            <Avatar mb="xs" src={project.developer.avatarUrl} />
            <Text fw={500}>{project.developer.fullName}</Text>
            <Text size="sm">{project.developer.role}</Text>
          </Anchor>
          {project.developer.jobSeeking &&
            project.developer.displayJobSeeking && (
              <Group wrap="nowrap" gap="xs">
                <ThemeIcon color="teal" variant="transparent" size="xs">
                  <IconGrowth />
                </ThemeIcon>
                <Text size="sm">Job seeking</Text>
              </Group>
            )}
          <Group wrap="nowrap" gap="xs">
            <ThemeIcon variant="transparent" size="xs">
              <IconFolderCode />
            </ThemeIcon>
            <Text size="sm">{project.developer._count.projects} projects</Text>
          </Group>
          {project.developer.startedCoding && (
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="transparent" size="xs">
                <IconClockCode />
              </ThemeIcon>
              <Text size="sm">
                {onlyTimeAgo(project.developer.startedCoding)}
              </Text>
            </Group>
          )}
        </Stack>
      </GridCol>
      <GridCol span={{ base: 12, sm: 9 }} pb="xl">
        <Divider mb="xl" mx="-md" hiddenFrom="sm" />
        <Stack gap="xl">
          <div>
            <Text fw={500} mb="sm">
              Summary
            </Text>
            <Text size="sm"className="prewrap_breakword">
              {project.summary}
            </Text>
            <Group mt="sm" gap="xs">
              <ProjectLikeButton projectId={project.id} />
              <Button
                size="xs"
                variant="transparent"
                rightSection={<IconMessageCircle size={14} />}
                color="var(--mantine-color-text)"
                component="a"
                href="#comments"
              >
                Comments
              </Button>
              {project.url && (
                <Button
                  size="xs"
                  variant="transparent"
                  rightSection={<IconExternalLink size={14} />}
                  component="a"
                  href={project.url}
                  target="_blank"
                  color="var(--mantine-color-text)"
                >
                  Visit
                </Button>
              )}
              {project.codeRepository && (
                <Button
                  size="xs"
                  variant="transparent"
                  rightSection={<IconBrandGithub size={14} />}
                  component="a"
                  href={project.codeRepository}
                  target="_blank"
                  color="var(--mantine-color-text)"
                >
                  Repo
                </Button>
              )}
            </Group>
          </div>
          {/* TODO: decide wether I want those images or not */}
          {/* <ProjectMediaCarousel /> */}
          <Divider />
          <div>
            <Text fw={500} mb="sm">
              Problem
            </Text>
            <Text size="sm"className="prewrap_breakword">
              {project.problem || "Problem not specified."}
            </Text>
          </div>
          <Divider />
          <div>
            <Text fw={500} mb="sm">
              Solution
            </Text>
            <Text size="sm"className="prewrap_breakword">
              {project.solution || "Solution not specified."}
            </Text>
          </div>
          <Divider />
          <div>
            <Text fw={500} mb="xs">
              Skills and tools
            </Text>
            <div>
              <Text size="sm">
                Skills:{" "}
                {project.skills.map((skill) => skill.name).join(", ") ||
                  "Skills not specified."}
              </Text>
              <Text size="sm">
                Tools and programming languages:{" "}
                {project.tools.map((tool) => tool.name).join(", ") ||
                  "Languages and tools not specified."}
              </Text>
            </div>
          </div>
          <Divider />
          <div>
            <Text fw={500} mb="sm">
              Example of a challenge
            </Text>
            <Text size="sm"className="prewrap_breakword">
              {project.challengeExample || "Challenge not specified."}
            </Text>
          </div>
          <Divider id="comments" />
          <ProjectComments
            projectId={project.id}
            commentCount={project._count.comments}
          />
        </Stack>
      </GridCol>
    </Grid>
  );
}

export default ProjectPageContent;
