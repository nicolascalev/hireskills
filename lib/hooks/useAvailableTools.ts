import useSWR from "swr";
import { fetcherWithConfig } from "@/lib/api";
import { Tool } from "@prisma/client";

export default function useAvailableTools(
  searchString: string,
  exclude: string
) {
  const { data, error, isLoading } = useSWR(
    [
      "/api/tools",
      {
        params: {
          searchString,
          exclude,
        },
      },
    ],
    fetcherWithConfig
  );
  const availableTools: Tool[] | null = data;
  return {
    availableToolsLoading: isLoading,
    availableTools,
    availableToolsError: error,
  };
}
