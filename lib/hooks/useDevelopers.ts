import { ReadonlyURLSearchParams } from "next/navigation";
import useSWR from "swr";
import { basicFetcher } from "../api";
import { DeveloperCardType } from "../types";

export default function useDevelopers(
  searchParams: ReadonlyURLSearchParams,
  cursor?: string
) {
  const { data, error, isLoading } = useSWR(
    `/api/developers?${searchParams.toString()}${
      cursor ? `&cursor=${cursor}` : ""
    }`,
    basicFetcher
  );

  return {
    developers: data as DeveloperCardType[] | undefined,
    developersError: error,
    developersLoading: isLoading,
  };
}
