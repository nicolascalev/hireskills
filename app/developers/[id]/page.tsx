import GitHubCalendarWrapper from "@/app/ui/GitHubCalendarWrapper";
import ProjectCard from "@/app/ui/ProjectCard";
import { monthAndYear, onlyTimeAgo } from "@/lib/moment";
import prisma from "@/lib/prisma";
import { DeveloperPage } from "@/lib/types";
import {
  Anchor,
  Avatar,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  List,
  ListItem,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { Resume } from "@prisma/client";
import {
  IconAt,
  IconBrandGithub,
  IconBrandLeetcode,
  IconBrandLinkedin,
  IconBrandOpenSource,
  IconCalendar,
  IconGrowth,
  IconLink,
  IconMap,
  IconScript,
} from "@tabler/icons-react";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function DeveloperPage({
  params,
}: {
  params: { id: string };
}) {
  const user = (await prisma.user.findUnique({
    where: {
      username: params.id,
    },
    include: {
      tools: true,
      skills: true,
    },
  })) as DeveloperPage | null;

  if (!user) {
    return notFound();
  }

  let defaultResume: Resume | null = null;
  if (user.defaultResumeId) {
    defaultResume = await prisma.resume.findFirst({
      where: {
        id: user.defaultResumeId,
      },
    });
  }

  return (
    <Container py="md" size="xl">
      <Grid gutter={{ base: "md", sm: "xl" }}>
        <GridCol span={{ base: 12, sm: 3 }}>
          <Stack gap="sm">
            <Avatar size="xl" src={user.avatarUrl} />
            <div>
              <Text fw={500}>{user.fullName}</Text>
              {user.role && <Text size="sm">{user.role}</Text>}
              {user.company && <Text size="sm">{user.company}</Text>}
            </div>
            {user.jobSeeking && user.displayJobSeeking && (
              <>
                <Divider />
                <Group wrap="nowrap" gap="xs">
                  <ThemeIcon color="green" variant="transparent" size="xs">
                    <IconGrowth />
                  </ThemeIcon>
                  <Text size="sm">Job seeking</Text>
                </Group>
                <Divider />
              </>
            )}
            {user.startedCoding && (
              <Group wrap="nowrap" gap="xs">
                <ThemeIcon variant="transparent" size="xs">
                  <IconCalendar />
                </ThemeIcon>
                <div>
                  <Text size="sm">Started coding</Text>
                  <Text size="sm">
                    {monthAndYear(user.startedCoding)} (
                    {onlyTimeAgo(user.startedCoding)})
                  </Text>
                </div>
              </Group>
            )}
            {user.startedProfessionalExperience && (
              <Group wrap="nowrap" gap="xs">
                <ThemeIcon variant="transparent" size="xs">
                  <IconCalendar />
                </ThemeIcon>
                <div>
                  <Text size="sm">Started professional experience</Text>
                  <Text size="sm">
                    {monthAndYear(user.startedProfessionalExperience)} (
                    {onlyTimeAgo(user.startedProfessionalExperience)})
                  </Text>
                </div>
              </Group>
            )}
            {user.location && (
              <Group wrap="nowrap" gap="xs">
                <ThemeIcon variant="transparent" size="xs">
                  <IconMap />
                </ThemeIcon>
                <Text size="sm" lineClamp={2}>
                  {user.location}
                </Text>
              </Group>
            )}
            {user.portfolioUrl && (
              <Group wrap="nowrap" gap="xs">
                <ThemeIcon variant="transparent" size="xs">
                  <IconLink />
                </ThemeIcon>
                <AnchorExternal href={user.portfolioUrl}>
                  {user.portfolioUrl}
                </AnchorExternal>
              </Group>
            )}
            {user.githubUsername && (
              <Group wrap="nowrap" gap="xs">
                <ThemeIcon variant="transparent" size="xs">
                  <IconBrandGithub />
                </ThemeIcon>
                <AnchorExternal
                  href={`https://github.com/${user.githubUsername}`}
                >
                  {user.githubUsername}
                </AnchorExternal>
              </Group>
            )}
            {user.leetcodeUsername && (
              <Group wrap="nowrap" gap="xs">
                <ThemeIcon variant="transparent" size="xs">
                  <IconBrandLeetcode />
                </ThemeIcon>
                <AnchorExternal
                  href={`https://leetcode.com/${user.leetcodeUsername}`}
                >
                  {user.leetcodeUsername}
                </AnchorExternal>
              </Group>
            )}
            {user.linkedinUsername && (
              <Group wrap="nowrap" gap="xs">
                <ThemeIcon variant="transparent" size="xs">
                  <IconBrandLinkedin />
                </ThemeIcon>
                <AnchorExternal
                  href={`https://linkedin.com/in/${user.linkedinUsername}`}
                >
                  {user.linkedinUsername}
                </AnchorExternal>
              </Group>
            )}
            {user.displayPublicResume && defaultResume && (
              <Group wrap="nowrap" gap="xs">
                <ThemeIcon variant="transparent" size="xs">
                  <IconScript />
                </ThemeIcon>
                <AnchorExternal href={defaultResume.url}>
                  Public resume
                </AnchorExternal>
              </Group>
            )}
            {user.displayActiveOpenSource && (
              <Group wrap="nowrap" gap="xs">
                <ThemeIcon variant="transparent" size="xs">
                  <IconBrandOpenSource />
                </ThemeIcon>
                <Text size="sm">Open source contributor</Text>
              </Group>
            )}
            {user.displayEmail && (
              <Group wrap="nowrap" gap="xs">
                <ThemeIcon variant="transparent" size="xs">
                  <IconAt />
                </ThemeIcon>
                <Text size="sm">{user.email}</Text>
              </Group>
            )}
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 9 }} pb="xl">
          <Divider my="xl" mx="-md" hiddenFrom="sm" />
          <Stack gap="xl">
            <div>
              <Text fw={500} mb="sm">
                Summary
              </Text>
              <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                {user.summary || "No summary provided by the user."}
              </Text>
            </div>
            <Divider />
            {user.displayGithubActivity && user.githubUsername && (
              <>
                <div>
                  <Text fw={500} mb="sm">
                    GitHub activity
                  </Text>
                  <GitHubCalendarWrapper username={user.githubUsername} />
                </div>
                <Divider />
              </>
            )}
            <div>
              <Text fw={500} mb="sm">
                Projects
              </Text>
              <Grid>
                <GridCol span={{ base: 12, sm: 6 }}>
                  <ProjectCard />
                </GridCol>
                <GridCol span={{ base: 12, sm: 6 }}>
                  <ProjectCard />
                </GridCol>
              </Grid>
            </div>
            <Divider />
            <div>
              <Text fw={500} mb="sm">
                Achievements
              </Text>
              {user.career.achievements.length === 0 ? (
                <Text size="sm">No achievements listed by the user.</Text>
              ) : (
                <List size="sm">
                  {user.career.achievements.map((achievement, i) => (
                    <ListItem key={i}>{achievement}</ListItem>
                  ))}
                </List>
              )}
            </div>
            <Divider />
            <div>
              <Text fw={500} mb="sm">
                Experience
              </Text>
              {user.career.experience.length === 0 ? (
                <Text size="sm">No experience listed by the user.</Text>
              ) : (
                user.career.experience.map((experience, i) => (
                  <div key={i}>
                    <Text size="sm" mb="xs">
                      {experience.role}
                      <Text size="sm" fw={600} component="span" mx="sm">
                        {experience.company}
                      </Text>
                      {experience.startDate} - {experience.endDate}
                    </Text>
                    <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                      {experience.description}
                    </Text>
                  </div>
                ))
              )}
            </div>
            <Divider />
            <div>
              <Text fw={500} mb="xs">
                Education
              </Text>
              {user.career.education.length === 0 ? (
                <Text size="sm">No education listed by the user.</Text>
              ) : (
                user.career.education.map((education, i) => (
                  <div key={i}>
                    <Text size="sm">{education.school}</Text>
                    <Text size="sm">
                      {education.degree} in {education.fieldOfStudy}
                    </Text>
                    <Text size="sm">
                      {education.startDate} - {education.endDate}
                    </Text>
                  </div>
                ))
              )}
            </div>
            <Divider />
            <div>
              <Text fw={500} mb="xs">
                Skills and tools
              </Text>
              <div>
                <Text size="sm">
                  Skills:{" "}
                  {user.skills.map((skill) => skill.name).join(", ") ||
                    "No skills listed by the user."}
                </Text>
                <Text size="sm">
                  Programming languages and tools:{" "}
                  {user.tools.map((tool) => tool.name).join(", ") ||
                    "No tools listed by the user."}
                </Text>
              </div>
            </div>
          </Stack>
        </GridCol>
      </Grid>
    </Container>
  );
}

function AnchorExternal({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Anchor
      size="sm"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      c="inherit"
    >
      {children}
    </Anchor>
  );
}
