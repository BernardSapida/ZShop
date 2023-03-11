import { useRouter } from "next/router";
import EventList from "@/components/EventList";
import EventCard from "@/components/EventCard";
import { Text, Button, Center } from "@chakra-ui/react";
import Link from "next/link";

export default function MonthEvent() {
  const router = useRouter();
  const slug: Array<string> | string | undefined = router.query.slug;
  let filteredDate: Date = new Date(
    `${slug ? slug[1] : 0}/1/${slug ? slug[0] : 0}`
  );

  const month = filteredDate?.toLocaleString("default", { month: "long" });

  const filteredEvents = EventList.filter((event) => {
    const eventMonth = new Date(event.date).getMonth();
    const eventYear = new Date(event.date).getFullYear();

    if (slug != undefined) {
      return (
        eventMonth == filteredDate.getMonth() &&
        eventYear == filteredDate.getFullYear()
      );
    }
  });
  const eventExist = filteredEvents.length > 0;
  const eventsElement = (
    <>
      <Text
        maxW="660px"
        w="95%"
        mx="auto"
        mt="5"
        fontWeight={"bold"}
        textAlign={"center"}
        fontSize={"2xl"}
      >
        Events in {month} {filteredDate.getFullYear()}
      </Text>

      <Center>
        <Button
          as={Link}
          href={`/events`}
          variant="solid"
          colorScheme={"teal"}
          mx={"auto"}
          my={"2"}
        >
          View All Events
        </Button>
      </Center>

      {filteredEvents.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          address1={event.address1}
          address2={event.address2}
          showExploreBtn={true}
        />
      ))}
    </>
  );

  return (
    <>
      {eventExist ? (
        eventsElement
      ) : (
        <Text
          maxW="660px"
          w="95%"
          mx="auto"
          mt="5"
          fontWeight={"bold"}
          textAlign={"center"}
          fontSize={"2xl"}
        >
          No Events Found.
        </Text>
      )}
    </>
  );
}
