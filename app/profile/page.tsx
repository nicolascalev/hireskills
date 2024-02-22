import { getCurrentUser } from "@/lib/auth";
import {
  Container
} from "@mantine/core";
import { User } from "@prisma/client";
import PageTabs from "./PageTabs";

async function ProfilePage() {
  const user = (await getCurrentUser()) as User;

  return (
    <Container size="xl" py="md">
      <PageTabs user={user} />
    </Container>
  );
}

export default ProfilePage;
