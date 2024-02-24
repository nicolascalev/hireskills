"use client";
import { LoggedInUser } from "@/lib/types";
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import {
  IconRoute,
  IconScript,
  IconSettings,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import ResumesList from "./ResumesList";
import UpdateLinksAndSocialsForm from "./UpdateLinksAndSocialsForm";
import UpdateProfileForm from "./UpdateProfileForm";
import UpdateProfilePreferencesForm from "./UpdateProfilePreferencesForm";
import UpdateDefaultResumeForm from "./UpdateDefaultResumeForm";
import ExperienceList from "./ExperienceList";

function PageTabs({ user }: { user: LoggedInUser }) {
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
      onChange={(value) => router.push(`/profile?tab=${value}`)}
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
          <Stack gap="0">
            <Stack gap="xs">
              <Group justify="space-between">
                <Text fw={500}>Education 1</Text>
                <ActionIcon size="sm" variant="transparent">
                  <IconTrash size={14} />
                </ActionIcon>
              </Group>
              <TextInput label="School" placeholder="School" />
              <Group grow>
                <TextInput label="Degree" placeholder="Degree" />
                <TextInput
                  label="Field of study"
                  placeholder="Field of study"
                />
              </Group>
              <Group grow>
                <TextInput label="Start date" placeholder="Start date" />
                <TextInput label="End date" placeholder="End date or present" />
              </Group>
            </Stack>
          </Stack>
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
            <Text fw="500">Tools</Text>
            <Text size="sm" c="dimmed">
              Frameworks, libraries, and other tools you are familiar with.
            </Text>
          </div>
          <Stack>
            <TextInput label="Search or add tools" placeholder="Search..." />
            <CheckboxGroup defaultValue={["Auth0"]}>
              <Stack gap="xs">
                <Checkbox label="Next js" value="Next js" />
                <Checkbox label="Auth0" value="Auth0" />
                <Checkbox label="Prisma" value="Prisma" />
              </Stack>
            </CheckboxGroup>
          </Stack>
        </SimpleGrid>
        <Divider my="xl" />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <div>
            <Text fw="500">Languages</Text>
            <Text size="sm" c="dimmed">
              Select the programming languages you are familiar with.
            </Text>
          </div>
          <Stack>
            <TextInput label="Search or add language" placeholder="Search..." />
            <CheckboxGroup defaultValue={["Auth0"]}>
              <Stack gap="xs">
                <Checkbox label="Next js" value="Next js" />
                <Checkbox label="Auth0" value="Auth0" />
                <Checkbox label="Prisma" value="Prisma" />
              </Stack>
            </CheckboxGroup>
          </Stack>
        </SimpleGrid>
      </TabsPanel>
    </Tabs>
  );
}

export default PageTabs;
