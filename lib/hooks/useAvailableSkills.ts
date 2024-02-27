import useSWR from "swr";
import { fetcherWithConfig } from "@/lib/api";
import { Skill } from "@prisma/client";

export default function useAvailableSkills(
  searchString: string,
  exclude: string
) {
  const { data, error, isLoading } = useSWR(
    [
      "/api/skills",
      {
        params: {
          searchString,
          exclude,
        },
      },
    ],
    fetcherWithConfig
  );
  const availableSkills: Skill[] | null = data;
  return {
    availableSkillsLoading: isLoading,
    availableSkills,
    availableSkillsError: error,
  };
}
