"use client";
import { updateUserTools } from "@/lib/actions/profile/updateCareerFields";
import { stringArraysAreEqual } from "@/lib/utils";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Group,
  Stack
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import ToolsCombobox from "../ui/ToolsCombobox";

function ToolsForm({ tools }: { tools: string[] }) {
  const [visibleTools, setVisibleTools] = useState<string[]>(tools);
  const [selectedTools, setSelectedTools] = useState<string[]>(tools);

  const [loading, setLoading] = useState(false);
  async function saveUserTools() {
    if (stringArraysAreEqual(tools, selectedTools)) {
      showNotification({
        title: "No changes to save",
        message: "Make changes and save your tools",
        color: "blue",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await updateUserTools(selectedTools);
      if (res.error) {
        showNotification({
          title: res.error,
          message: "Could not update your tools. Please try again later",
          color: "red",
        });
        return;
      }
      showNotification({
        title: "Success",
        message: "Your tools have been updated",
        color: "teal",
      });
    } catch (err) {
      showNotification({
        title: "Error",
        message: "Could not update your tools. Please try again later",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack>
      <ToolsCombobox
        value={visibleTools}
        onChange={(newItem) => {
          setVisibleTools([newItem, ...visibleTools]);
          setSelectedTools([newItem, ...selectedTools]);
        }}
        onCreateError={(newItem) => {
          // remove from visible tools and selected tools
          setVisibleTools(visibleTools.filter((tool) => tool !== newItem));
          setSelectedTools(selectedTools.filter((tool) => tool !== newItem));
        }}
        creatable
      />
      {visibleTools.length > 0 && (
        <CheckboxGroup value={selectedTools} onChange={setSelectedTools}>
          <Stack gap="xs">
            {visibleTools.map((tool) => (
              <Checkbox
                label={tool}
                value={tool}
                key={tool}
                disabled={loading}
              />
            ))}
          </Stack>
        </CheckboxGroup>
      )}
      <Group justify="end">
        <Button size="xs" onClick={() => saveUserTools()} loading={loading}>
          Save changes
        </Button>
      </Group>
    </Stack>
  );
}

export default ToolsForm;
