import { getCurrentUser } from "@/lib/auth";
import { Container } from "@mantine/core";

async function ProfilePage() {
  const user = await getCurrentUser();
  return (
    <Container size="xl" py="md">
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Container>
  );
}

export default ProfilePage;
