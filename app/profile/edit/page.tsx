import { findAllSkills } from "@/lib/actions/profile/manageSkills";
import { findAllTools } from "@/lib/actions/profile/manageTools";
import { getCurrentUser } from "@/lib/auth";
import { LoggedInUser } from "@/lib/types";
import { Container } from "@mantine/core";
import React from "react";
import PageTabs from "../PageTabs";

async function EditProfilePage() {
  const [user, toolsResponse, skillsResponse] = await Promise.all([
    getCurrentUser() as Promise<LoggedInUser>,
    findAllTools(),
    findAllSkills(),
  ]);
  const formattedTools = toolsResponse.tools?.map((tool) => tool.name) || [];
  const formattedSkills =
    skillsResponse.skills?.map((skill) => skill.name) || [];

  return (
    <Container size="xl" py="md">
      <PageTabs user={user} tools={formattedTools} skills={formattedSkills} />
    </Container>
  );
}

export default EditProfilePage;
