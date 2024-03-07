import GitHubCalendarWrapper from "@/app/ui/GitHubCalendarWrapper";
import { monthAndYear, onlyTimeAgo } from "@/lib/moment";
import { DeveloperPage } from "@/lib/types";
import {
  Anchor,
  Avatar,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  Pill,
  PillGroup,
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
  IconTrophyFilled,
} from "@tabler/icons-react";
import { ReactNode, Suspense } from "react";
import DeveloperAISummary from "./DeveloperAISummary";
import DeveloperProjectsGrid from "./DeveloperProjectsGridWrapper";

function DeveloperPageContent({
  user,
  defaultResume,
  action,
}: {
  user: DeveloperPage;
  defaultResume: Resume | null;
  action?: ReactNode;
}) {
  return (
    <Container py="md" size="xl">
      <Grid gutter={{ base: "md", sm: "xl" }}>
        <GridCol span={{ base: 12, sm: 3 }}>
          <Stack gap="sm" pos="sticky" top="76px">
            <Avatar size="xl" src={user.avatarUrl} />
            <div>
              <Text fw={500}>{user.fullName}</Text>
              {user.role && <Text size="sm">{user.role}</Text>}
              {user.company && <Text size="sm">{user.company}</Text>}
            </div>
            {action}
            {user.jobSeeking && user.displayJobSeeking && (
              <>
                <Divider />
                <Group wrap="nowrap" gap="xs">
                  <ThemeIcon color="teal" variant="transparent" size="xs">
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
            <DeveloperAISummary developerId={user.id} />
            <Divider />
            <div>
              <Text fw={500} mb="sm">
                Summary
              </Text>
              <Text size="sm" className="prewrap_breakword">
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
              <Suspense fallback="Loading projects...">
                <DeveloperProjectsGrid developerId={user.id} />
              </Suspense>
            </div>
            <Divider />
            <div>
              <Text fw={500} mb="sm">
                Achievements
              </Text>
              <Stack gap="xs">
                {user.career.achievements.length === 0 ? (
                  <Text size="sm">No achievements listed by the user.</Text>
                ) : (
                  user.career.achievements.map((achievement, i) => (
                    <Group key={i} wrap="nowrap" gap="xs" align="start">
                      <ThemeIcon
                        size="xs"
                        variant="transparent"
                        color="yellow"
                        mt={1}
                      >
                        <IconTrophyFilled size={14} />
                      </ThemeIcon>
                      <Text size="sm" className="prewrap_breakword">
                        {achievement}
                      </Text>
                    </Group>
                  ))
                )}
              </Stack>
            </div>
            <Divider />
            <Stack>
              <Text fw={500}>Experience</Text>
              <Stack gap="xl">
                {user.career.experience.length === 0 ? (
                  <Text size="sm">No experience listed by the user.</Text>
                ) : (
                  user.career.experience.map((experience, i) => (
                    <div key={i}>
                      <Text size="sm" fw={600}>
                        {experience.role}
                      </Text>
                      <Text size="sm">{experience.company}</Text>
                      <Text size="sm" c="dimmed">
                        {experience.startDate} - {experience.endDate}
                      </Text>
                      {experience.description && (
                        <Text mt="xs" size="sm" className="prewrap_breakword">
                          {experience.description}
                        </Text>
                      )}
                    </div>
                  ))
                )}
              </Stack>
            </Stack>
            <Divider />
            <Stack>
              <Text fw={500}>Education</Text>
              <Stack gap="xl">
                {user.career.education.length === 0 ? (
                  <Text size="sm">No education listed by the user.</Text>
                ) : (
                  user.career.education.map((education, i) => (
                    <div key={i}>
                      <Text size="sm" fw={600}>
                        {education.school}
                      </Text>
                      <Text size="sm">
                        {education.degree} in {education.fieldOfStudy}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {education.startDate} - {education.endDate}
                      </Text>
                      {education.description && (
                        <Text mt="xs" size="sm" className="prewrap_breakword">
                          {education.description}
                        </Text>
                      )}
                    </div>
                  ))
                )}
              </Stack>
            </Stack>
            <Divider />
            <div>
              <Text fw={500} mb="xs">
                Skills and tools
              </Text>
              <Stack gap="xs">
                <Text size="sm">Skills:</Text>
                {user.skills.length > 0 ? (
                  <PillGroup>
                    {user.skills.map((skill) => (
                      <Pill key={skill.name} size="sm" className="pill">
                        {skill.name}
                      </Pill>
                    ))}
                  </PillGroup>
                ) : (
                  "No skills listed by the user."
                )}
                <Text size="sm" mt="xs">
                  Programming languages and tools:
                </Text>
                {user.tools.length > 0 ? (
                  <PillGroup>
                    {user.tools.map((tool) => (
                      <Pill key={tool.name} size="sm" className="pill">
                        {tool.name}
                      </Pill>
                    ))}
                  </PillGroup>
                ) : (
                  "No tools listed by the user."
                )}
              </Stack>
            </div>
          </Stack>
        </GridCol>
      </Grid>
    </Container>
  );
}

export default DeveloperPageContent;

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
