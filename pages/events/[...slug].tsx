import EventCard from "@/components/EventCard";
import { Text, Button, Center } from "@chakra-ui/react";
import Link from "next/link";
import path from "path";
import fs from "fs/promises";
import Head from "next/head";

async function getEvents() {
  const filePath = path.join(process.cwd(), "data/EventList.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const EventList = JSON.parse(jsonData).events;

  return EventList;
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const EventList = await getEvents();

  return {
    props: { list: [...EventList], params: params },
  };
}

export default function MonthEvent(props: any) {
  const { list, params } = props;

  const slug: Array<string> | string | undefined = params.slug;
  let filteredDate: Date = new Date(
    `${slug ? slug[1] : 0}/1/${slug ? slug[0] : 0}`
  );

  const month = filteredDate?.toLocaleString("default", { month: "long" });

  const filteredEvents = list.filter((event: any) => {
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
      <Head>
        <title>
          NextEvents | {month} {filteredDate.getFullYear()}
        </title>
        <meta
          name="description"
          content={`This is a ${month} ${filteredDate.getFullYear()} event! Come and join with us.`}
        />
      </Head>
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

      {list.map((event: any) => (
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
