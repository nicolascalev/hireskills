import { getCurrentUser } from "@/lib/auth";
import { LoggedInUser } from "@/lib/types";
import { Container } from "@mantine/core";
import PageTabs from "./PageTabs";
import { findAllTools } from "@/lib/actions/profile/manageTools";

async function ProfilePage() {
  const user = (await getCurrentUser()) as LoggedInUser;
  const res = await findAllTools();
  const formattedTools = res.tools?.map((tool) => tool.name) || [];

  return (
    <Container size="xl" py="md">
      <PageTabs user={user} tools={formattedTools} />
    </Container>
  );
}

export default ProfilePage;
