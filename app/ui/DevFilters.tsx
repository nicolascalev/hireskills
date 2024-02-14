import {
  Text,
  Switch,
  TextInput,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@mantine/core";

function DevFilters() {
  return (
    <>
      <TextInput label="Name" placeholder="Name" />
      <TextInput label="Role" placeholder="Role" />
      <CheckboxGroup
        defaultValue={["lt1", "1to3", "3to5", "5to10", "gt10"]}
        label="Experience"
      >
        <Stack gap="5px" mt="xs">
          <Checkbox value="lt1" label="Less than 1 year" color="dark" />
          <Checkbox value="1to3" label="1-3 years" color="dark" />
          <Checkbox value="3to5" label="3-5 years" color="dark" />
          <Checkbox value="5to10" label="5-10 years" color="dark" />
          <Checkbox value="gt10" label="10+ years" color="dark" />
        </Stack>
      </CheckboxGroup>
      <Switch
        defaultChecked
        labelPosition="left"
        label="Job seeking devs only"
        color="dark"
        size="sm"
        styles={{ body: { justifyContent: "space-between" } }}
      />
      <Switch
        defaultChecked
        labelPosition="left"
        label="Devs with projects only"
        color="dark"
        size="sm"
        styles={{ body: { justifyContent: "space-between" } }}
      />
    </>
  );
}

export default DevFilters;
