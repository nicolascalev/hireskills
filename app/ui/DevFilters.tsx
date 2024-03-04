"use client";
import {
  Text,
  Switch,
  TextInput,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@mantine/core";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import SkillsCombobox from "./SkillsCombobox";
import ToolsCombobox from "./ToolsCombobox";
import { useDebouncedValue } from "@mantine/hooks";
import { DEVELOPER_DEFAULT_EXPERIENCE } from "@/lib/utils";

function DevFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [name, setName] = useState(searchParams.get("name") || "");
  const [debouncedName] = useDebouncedValue(name, 500);
  const [role, setRole] = useState(searchParams.get("role") || "");
  const [debouncedRole] = useDebouncedValue(role, 500);
  const [visibleSkills, setVisibleSkills] = useState<string[]>(
    searchParams.getAll("skills")
  );
  const [yearsCoding, setYearsCoding] = useState(
    searchParams.getAll("yearsCoding").length == 0
      ? DEVELOPER_DEFAULT_EXPERIENCE
      : searchParams.getAll("yearsCoding")
  );
  const [skills, setSkills] = useState<string[]>(searchParams.getAll("skills"));
  const [visibleTools, setVisibleTools] = useState<string[]>(
    searchParams.getAll("tools")
  );
  const [tools, setTools] = useState<string[]>(searchParams.getAll("tools"));
  // next do used by people and verified projects only
  const [isJobSeeking, setIsJobSeeking] = useState(
    searchParams.get("isJobSeeking") === "true"
  );

  const developerFilters = useMemo(() => {
    const filters = new URLSearchParams();
    filters.set("name", debouncedName);
    filters.set("role", debouncedRole);
    filters.set("isJobSeeking", JSON.stringify(isJobSeeking));
    yearsCoding.forEach((value) => filters.append("yearsCoding", value));
    skills.forEach((value) => filters.append("skills", value));
    tools.forEach((value) => filters.append("tools", value));
    return filters;
  }, [debouncedName, debouncedRole, isJobSeeking, yearsCoding, skills, tools]);

  useEffect(() => {
    replace(`${pathname}?${developerFilters.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [developerFilters]);

  return (
    <>
      <TextInput
        label="Name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <TextInput
        label="Role"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.currentTarget.value)}
      />
      <CheckboxGroup
        label="Experience"
        value={yearsCoding}
        onChange={setYearsCoding}
      >
        <Stack gap="5px" mt="xs">
          <Checkbox value="lt1" label="Less than 1 year" color="teal" />
          <Checkbox value="1to3" label="1-3 years" color="teal" />
          <Checkbox value="3to5" label="3-5 years" color="teal" />
          <Checkbox value="5to10" label="5-10 years" color="teal" />
          <Checkbox value="gt10" label="10+ years" color="teal" />
        </Stack>
      </CheckboxGroup>

      <Stack gap="xs">
        <SkillsCombobox
          label="Skills"
          value={visibleSkills}
          onChange={(newItem) => {
            setVisibleSkills([newItem, ...visibleSkills]);
            setSkills([newItem, ...skills]);
          }}
        />
        {visibleSkills.length > 0 && (
          <CheckboxGroup value={skills} onChange={setSkills}>
            <Stack gap="xs">
              {visibleSkills.map((skill) => (
                <Checkbox
                  label={skill}
                  value={skill}
                  key={skill}
                  color="teal"
                />
              ))}
            </Stack>
          </CheckboxGroup>
        )}
      </Stack>

      <Stack gap="xs">
        <ToolsCombobox
          label="Tools"
          value={visibleTools}
          onChange={(newItem) => {
            setVisibleTools([newItem, ...visibleTools]);
            setTools([newItem, ...tools]);
          }}
        />
        {visibleTools.length > 0 && (
          <CheckboxGroup value={tools} onChange={setTools}>
            <Stack gap="xs">
              {visibleTools.map((tool) => (
                <Checkbox label={tool} value={tool} key={tool} color="teal" />
              ))}
            </Stack>
          </CheckboxGroup>
        )}
      </Stack>

      <Switch
        labelPosition="left"
        label="Job seeking devs only"
        color="teal"
        size="sm"
        styles={{ body: { justifyContent: "space-between" } }}
        checked={isJobSeeking}
        onChange={(event) => {
          setIsJobSeeking(event.currentTarget.checked);
        }}
      />

      {/* TODO: decide how to implement this filter, it's tricky because it's not a boolean value
      <Switch
        defaultChecked
        labelPosition="left"
        label="Devs with projects only"
        color="teal"
        size="sm"
        styles={{ body: { justifyContent: "space-between" } }}
      /> */}
    </>
  );
}

export default DevFilters;
