"use client";
import { Button, Group, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconSparkles } from "@tabler/icons-react";
import { useChat } from "ai/react";
import { FormEvent, useState } from "react";

function DeveloperAISummary({ developerId }: { developerId: string }) {
  const [loading, setLoading] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      developerId,
    },
    onFinish: () => {
      setLoading(false);
    },
    onError: (error) => {
      const err = error as any;
      if (err?.code == "insufficient_quota") {
        showNotification({
          title: "AI summaries currently unavailable",
          message: "We have reached the AI usage limit, please try again later",
          color: "red",
        });
        return;
      }
      showNotification({
        title: "Failed to generate AI summary",
        message: "An error occurred while generating the AI summary",
        color: "red",
      });
    },
  });

  function customHandleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    handleSubmit(e);
  }

  return (
    <form onSubmit={customHandleSubmit}>
      <Stack gap="xs">
        <Text fw={500}>AI Summary</Text>
        {messages.length > 0 && (
          <div>
            {messages.map((m, index) => (
              <Text
                key={index}
                size="sm"
                className="prewrap_breakword"
                c={m.role === "user" ? "dimmed" : undefined}
                mb={m.role === "user" ? undefined : "sm"}
                maw="100%"
              >
                {m.content}
              </Text>
            ))}
          </div>
        )}
        <TextInput
          placeholder="What is the developer's experience with JavaScript?"
          disabled={loading}
          value={input}
          onChange={handleInputChange}
        />
        <Group justify="right">
          <Button
            size="xs"
            type="submit"
            rightSection={<IconSparkles size={14} />}
            loading={loading}
          >
            Generate
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default DeveloperAISummary;
