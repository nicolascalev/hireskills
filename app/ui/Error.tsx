"use client";

import { useEffect } from "react";
import { Container, Text, Button, Stack, Center } from "@mantine/core";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container size="xl" h="calc(100svh - 60px)">
      <Center w="100%" h="100%">
        <Stack ta="center">
          <Text fw={500}>Something went wrong</Text>
          <Text size="sm">Sorry for the inconvenience, please try again</Text>
          <Button size="xs" onClick={reset}>
            Try again
          </Button>
        </Stack>
      </Center>
    </Container>
    // <main className="flex h-full flex-col items-center justify-center">
    //   <h2 className="text-center">Something went wrong!</h2>
    //   <button
    //     className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
    //     onClick={
    //       // Attempt to recover by trying to re-render the invoices route
    //       () => reset()
    //     }
    //   >
    //     Try again
    //   </button>
    // </main>
  );
}
