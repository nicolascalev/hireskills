import { getCurrentUser } from "@/lib/auth";
import { LoggedInUser } from "@/lib/types";
import { Container } from "@mantine/core";
import PageTabs from "./PageTabs";
import { findAllTools } from "@/lib/actions/profile/manageTools";
import { findAllSkills } from "@/lib/actions/profile/manageSkills";

async function ProfilePage() {
  const user = (await getCurrentUser()) as LoggedInUser;
  const toolsResponse = await findAllTools();
  const formattedTools = toolsResponse.tools?.map((tool) => tool.name) || [];
  const skillsResponse = await findAllSkills();
  const formattedSkills =
    skillsResponse.skills?.map((skill) => skill.name) || [];

  return (
    <Container size="xl" py="md">
      <PageTabs user={user} tools={formattedTools} skills={formattedSkills} />
    </Container>
  );
}

export default ProfilePage;
