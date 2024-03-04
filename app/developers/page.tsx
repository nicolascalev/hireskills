"use client";
import DevCard from "@/app/ui/DevCard";
import { Button, Container, Grid, GridCol, Group, Stack } from "@mantine/core";
import DevFilters from "../ui/DevFilters";
import DevFiltersDrawer from "../ui/DevFiltersDrawer";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "@/lib/utils";
import { DeveloperCardType } from "@/lib/types";
import useDevelopers from "@/lib/hooks/useDevelopers";

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
  const { developers, developersError, developersLoading } = useDevelopers(
    searchParams,
    cursor
  );

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
          <Stack gap="sm" visibleFrom="sm">
            <DevFilters />
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 9 }}>
          <Stack>
            {displayedDevelopers.map((developer) => (
              <DevCard key={developer.id} developer={developer} />
            ))}
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
