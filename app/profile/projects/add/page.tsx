"use client";
import { Container } from "@mantine/core";
import ProjectForm from "../ProjectForm";
import { projectSchemaType } from "@/lib/zod";
import { createProject } from "@/lib/actions/project/manageProject";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation";

function AddProjectPage() {
  const router = useRouter();

  async function sendCreateProject(values: projectSchemaType) {
    try {
      const res = await createProject(values);
      if (res.error) {
        showNotification({
          title: res.error,
          message: "Failed to create project, please try again.",
          color: "red",
        });
        return;
      }
      showNotification({
        title: "Project created",
        message: "You will be redirected to the project page",
        color: "teal",
      });
      router.push(`/profile/projects/${res.projectId}`);
    } catch (err) {
      showNotification({
        title: "Failed to create project, please try again.",
        message: (err as any).message,
        color: "red",
      });
    }
  }

  return (
    <Container size="xl" py="md">
      <ProjectForm label="Add project" onSubmit={sendCreateProject} />
    </Container>
  );
}

export default AddProjectPage;
