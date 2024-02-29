"use client";
import { projectSchemaType } from "@/lib/zod";
import React from "react";
import ProjectForm from "../../ProjectForm";
import { useRouter } from "next/navigation";
import { showNotification } from "@mantine/notifications";
import { updateProject } from "@/lib/actions/project/manageProject";

function EditProjectForm({
  project,
}: {
  project: projectSchemaType & { id: string };
}) {
  const router = useRouter();

  async function sendEditProject(values: projectSchemaType) {
    try {
      const res = await updateProject(project.id, values);
      if (res.error) {
        showNotification({
          title: res.error,
          message: "Failed to edit project, please try again.",
          color: "red",
        });
        return;
      }
      showNotification({
        title: "Project updated",
        message: "You will be redirected to the project page",
        color: "teal",
      });
      router.push(`/profile/projects/${project.id}`);
    } catch (err) {
      showNotification({
        title: "Failed to update project, please try again.",
        message: (err as any).message,
        color: "red",
      });
    }
  }

  return (
    <ProjectForm
      label="Edit project"
      project={project}
      onSubmit={sendEditProject}
    />
  );
}

export default EditProjectForm;
