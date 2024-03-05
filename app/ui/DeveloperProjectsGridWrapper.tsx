import { getDeveloperProjects } from "@/lib/data";
import DeveloperProjectsGrid from "./DeveloperProjectsGrid";
import MessageCard from "./MessageCard";
import { IconFolderExclamation } from "@tabler/icons-react";

async function DeveloperProjectsGridWrapper({
  developerId,
}: {
  developerId: string;
}) {
  const res = await getDeveloperProjects(developerId);

  if (res.error || !res.projects) {
    return (
      <MessageCard
        icon={<IconFolderExclamation />}
        title="Could not fetch user projects"
        message="An error occurred while fetching the user's projects. Please try again."
      />
    );
  }

  if (res.projects.length == 0) {
    return (
      <MessageCard
        icon={<IconFolderExclamation />}
        title="No projects published"
        message="When the user adds public projects they will be shown here."
      />
    );
  }
  return <DeveloperProjectsGrid projects={res.projects} />;
}

export default DeveloperProjectsGridWrapper;
