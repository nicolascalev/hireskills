import {
  Checkbox,
  CheckboxGroup,
  Select,
  Stack,
  Switch,
  TextInput,
} from "@mantine/core";

function ProjectFilters() {
  return (
    <>
      <Select
        label="Sort"
        defaultValue="Popular top"
        data={["Popular top", "Least popular top", "Newest top", "Oldest top"]}
      />
      <TextInput label="Search" placeholder="Search" />
      <CheckboxGroup
        defaultValue={["Basic", "Intermediate", "Advanced"]}
        label="Project level"
      >
        <Stack gap="5px" mt="xs">
          <Checkbox value="Basic" label="Basic" color="dark" />
          <Checkbox value="Intermediate" label="Intermediate" color="dark" />
          <Checkbox value="Advanced" label="Advanced" color="dark" />
        </Stack>
      </CheckboxGroup>
      <TextInput label="Skills" placeholder="Skills" />
      <TextInput label="Tools" placeholder="Tools" />
      <Switch
        defaultChecked
        labelPosition="left"
        label="Used by people only"
        color="dark"
        size="sm"
        styles={{ body: { justifyContent: "space-between" } }}
      />
      <Switch
        defaultChecked
        labelPosition="left"
        label="Verified projects only"
        color="dark"
        size="sm"
        styles={{ body: { justifyContent: "space-between" } }}
      />
    </>
  );
}

export default ProjectFilters;
