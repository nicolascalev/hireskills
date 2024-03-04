"use client";
import DevCard from "@/app/ui/DevCard";
import useDevelopers from "@/lib/hooks/useDevelopers";
import { DeveloperCardType } from "@/lib/types";
import { DEFAULT_PAGE_SIZE } from "@/lib/utils";
import { Button, Container, Grid, GridCol, Group, Stack } from "@mantine/core";
import { IconMoodSad, IconUserQuestion } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DevFilters from "../ui/DevFilters";
import DevFiltersDrawer from "../ui/DevFiltersDrawer";
import MessageCard from "../ui/MessageCard";

export default function DevelopersPage() {
  const searchParams = useSearchParams();
  const [displayedDevelopers, setDisplayedDevelopers] = useState<
    DeveloperCardType[]
  >([]);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);

  // when search changes, reset displayed developers and cursor
  useEffect(() => {
    setDisplayedDevelopers([]);
    setCursor(undefined);
    setNextCursor(undefined);
  }, [searchParams]);

  // fetch developers and pass the right search params and cursor
  const {
    developers,
    developersError,
    developersLoading,
    developersRevalidate,
  } = useDevelopers(searchParams, cursor);

  // when developers change, add them to displayed developers
  useEffect(() => {
    if (developers) {
      setDisplayedDevelopers((prev) => [...prev, ...developers]);
      if (developers.length == DEFAULT_PAGE_SIZE) {
        setNextCursor(developers[developers.length - 1].id);
      } else {
        setNextCursor(undefined);
      }
    }
  }, [developers]);

  return (
    <Container py="md" size="xl">
      <Grid gutter={{ base: "md", sm: "xl" }}>
        <GridCol span={{ base: 12, sm: 3 }}>
          <DevFiltersDrawer />
          <Stack gap="sm" visibleFrom="sm" pos="sticky" top="76px">
            <DevFilters />
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 9 }}>
          <Stack>
            {displayedDevelopers.map((developer) => (
              <DevCard key={developer.id} developer={developer} />
            ))}
            {!developersLoading && developersError && (
              <MessageCard
                icon={<IconMoodSad />}
                title="There was an error fetching users"
                message="We are working on fixing this issue, please try again later"
                action={
                  <Button onClick={() => developersRevalidate()} size="xs">
                    Refresh
                  </Button>
                }
              />
            )}
            {!developersLoading &&
              !developersError &&
              displayedDevelopers.length === 0 && (
                <MessageCard
                  icon={<IconUserQuestion />}
                  title="No developers found"
                  message="Try adjusting search filters"
                  action={
                    <Button onClick={() => developersRevalidate()} size="xs">
                      Refresh
                    </Button>
                  }
                />
              )}
            {developersLoading && <div>Loading...</div>}
            {!developersLoading && nextCursor && (
              <Group justify="center" grow>
                <Button
                  size="xs"
                  variant="default"
                  maw={400}
                  onClick={() => setCursor(nextCursor)}
                >
                  Load more
                </Button>
              </Group>
            )}
          </Stack>
        </GridCol>
      </Grid>
    </Container>
  );
}
