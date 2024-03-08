import { getWeekSpotlight } from "@/lib/data";
import SpotlightPageContent from "./SpotlightPageContent";
import moment from "moment";
import MessageCard from "../ui/MessageCard";
import { IconMoodSad } from "@tabler/icons-react";
import { Container } from "@mantine/core";

async function SpotlightPage() {
  // this gets the last created spotlight not this week's spotlight so
  // you have to make sure you use a cron to create a new spotlight every week
  const res = await getWeekSpotlight();

  if (!res || res.error || !res.spotlight) {
    return (
      <Container py="md" size="xl">
        <MessageCard
          title="Error getting this week's spotlight"
          message="Please try again later"
          icon={<IconMoodSad />}
        />
      </Container>
    );
  }

  const endString = "Ends " + moment(res.spotlight.finishesAt).fromNow();

  return <SpotlightPageContent endString={endString} />;
}

export default SpotlightPage;
