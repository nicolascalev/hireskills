import { Container } from "@mantine/core";
import ProjectForm from "../ProjectForm";

function AddProjectPage() {
  return (
    <Container size="xl" py="md">
      Add project
      <ProjectForm />
    </Container>
  );
}

export default AddProjectPage;
