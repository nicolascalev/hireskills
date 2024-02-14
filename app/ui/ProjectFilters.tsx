import SortProjectsButton from "@/app/ui/SortProjectsButton";
import { Select, Switch, TextInput } from "@mantine/core";

function ProjectFilters() {
  return (
    <>
      <SortProjectsButton />
      <TextInput label="Search" placeholder="Search" />
      <Select
        label="Developer status"
        defaultValue="Looking"
        data={["Looking", "Open", "Busy"]}
      />
      <Select
        label="Level"
        defaultValue="All"
        data={["All", "Basic", "Intermediate", "Advanced"]}
      />
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
