"use client";
import { LoggedInUser } from "@/lib/types";
import {
  Box,
  Divider,
  SimpleGrid,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Text,
} from "@mantine/core";
import {
  IconRoute,
  IconScript,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import AchievementsList from "./AchievementsList";
import EducationList from "./EducationList";
import ExperienceList from "./ExperienceList";
import ResumesList from "./ResumesList";
import ToolsForm from "./ToolsForm";
import UpdateDefaultResumeForm from "./UpdateDefaultResumeForm";
import UpdateLinksAndSocialsForm from "./UpdateLinksAndSocialsForm";
import UpdateProfileForm from "./UpdateProfileForm";
import UpdateProfilePreferencesForm from "./UpdateProfilePreferencesForm";
import SkillsForm from "./SkillsForm";

function PageTabs({
  user,
  tools,
  skills,
}: {
  user: LoggedInUser;
  tools: string[];
  skills: string[];
}) {
  const router = useRouter();
  const search = useSearchParams();
  const tab = ["Profile", "Settings", "Resumes", "Experience"].includes(
    search.get("tab") as string
  )
    ? search.get("tab")
    : "Profile";

  return (
    <Tabs
      orientation="horizontal"
      variant="outline"
      value={tab}
      onChange={(value) => router.push(`/profile/edit?tab=${value}`)}
    >
      <Box mx={{ base: "-md", sm: 0 }} className="scrollable__tabs">
        <TabsList className="scrollable__tabs__tablist">
          <TabsTab value="Profile" leftSection={<IconUser size={14} />}>
            Profile
          </TabsTab>
          <TabsTab value="Settings" leftSection={<IconSettings size={14} />}>
            Settings
          </TabsTab>
          <TabsTab value="Resumes" leftSection={<IconScript size={14} />}>
            Resumes
          </TabsTab>
          <TabsTab value="Experience" leftSection={<IconRoute size={14} />}>
            Experience
          </TabsTab>
        </TabsList>
      </Box>

      <TabsPanel value="Profile">
        <SimpleGrid pt="md" cols={{ base: 1, sm: 2 }}>
          <div>
            <Text fw="500">General information</Text>
            <Text size="sm" c="dimmed">
              Please fill this form to know more about your profile
            </Text>
          </div>
          <UpdateProfileForm user={user} />
        </SimpleGrid>
        <Divider my="xl" />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <div>
            <Text fw="500">Links and socials</Text>
            <Text size="sm" c="dimmed">
              Show others your online presence and activity
            </Text>
          </div>
          <UpdateLinksAndSocialsForm user={user} />
        </SimpleGrid>
      </TabsPanel>

      <TabsPanel value="Settings">
        <SimpleGrid pt="md" cols={{ base: 1, sm: 2 }}>
          <div>
            <Text fw="500">Preferences</Text>
            <Text size="sm" c="dimmed">
              You can choose what you want to display in your profile
            </Text>
          </div>
          <UpdateProfilePreferencesForm user={user} />
        </SimpleGrid>
      </TabsPanel>

      <TabsPanel value="Resumes">
        <SimpleGrid pt="md" cols={{ base: 1, sm: 2 }}>
          <div>
            <Text fw="500">Default resume</Text>
            <Text size="sm" c="dimmed">
              You can choose what you want to display in your profile
            </Text>
          </div>
          <UpdateDefaultResumeForm user={user} />
        </SimpleGrid>
        <Divider my="xl" />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <div>
            <Text fw="500">Uploaded resumes</Text>
            <Text size="sm" c="dimmed">
              You can keep multiple resumes and choose which one to display
            </Text>
          </div>
          <ResumesList user={user} />
        </SimpleGrid>
      </TabsPanel>

      <TabsPanel value="Experience">
        <SimpleGrid pt="md" cols={{ base: 1, sm: 2 }}>
          <div>
            <Text fw="500">Education</Text>
            <Text size="sm" c="dimmed">
              List your education, including bootcamps and other forms of
              education.
            </Text>
          </div>
          <EducationList user={user} />
        </SimpleGrid>
        <Divider my="xl" />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <div>
            <Text fw="500">Experience</Text>
            <Text size="sm" c="dimmed">
              List your work experience, including internships.
            </Text>
          </div>
          <ExperienceList user={user} />
        </SimpleGrid>
        <Divider my="xl" />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <div>
            <Text fw="500">Achievements</Text>
            <Text size="sm" c="dimmed" maw="500">
              List your achievements, including examples of exceptional
              performance in extracurricular activities.
            </Text>
          </div>
          <AchievementsList user={user} />
        </SimpleGrid>
        <Divider my="xl" />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <div>
            <Text fw="500">Languages and Tools</Text>
            <Text size="sm" c="dimmed">
              Frameworks, libraries, and other tools you are familiar with.
            </Text>
          </div>
          <ToolsForm tools={tools} />
        </SimpleGrid>
        <Divider my="xl" />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <div>
            <Text fw="500">Skills and roles</Text>
            <Text size="sm" c="dimmed">
              For example: Frontend, Backend, Machine Learning, DevOps...
            </Text>
          </div>
          <SkillsForm skills={skills} />
        </SimpleGrid>
      </TabsPanel>
    </Tabs>
  );
}

export default PageTabs;
