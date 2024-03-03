"use client";
import {
  Checkbox,
  CheckboxGroup,
  Select,
  Stack,
  Switch,
  TextInput,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import SkillsCombobox from "./SkillsCombobox";
import ToolsCombobox from "./ToolsCombobox";

const SORT_OPTIONS = {
  "Popular top": '{"likeCount": "desc"}',
  "Least popular top": '{"likeCount": "asc"}',
  "Newest top": '{"createdAt": "desc"}',
  "Oldest top": '{"createdAt": "asc"}',
};
const DEFAULT_SORT = SORT_OPTIONS["Popular top"];
const SORT_INPUT_OPTIONS = Object.entries(SORT_OPTIONS).map(
  ([label, value]) => ({
    label,
    value,
  })
);
function isValidSortOrDefault(value: string | null) {
  if (!value) return DEFAULT_SORT;
  return value in SORT_OPTIONS ? value : DEFAULT_SORT;
}
const DEFAULT_LEVEL = ["basic", "intermediate", "advanced"];

function ProjectFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [sort, setSort] = useState(
    isValidSortOrDefault(searchParams.get("sort"))
  );
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch] = useDebouncedValue(search, 500);
  const [level, setLevel] = useState(
    searchParams.getAll("level").length == 0
      ? DEFAULT_LEVEL
      : searchParams.getAll("level")
  );
  const [visibleSkills, setVisibleSkills] = useState<string[]>(
    searchParams.getAll("skills")
  );
  const [skills, setSkills] = useState<string[]>(searchParams.getAll("skills"));
  const [visibleTools, setVisibleTools] = useState<string[]>(
    searchParams.getAll("tools")
  );
  const [tools, setTools] = useState<string[]>(searchParams.getAll("tools"));
  // next do used by people and verified projects only
  const [isUsedByPeople, setIsUsedByPeople] = useState(
    searchParams.get("isUsedByPeople") === "true"
  );
  const [isVerified, setIsVerified] = useState(
    searchParams.get("isVerified") === "true"
  );

  const projectFilters = useMemo(() => {
    const filters = new URLSearchParams();
    filters.set("sort", sort);
    filters.set("search", debouncedSearch);
    filters.set("isUsedByPeople", JSON.stringify(isUsedByPeople));
    filters.set("isVerified", JSON.stringify(isVerified));
    level.forEach((value) => filters.append("level", value));
    skills.forEach((value) => filters.append("skills", value));
    tools.forEach((value) => filters.append("tools", value));
    return filters;
  }, [sort, debouncedSearch, level, isUsedByPeople, isVerified, skills, tools]);

  useEffect(() => {
    replace(`${pathname}?${projectFilters.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectFilters]);

  return (
    <>
      <Select
        label="Sort"
        data={SORT_INPUT_OPTIONS}
        value={sort}
        onChange={(value) => {
          setSort(value || DEFAULT_SORT);
        }}
      />
      <TextInput
        label="Search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <CheckboxGroup
        label="Project level"
        value={level}
        onChange={(value) => {
          setLevel(value);
        }}
      >
        <Stack gap="5px" mt="xs">
          <Checkbox value="basic" label="Basic" color="teal" />
          <Checkbox value="intermediate" label="Intermediate" color="teal" />
          <Checkbox value="advanced" label="Advanced" color="teal" />
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
        label="Used by people only"
        color="teal"
        size="sm"
        styles={{ body: { justifyContent: "space-between" } }}
        checked={isUsedByPeople}
        onChange={(event) => {
          setIsUsedByPeople(event.currentTarget.checked);
        }}
      />
      <Switch
        labelPosition="left"
        label="Verified projects only"
        color="teal"
        size="sm"
        styles={{ body: { justifyContent: "space-between" } }}
        checked={isVerified}
        onChange={(event) => {
          setIsVerified(event.currentTarget.checked);
        }}
      />
    </>
  );
}

export default ProjectFilters;
