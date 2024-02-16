import { getCurrentUser, createUser } from "@/lib/auth";
import { Container, Text } from "@mantine/core";
import { redirect } from "next/navigation";

async function RegisterUser() {
  // if the user visits this page by accident and their user already exists
  // redirect them to their profile page
  // otherwise create a new user and redirect them to their profile page
  const userExisted = await getCurrentUser();
  if (userExisted) {
    redirect("/profile");
  } else {
    await createUser()
    redirect("/profile");
  }

  return (
    <Container py="md" size="xl">
      <Text>We are setting things up, please don&apos;t close this tab.</Text>
    </Container>
  );
}

export default RegisterUser;
