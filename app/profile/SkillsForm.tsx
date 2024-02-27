"use client";
import { updateUserSkills } from "@/lib/actions/profile/updateCareerFields";
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
import SkillsCombobox from "../ui/SkillsCombobox";

function SkillsForm({ skills }: { skills: string[] }) {
  const [visibleSkills, setVisibleSkills] = useState<string[]>(skills);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(skills);

  const [loading, setLoading] = useState(false);
  async function saveUserSkills() {
    if (stringArraysAreEqual(skills, selectedSkills)) {
      showNotification({
        title: "No changes to save",
        message: "Make changes and save your skills",
        color: "blue",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await updateUserSkills(selectedSkills);
      if (res.error) {
        showNotification({
          title: res.error,
          message: "Could not update your skills. Please try again later",
          color: "red",
        });
        return;
      }
      showNotification({
        title: "Success",
        message: "Your skills have been updated",
        color: "teal",
      });
    } catch (err) {
      showNotification({
        title: "Error",
        message: "Could not update your skills. Please try again later",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack>
      <SkillsCombobox
        value={visibleSkills}
        onChange={(newItem) => {
          setVisibleSkills([newItem, ...visibleSkills]);
          setSelectedSkills([newItem, ...selectedSkills]);
        }}
        onCreateError={(newItem) => {
          // remove from visible skills and selected skills
          setVisibleSkills(visibleSkills.filter((skill) => skill !== newItem));
          setSelectedSkills(selectedSkills.filter((skill) => skill !== newItem));
        }}
        creatable
      />
      {visibleSkills.length > 0 && (
        <CheckboxGroup value={selectedSkills} onChange={setSelectedSkills}>
          <Stack gap="xs">
            {visibleSkills.map((skill) => (
              <Checkbox
                label={skill}
                value={skill}
                key={skill}
                disabled={loading}
              />
            ))}
          </Stack>
        </CheckboxGroup>
      )}
      <Group justify="end">
        <Button size="xs" onClick={() => saveUserSkills()} loading={loading}>
          Save changes
        </Button>
      </Group>
    </Stack>
  );
}

export default SkillsForm;
